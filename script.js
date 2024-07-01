const wrongEmail = document.querySelector('.wrong-email');
const wrongPassword = document.querySelector('.wrong-password');
const wrongConfirm = document.querySelector('.wrong-confirm');
const wrongUsername = document.querySelector('.wrong-username');
const button = document.querySelector('.button');
const username = document.querySelector('#username');
const emailInput = document.querySelector('#email-input');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const forgotInput = document.querySelector('#forgot-input');
const newButton = document.querySelector('#new-button');
let api;
let id = 1;
let allValid
fetch('https://667eb0b6f2cb59c38dc6b335.mockapi.io/login')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        api = data;
    });
function validate(name, event) {
    const element = event.target;
    let valid = false;
    if (name === 'email') {
        valid = /^[\w-.]{2,30}@([\w-]+\.)+[a-z]{2,20}$/i.test(element.value);
        wrongEmail.classList.toggle('none', valid);
    } else if (name === 'password') {
        valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(element.value);
        wrongPassword.classList.toggle('none', valid);
    } else if (name === 'confirm') {
        valid = password.value === confirmPassword.value;
        wrongConfirm.classList.toggle('none', valid);
    } else if (name === 'username') {
        valid = element.value.length > 8;
        wrongUsername.classList.toggle('none', valid);
    }
    element.style.borderColor = valid ? '#F7F8F9' : 'red';
    toggleButtonState();
}
function toggleButtonState() {
    if(location.href == 'http://127.0.0.1:5500/register.html'){
        allValid = 
        (document.getElementById('email-input').value !== '' && wrongEmail.classList.contains('none')) &&
        (document.getElementById('password').value !== '' && wrongPassword.classList.contains('none')) &&
        (document.getElementById('confirm-password').value !== '' && wrongConfirm.classList.contains('none')) &&
        (document.getElementById('username').value !== '' && wrongUsername.classList.contains('none'));
    }
    else{
        allValid = 
        (!document.getElementById('email-input') && document.getElementById('email-input').value !== '' && wrongEmail.classList.contains('none')) &&
        (!document.getElementById('password') && document.getElementById('password').value !== '' && wrongPassword.classList.contains('none')) &&
        (!document.getElementById('confirm-password') && document.getElementById('confirm-password').value !== '' && wrongConfirm.classList.contains('none')) &&
        (!document.getElementById('username') && document.getElementById('username').value !== '' && wrongUsername.classList.contains('none'));
    }
    button.classList.toggle('finished', allValid);
    if (allValid) {
        if (location.href === 'http://127.0.0.1:5500/register.html') {
            const registerButton = document.getElementById('register-button');

            registerButton.addEventListener('click', function () {
                fetch('https://667eb0b6f2cb59c38dc6b335.mockapi.io/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_name: username.value,
                        email: emailInput.value,
                        password: password.value
                    })
                }).then(response => response.json())
                  .then(data => {
                      location.href = 'login.html';
                  })
                  .catch(error => console.error('Error:', error));
            });
        }
        addClickListener();
    }
}
function addClickListener() {
    button.addEventListener('click', function () {
        const currentURL = location.href;
        if (currentURL.endsWith('register.html')) {
            location.href = 'login.html';
        }
    });
}
function check(){
    if (location.href === 'http://127.0.0.1:5500/forgot.html') {
        api.forEach((element) => {
            if (element.email === forgotInput.value) {
                wrongEmail.classList.add('none');
                id = element.id;
                location.href = 'new.html';
            } else {
                wrongEmail.classList.remove('none');
            }
        });
    }
}
function newExtra(id) {
    if (password.value === confirmPassword.value) {
        fetch(`https://667eb0b6f2cb59c38dc6b335.mockapi.io/login/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password.value
            })
        }).then(response => response.json())
          .then(data => {
              console.log('Password updated:', data);
          })
          .then(location.href = 'changed.html')
    }
}
if (location.href === 'http://127.0.0.1:5500/new.html') {
    newButton.addEventListener('click', function () {
        newExtra(id);
    });
}




    
