import * as loginAction from './login/login.js' 
import * as signUpAction from './signUp/signUp.js' 
import * as taskListAction from './taskList/taskList.js'
import * as taskAddAction from './addTask/addTask.js'

const baseURL = 'http://localhost:3000'
const tasksURL = `${baseURL}/tasks`



const loginButton = document.querySelector('.login')
const logoutButton = document.querySelector('.logout')
const signUpButton = document.querySelector('.sign-up')
const hideButton = document.querySelectorAll('.hide-button')
const taskUL = document.querySelector('.task-list')
const addTaskButton = document.querySelector('.add-task-button')

const token = localStorage.getItem("token") ? `bearer ${localStorage.getItem('token')}` : null

const options = {
    headers: {
        "Authorization": token
    }
}

fetch(tasksURL)
    .then(parseJSON)
    .then(taskListAction.createTaskList)
    .then(displayTasks)

token ? hideLogin() : hideLogout()

loginButton.addEventListener('click', ()=>{
    displayLoginForm()
    loginAction.createLoginForm()
})

signUpButton.addEventListener('click', ()=> {
    displayLoginForm()
    signUpAction.createSignUpForm()
})

logoutButton.addEventListener('click', logout)

hideButton.forEach(button => button.addEventListener('click', ()=>{
    addHiddenClassAndRemoveChild(event.target.parentNode)
}))

addTaskButton.addEventListener('click', ()=>{
    displayTaskForm()
    taskAddAction.createTaskForm()
})


function displayLoginForm(){
    const loginCard = document.querySelector('.login-card')
    loginCard.classList.remove('hidden')
}
function displayTaskForm(){
    const newTaskCard = document.querySelector('.new-task-form')
    newTaskCard.classList.remove('hidden')
}

function addHiddenClassAndRemoveChild(node){
    addHiddenClass(node)
    removeInnerHTML(node)
}

function removeInnerHTML(node){
    node.removeChild(node.lastChild)
}

function parseJSON(response){
    return response.json()
}

function addHiddenClass(node){
    node.classList.add('hidden')
}

function removeHiddenClass(node){
    node.classList.remove('hidden')
}

function hideLogin(){
    addHiddenClass(loginButton)
    addHiddenClass(signUpButton)
    removeHiddenClass(addTaskButton)
}

function hideLogout(){
    addHiddenClass(logoutButton)
}

function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    window.location.reload()
}

function displayError(error){
    const errorMessage = document.querySelector('#error-message')
    errorMessage.style = 'color: red'
    errorMessage.textContent = error
}

function checkForError(response){
    return !response.ok 
        ? response.json().then(({error}) => {
            throw new Error(error)
        })
        :response
}

function displayTasks(tasks){

    return tasks.forEach(task => taskUL.append(task))
}


export {parseJSON, addHiddenClassAndRemoveChild, displayError, checkForError,removeHiddenClass, addHiddenClass}

