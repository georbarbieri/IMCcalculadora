document.getElementById("btn-iniciarSesion").addEventListener("click",iniciarSesion);
document.getElementById("btn-registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPagina);


//declaracion de variables
var formulario_login = document.querySelector(".formularioLogin");
var formulario_registro =document.querySelector(".formularioRegistro");
var contenedorLogin_Registro =document.querySelector(".contenedorLoginRegistro");
var caja_traseraLogin = document.querySelector(".cajaTraseraLogin");
var caja_traseraRegistro = document.querySelector(".cajaTraseraRegistro");

function anchoPagina(){
    if(window.innerWidth >850){
        caja_traseraLogin.style.display= "block";
        caja_traseraRegistro.style.display="block";
    }else{
        caja_traseraRegistro.style.display="block";
        caja_traseraRegistro.style.opacity="1";
        caja_traseraLogin.style.display="none";
        formulario_login.style.display="block";
        formulario_registro.style.display="none"
        contenedorLogin_Registro.style.left="0px"
    }
}

anchoPagina();

function iniciarSesion (){
    
    if(window.innerWidth >850){
        formulario_registro.style.display = "none";
        contenedorLogin_Registro.style.left="10px";
        formulario_login.style.display="block";
        caja_traseraRegistro.style.opacity ="1";
        caja_traseraLogin.style.opacity="0";
    }else{
        formulario_registro.style.display = "none";
        contenedorLogin_Registro.style.left="0px";
        formulario_login.style.display="block";
        caja_traseraRegistro.style.display ="block";
        caja_traseraLogin.style.display="none";
    }
    
    
}

function register (){
    if(window.innerWidth>850){
        formulario_registro.style.display = "block";
        contenedorLogin_Registro.style.left="410px";
        formulario_login.style.display="none";
        caja_traseraRegistro.style.opacity ="0";
        caja_traseraLogin.style.opacity="1";
    }else{
        formulario_registro.style.display = "block";
        contenedorLogin_Registro.style.left="0px";
        formulario_login.style.display="none";
        caja_traseraRegistro.style.display ="none";
        caja_traseraLogin.style.display="block";
        caja_traseraLogin.style.opacity="1";
    }
    
}

const usuarios = [{
    nombre: 'Azul',
    mail: 'azul@mail.com',
    pass: 'user123'
},
{
    nombre: 'Betiana',
    mail: 'beti@mail.com',
    pass: 'tite25'
},
{
    nombre: 'Carlos',
    mail: 'carlos@mail.com',
    pass: 'sanlore2002'
}];

const mailLogin = document.getElementById("emailAddress")
        passLogin = document.getElementById("password")
        btnLogin = document.getElementById("btnLogin");

function guardarDatos(usuarioDB, storage){
    const usuario ={
        "name": usuarioDB.nombre,
        "user": usuarioDB.mail,
        "pass": usuarioDB.pass,
    }
    localStorage.setItem("usuario",JSON.stringify(usuario));
}

function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}

function recuperarUsuario(storage) {
    let usuarioEnStorage = JSON.parse(storage.getItem('usuario'));
    return usuarioEnStorage;
}

function saludar(usuario){
    nombreUsuario.innerHTML = `Bienvenido/a, <span>${usuario.name}</span>`
}

function estaLogueado(usuario){
    if(usuario) {
        saludar(usuario)
    }else{
        return false;
    }
}
function validarUsuario(usersDB, user, pass) {
    let encontrado = usersDB.find((userDB)=> userDB.mail==user);
    if(typeof encontrado === "undefined"){
        return false;
    }else{ 
        if(encontrado.pass !=pass){
            return false;
        }else{
            return encontrado;
        }
    }
}

btnLogin.addEventListener("click", (e)=> {
    e. preventDefault();
    if( !mailLogin.value|| !passLogin.value){
        alert("Todo los campos deben ser completados");
    }else{ let data = validarUsuario(usuarios, mailLogin.value, passLogin.value);
        if (!data){
            alert("Usuario y/o contraseña son erroneos, por favor intentalo nuevamente");
        }else {
            if (recordar.checked){
                guardarDatos(data, localStorage);
                saludar(recuperarUsuario(localStorage));
            }else{
                guardarDatos(data, sessionStorage);
                saludar(recuperarUsuario(sessionStorage));
            }
        }
    }
});