import * as loginAction from './login/login.js' 

const baseURL = 'http://localhost:3000'
const userURL = `${baseURL}/users`

const tasksURL = `${baseURL}/tasks`
const volunteersURL = `${baseURL}/volunteers`

const displayLoginButton = document.querySelector('.login')
const hideButton = document.querySelector('.hide-button')

displayLoginButton.addEventListener('click', ()=>{
    displayLoginForm()
    loginAction.createLoginForm()
})

hideButton.addEventListener('click', ()=>{
    addHiddenClass(event.target.parentNode)
})

function displayLoginForm(){
    const loginCard = document.querySelector('.login-card')
    loginCard.classList.remove('hidden')
}

function addHiddenClass(node){
    node.classList.add('hidden')
    removeInnerHTML(node)
}

function removeInnerHTML(node){
    node.removeChild(node.lastChild)
}

function parseJSON(response){
    return response.json()
}

export {parseJSON, addHiddenClass}

