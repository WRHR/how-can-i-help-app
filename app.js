const baseURL = 'http://localhost:3000'
const userURL = `${baseURL}/users`
const loginURL = `${baseURL}/login`

const loginButton = document.querySelector('.login')
const hideButton = document.querySelector('.hide-button')

loginButton.addEventListener('click', displayLoginForm)
hideButton.addEventListener('click', addHiddenClass)

function displayLoginForm(){
    const loginCard = document.querySelector('.login-card')
    loginCard.classList.remove('hidden')
}

function addHiddenClass(event){
    event.target.parentNode.classList.add('hidden')
}