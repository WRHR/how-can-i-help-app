import {parseJSON, addHiddenClassAndRemoveChild, displayError, checkForError} from '../app.js'

const baseURL = 'http://localhost:3000'
const loginURL = `${baseURL}/login`

const hiddenDiv = document.querySelector('.login-card')

function createLoginForm(){
    if(hiddenDiv.childNodes.length > 3){
        hiddenDiv.removeChild(hiddenDiv.lastChild)
    }
    const loginForm = document.createElement('form')
    loginForm.id = 'login-form'
    loginForm.innerHTML = `
                <input type="text" name="username" placeholder="Enter Username">
                <input type="password" name="password" placeholder="Enter Password">
                <input id="login-submit" type="submit" value="Login">
            `
    hiddenDiv.append(loginForm)
    loginForm.addEventListener('submit', login)
}

function login(event){
    event.preventDefault()
    const loginForm = document.querySelector('#login-form')

    const formData = new FormData(loginForm)
    const username = formData.get('username')
    const password =  formData.get('password')
    const userInfo = { username, password }

    fetch(loginURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
        .then(checkForError)
        .then(parseJSON)
        .then(setToken)
        .then(reload)
        .catch(displayError)      
}


function setToken({token}){
    localStorage.setItem("token", token)
}

function reload(){
    if(localStorage.getItem("token")) {
        window.location.reload()
    }
}

export {createLoginForm}