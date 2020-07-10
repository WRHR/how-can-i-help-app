import {parseJSON, displayError, checkForError} from '../app.js'


const baseURL = 'http://localhost:3000'
const tasksURL = `${baseURL}/tasks`

function createTaskForm(){
    
    const hiddenTaskForm = document.querySelector('.new-task-form')
    const taskForm = document.createElement('form')
    const errorMessage = document.querySelector('#task-form-error-message')

    if(hiddenTaskForm.childNodes.length > 3){
        hiddenTaskForm.removeChild(hiddenTaskForm.lastChild)
    }
    errorMessage.textContent = ''
    errorMessage.style = ''
    taskForm.id = 'task-form'
    taskForm.innerHTML = `
                <input type="text" name="title" placeholder="What do you need help with?">
                <input type="textarea" name="description" placeholder="Enter a description of what you need help with">
                <input type="number" name="volunteersNeeded" placeholder="Enter number of volunteers needed">
                <input id="login-submit" type="submit" value="Ask for Help">
            `
    hiddenTaskForm.append(errorMessage,taskForm)
    hiddenTaskForm.addEventListener('submit', addTask)
}

function addTask(){
    event.preventDefault()
    const taskForm = document.querySelector('#task-form')

    const formData = new FormData(taskForm)
    const title = formData.get('title')
    const description = formData.get('description')
    const volunteersNeeded =  formData.get('volunteersNeeded')
    const taskInfo = { title, description, volunteersNeeded }

    const token = `Bearer ${localStorage.getItem('token')}`

    fetch(tasksURL, {
        method: 'POST',
        headers: {
            "Authorization": token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskInfo)
    })
        .then(checkForError)
        .then(parseJSON)
        .then(window.location.reload())
        .catch(displayError)  

    

    
}



export {createTaskForm}