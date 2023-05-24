
const form = document.getElementById ('recoverForm');

form.addEventListener ('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById ('email').value;
    await fetch('/api/session/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify({email}),
    })
})