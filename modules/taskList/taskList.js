import {parseJSON, checkForError} from '../app.js'

const baseURL = 'http://localhost:3000'
const tasksURL = `${baseURL}/tasks`
const volunteersURL = `${baseURL}/volunteers`

const taskCard = document.querySelector('.task-card')
const errorMessage = document.querySelector('#task-error-message')
function createTaskList({data}){
    return data.map(createTask)
}

function displayTasks(tasks){
    return tasks.forEach(task => taskList.append(task))
}

function createTask(task){

    const li = document.createElement('li')
    li.dataset.taskId = task.id
    li.innerHTML = `
        <h4>${task.attributes.creator.data.attributes.name} needs help:</h4>
        <h3>${task.attributes.title}</h3>
        <p>Needs ${task.attributes.volunteersNeeded - task.attributes.helpers.length} Helper!</p>
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
    taskInfo.innerHTML = `
        <h2>${taskData.data.attributes.title}</h2>
        <p>${taskData.data.attributes.description}</p>
        <p>Volunteers Needed: ${taskData.data.attributes.volunteersNeeded}</p>
    `
    const volunteerButton = document.createElement('button')
    volunteerButton.innerText = `Help ${taskData.data.attributes.creator.data.attributes.name}`
    taskInfo.append(volunteerButton)
    volunteerButton.addEventListener('click', (event)=>{
        offerHelp(event, taskData.data.id)
    })

    taskCard.append(errorMessage,taskInfo)
    displayTaskCard()
}

function displayTaskCard(){
    taskCard.classList.remove('hidden')
}
const token = localStorage.getItem("token") ? `bearer ${localStorage.getItem('token')}` : null

function offerHelp(event, task_id){
    event.stopPropagation()
    fetch(volunteersURL, {
        method: 'POST',
        headers:{
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task_id
        })
    })
    .then(checkForError)
    .then(parseJSON)
    .then(displayHelpMessage)
    .catch(displayTaskError)
}

function displayHelpMessage(response){
    errorMessage.style = 'color: green'
    errorMessage.textContent = response.message
}

function displayTaskError(error){
    errorMessage.textContent = error
}

export {createTaskList}