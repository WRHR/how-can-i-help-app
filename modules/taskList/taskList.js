import {parseJSON, checkForError} from '../app.js'
import {createEditForm} from '../editTask/editTask.js'

const baseURL = 'http://localhost:3000'
const tasksURL = `${baseURL}/tasks`
const volunteersURL = `${baseURL}/volunteers/`

const taskCard = document.querySelector('.task-card')
const errorMessage = document.querySelector('#task-error-message')


function createTaskList({data}){
    const filteredData = data.filter(dataNode => dataNode.attributes.volunteersNeeded != dataNode.attributes.helpers.length)
    return filteredData.map(createTask)
}

function displayTasks(tasks){
    
    return tasks.forEach(task => taskList.append(task))
}

function createTask(task){

    const li = document.createElement('li')
    li.dataset.taskId = task.id
    const helpersNeeded = calculateVolunteers(task)
    li.innerHTML = `
        <h4>${task.attributes.creator.data.attributes.name} needs help:</h4>
        <h3>${task.attributes.title}</h3>
        <p>${helpersNeeded}</p>
    `

    li.addEventListener('click', getTaskDetails)
    return li
}

function getTaskDetails(event){
    event.stopPropagation()
    let task_id = event.target.parentNode.dataset.taskId

    fetch(tasksURL+`/${task_id}`)
        .then(parseJSON)
        .then(showTaskDetails)
}

function showTaskDetails(taskData){
    if(taskCard.childNodes.length > 3){
        taskCard.removeChild(taskCard.lastChild)
    }

    errorMessage.textContent = ''
    const taskInfo = document.createElement('div')
    const helpersNeeded = calculateVolunteers(taskData.data)
    console.log(taskData)
    taskInfo.innerHTML = `
    <h3>${taskData.data.attributes.title}</h3>
    <p>${taskData.data.attributes.description}</p>
    <p>Total Needed: ${taskData.data.attributes.volunteersNeeded}</p>
    <p>${helpersNeeded}</p>
    `

    if(localStorage.getItem('id') == taskData.data.attributes.creator.data.id){
        const editButton = createEditButton(taskData)
        taskInfo.append(editButton)
    }else{
        const volunteerButton = pickVolunteerButton(taskData)      
        taskInfo.append(volunteerButton)
    }


    taskCard.append(errorMessage,taskInfo)
    displayTaskCard()
}

function displayTaskCard(){
    taskCard.classList.remove('hidden')
}
const token = `Bearer ${localStorage.getItem('token')}`

function offerHelp(event, task_id){
    event.stopPropagation()
    fetch(volunteersURL, {
        method: 'POST',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task_id
        })
    })
    .then(checkForError)
    .then(parseJSON)
    .then(window.location.reload())
    .catch(displayTaskError)

}
function stopHelp(event, taskData){
    event.stopPropagation()
    let userId = localStorage.getItem('id')
    let volunteerData = taskData.data.attributes.volunteerData
    const filteredVolData = volunteerData.filter(volunteer => volunteer.user_id == userId )[0]
    let volunteerId = filteredVolData.id
    fetch(volunteersURL+volunteerId, {
        method: 'DELETE',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        } 
    })
    .then(checkForError)
    .then(parseJSON)
    .then(window.location.reload())
    .catch(displayTaskError)
}

function displayHelpMessage(response){
    errorMessage.style = 'color: green'
    errorMessage.textContent = response.message
}

function displayTaskError(error){
    errorMessage.textContent = error
}

function pickVolunteerButton(taskData){
    const userId = localStorage.getItem('id')
    const helpersData = taskData.data.attributes.helpers
    const helperIds = helpersData.map(helper => helper.data.id)
    return helperIds.includes(userId) ? makeUnhelpButton(taskData) : makeHelpButton(taskData) 
}

function makeHelpButton(taskData){
    const helpButton = document.createElement('button')
    helpButton.innerText = `Help ${taskData.data.attributes.creator.data.attributes.name}`
    helpButton.addEventListener('click', (event)=>{
        offerHelp(event, taskData.data.id)
    })
    return helpButton
}
function makeUnhelpButton(taskData){
    const unhelpButton = document.createElement('button')
    unhelpButton.innerText = `Stop Helping`
    unhelpButton.addEventListener('click', (event)=>{
        stopHelp(event, taskData)
    })
    return unhelpButton
}

function createEditButton(taskData){
    const editButton = document.createElement('button')
    editButton.innerText = 'Edit Help Request'
    editButton.addEventListener('click', ()=>{
        createEditForm(taskData)
    } )
    return editButton
}

function calculateVolunteers(task){
    let helpersNeeded = task.attributes.volunteersNeeded - task.attributes.helpers.length

    if(helpersNeeded > 1){
        return `Needs ${helpersNeeded} more Volunteers`
    }else{
        return `Need ${helpersNeeded} more Volunteer`
    }
}

function createDeleteButton(taskData){
    const deleteButton = document.createElement('button')
    editButton.addEventListener('click', ()=>{

    })
}

export {createTaskList}