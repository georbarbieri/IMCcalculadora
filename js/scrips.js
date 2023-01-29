


var formulario_login = document.querySelector(".formularioLogin");
var contenedorLogin_Registro =document.querySelector(".contenedorLoginRegistro");


const usuarios = [{
    nombre: 'User',
    mail: 'user@mail.com',
    pass: 'user123',
},
{
    nombre: 'Georgina',
    mail: 'geor@mail.com',
    pass: 'geor1908',
},
{
    nombre: 'Sabrina',
    mail: 'sabricba22@mail.com',
    pass: 'belgrano22',
}];

const mailLogin = document.getElementById("emailAddress")
            passLogin = document.getElementById("password")
            btnLogin = document.getElementById("btnLogin")


function guardarDatos(usuarioDB, storage){
    const usuario ={
        "name": usuarioDB.nombre,
        "user": usuarioDB.mail,
        "pass": usuarioDB.pass,
    }
    localStorage.setItem("usuario",JSON.stringify(usuario));
}

function recuperarUsuario(storage) {
    let usuarioEnStorage = JSON.parse(storage.getItem('usuario'));
    return usuarioEnStorage;
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
            swal.fire({
                title: "Error!",
                text: "Usuario y/o contraseña son erroneos, por favor intentalo nuevamente",
                type: "warning"
            })}else {
                modal()
        }
    }
});

function modal () {
        swal.fire({
            title: "Bienvenido/a a nuestra página!",
            text: `Te logueaste como ${localStorage.getItem("email")}` ,
            type: "success"
        }).then(function() {
            window.location = "index.html";
        });
}


btnBorrar.addEventListener("click", (e)=>{
    borrarDatos();
})
