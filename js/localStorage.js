
let emailUsuario = document.getElementById('emailAddress');
let contraseña = document.getElementById('password');
let recordar = document.getElementById("rememberMe");
let btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click',()=>{
    localStorage.setItem('email',emailUsuario.value);
    localStorage.setItem('password',contraseña.value);
});

function guardarDatos(storage) {

    let user = document.getElementById('emailAddress').value;
    let pass = document.getElementById('password').value;
    
    const usuario = {
        "user": user,
        "password": pass,
    }

    storage.setItem('user', JSON.stringify(usuario))
    storage.setItem('password', JSON.stringify(usuario))
}
