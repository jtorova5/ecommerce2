
console.log('forgot-password vista')

const form = document.getElementById ('formulario');

form.addEventListener ('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById ('email').value;
    const password = document.getElementById ('password').value;
    fetch('/api/session/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify({email,password}),
    }).then((res) => res.json()).then(data => alert(data)).catch((err) => alert(err));
});