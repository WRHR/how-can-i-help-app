const baseURL = 'http://localhost:3000'
const userURL = `${baseURL}/users`
const loginURL = `${baseURL}/login`

const displayLoginButton = document.querySelector('.login')
const hideButton = document.querySelector('.hide-button')
const loginForm = document.querySelector('#login-form')
const loginSubmitButton = document.querySelector('#login-submit')

displayLoginButton.addEventListener('click', displayLoginForm)
hideButton.addEventListener('click', addHiddenClass)

loginForm.addEventListener('submit', login)

function displayLoginForm(){
    const loginCard = document.querySelector('.login-card')
    loginCard.classList.remove('hidden')
}

function addHiddenClass(event){
    event.target.parentNode.classList.add('hidden')
}

function parseJSON(response){
    return response.json()
}

function login(event){
    event.preventDefault()

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
    }).then(parseJSON).then(console.log)

    event.target.reset()

}