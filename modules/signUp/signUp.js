import {parseJSON, displayError, checkForError} from '../app.js'

const baseURL = 'http://localhost:3000'
const userURL = `${baseURL}/users`

const hiddenDiv = document.querySelector('.login-card')

function createSignUpForm(){
    if(hiddenDiv.childNodes.length > 3){
        hiddenDiv.removeChild(hiddenDiv.lastChild)
    }
    const loginForm = document.createElement('form')
    loginForm.id = 'sign-up-form'
    loginForm.innerHTML = `
                <input type="text" name="name" placeholder="Enter Your Name">
                <input type="text" name="username" placeholder="Enter Username">
                <input type="password" name="password" placeholder="Enter Password">
                <input id="sign-in-submit" type="submit" value="Register Account">
            `
    hiddenDiv.append(loginForm)
    loginForm.addEventListener('submit', signUp)
}

function signUp(){
    event.preventDefault()
    const loginForm = document.querySelector('#sign-up-form')

    const formData = new FormData(loginForm)
    const name = formData.get('name')
    const username = formData.get('username')
    const password =  formData.get('password')
    const userInfo = { name, username, password }

    fetch(userURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
        .then(checkForError)
        .then(parseJSON)
        .then(displyCreateMessage)
        .catch(displayError)  

    event.target.reset()
}

function displyCreateMessage(json){
    const message = document.querySelector('#error-message')
    message.style = "color: green"
    message.textContent = json.message
}

export {createSignUpForm}