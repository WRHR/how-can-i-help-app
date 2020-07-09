import * as loginAction from './login/login.js' 

const baseURL = 'http://localhost:3000'
const userURL = `${baseURL}/users`
const tasksURL = `${baseURL}/tasks`
const volunteersURL = `${baseURL}/volunteers`

const token = localStorage.getItem("token") ? `bearer ${localStorage.getItem('token')}` : null

const loginButton = document.querySelector('.login')
const logoutButton = document.querySelector('.logout')
const signUpButton = document.querySelector('.sign-up')
const hideButton = document.querySelector('.hide-button')


token ? hideLogin() : hideLogout()

loginButton.addEventListener('click', ()=>{
    displayLoginForm()
    loginAction.createLoginForm()
})

hideButton.addEventListener('click', ()=>{
    addHiddenClassAndRemoveChild(event.target.parentNode)
})

function displayLoginForm(){
    const loginCard = document.querySelector('.login-card')
    loginCard.classList.remove('hidden')
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

function hideLogin(){
    addHiddenClass(loginButton)
    addHiddenClass(signUpButton)
}

function hideLogout(){
    addHiddenClass(logoutButton)
}

function displayError(error){
    const errorMessage = document.querySelector('#error-message')
    errorMessage.textContent = error
}


export {parseJSON, addHiddenClassAndRemoveChild, displayError}

