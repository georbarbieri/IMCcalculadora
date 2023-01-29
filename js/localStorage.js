
let emailUsuario = document.getElementById('emailAddress');
let contraseña = document.getElementById('password');
let recordar = document.getElementById("rememberMe");
let btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click',()=>{
    localStorage.setItem('email',emailUsuario.value);
    localStorage.setItem('password',contraseña.value);
});

function guardarDatos(localStorage) {

    let user = document.getElementById('emailAddress').value;
    let pass = document.getElementById('password').value;
    
    const usuario = {
        "user": user,
        "password": pass,
    }

    localStorage.setItem('user', JSON.stringify(usuario))
    localStorage.setItem('password', JSON.stringify(usuario))
}

function guardarLocalStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito))
}