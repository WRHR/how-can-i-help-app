import {parseJSON, displayError, checkForError, removeHiddenClass, addHiddenClass} from '../app.js'

const baseURL = 'http://localhost:3000'
const tasksURL = `${baseURL}/tasks/`

function createEditForm(taskData){
    event.stopPropagation()
    const hiddenTaskForm = document.querySelector('.new-task-form')
    const taskForm = document.createElement('form')
    const errorMessage = document.querySelector('#task-form-error-message')

    if(hiddenTaskForm.childNodes.length > 3){
        hiddenTaskForm.removeChild(hiddenTaskForm.lastChild)
    }
    removeHiddenClass(hiddenTaskForm)
    addHiddenClass(event.target.parentNode.parentNode)
    errorMessage.textContent = ''
    errorMessage.style = ''
    taskForm.id = 'task-form'
    console.log(taskData.data.attributes.volunteersNeeded)
    taskForm.innerHTML = `
                <h2>Edit Help Request</h2>
                <input type="text" name="title" value="${taskData.data.attributes.title}">
                <input type="textarea" name="description" value="${taskData.data.attributes.description}" >
                <input type="number" name="volunteersNeeded" value="${taskData.data.attributes.volunteersNeeded}">
                <input id="login-submit" type="submit" value="Submit Edit">
            `
    hiddenTaskForm.append(errorMessage,taskForm)
    hiddenTaskForm.addEventListener('submit', ()=>{
        editTask(event, taskData)
    })
}


function editTask(event, taskData){
    event.preventDefault()
    const taskForm = document.querySelector('#task-form')

    const taskId = taskData.data.id
    const formData = new FormData(taskForm)
    const title = formData.get('title')
    const description = formData.get('description')
    const volunteersNeeded =  formData.get('volunteersNeeded')
    const taskInfo = { title, description, volunteersNeeded }

    const token = `Bearer ${localStorage.getItem('token')}`

    fetch(tasksURL+taskId, {
        method: 'PATCH',
        headers: {
            "Authorization": token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskInfo)
    })
        .then(checkForError)
        .then(parseJSON)
        .catch(displayError)  

    window.location.reload()
}

export {createEditForm}