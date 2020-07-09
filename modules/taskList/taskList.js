import {parseJSON, addHiddenClassAndRemoveChild, displayError, checkForError} from '../app.js'

const baseURL = 'http://localhost:3000'
const tasksURL = `${baseURL}/tasks`

const taskCard = document.querySelector('.task-card')

function createTaskList({data}){
    return data.map(createTask)
}

function displayTasks(tasks){
    return tasks.forEach(task => taskList.append(task))
}

function createTask(task){
    // console.log(task)
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
 let task_id = event.target.parentNode.dataset.taskId
 fetch(tasksURL+`/${task_id}`)
    .then(parseJSON)
    .then(showTaskDetails)
}

function showTaskDetails(taskData){
    console.log(taskData)
    if(taskCard.childNodes.length > 3){
        taskCard.removeChild(taskCard.lastChild)
    }
    const taskInfo = document.createElement('div')
    taskInfo.innerHTML = `
        <h2>${taskData.data.attributes.title}</h2>
        <p>${taskData.data.attributes.description}</p>
        <p>Volunteers Needed: ${taskData.data.attributes.volunteersNeeded}</p>
    `

    taskCard.append(taskInfo)
    displayTaskCard()
}

function displayTaskCard(){
    taskCard.classList.remove('hidden')
}

export {createTaskList}