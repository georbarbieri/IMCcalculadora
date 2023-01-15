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

