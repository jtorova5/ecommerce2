
const formRegister = document.getElementById('formRegister');
const first_name = document.getElementById('firstName');
const last_name = document.getElementById('lastName');
const age = document.getElementById('age');
const email = document.getElementById('email');
const password = document.getElementById('password');

formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/api/session/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            first_name: first_name.value,
            last_name: last_name.value,
            email: email.value,
            age: age.value,
            password: password.value,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            window.alert('User created');
            window.location.href = '/';
        })
        .catch((error) => {
            window.alert('Error creating user');
        });
});