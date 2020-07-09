import {parseJSON, addHiddenClass} from '../app.js'

const baseURL = 'http://localhost:3000'
const loginURL = `${baseURL}/login`
const hiddenDiv = document.querySelector('.login-card')

function createLoginForm(){
    const loginForm = document.createElement('form')
    loginForm.id = 'login-form'
    loginForm.innerHTML = `
                <input type="text" name="username" placeholder="Enter Username">
                <input type="password" name="password" placeholder="Enter Password">
                <input id="login-submit" type="submit" value="Login">
                <p id="error-message"></p>
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
        .then(parseJSON)
        .then(setToken)
        .then(addHiddenClass(hiddenDiv))
}

function setToken({token}){
    localStorage.setItem("token", token)
}

export {createLoginForm}