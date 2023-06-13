
const btnLogout = document.getElementById('btnLogout');

if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        fetch('/api/session/logout').then(()=>{
            window.location.replace('/login')
        })
    })
}