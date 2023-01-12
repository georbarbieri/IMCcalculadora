const data = [
    {
        min: 0,
        max: 18.4,
        clasificacion: "Menor de 18,5",
        info: "Bajopeso",
        obesidad: "0",
    },
    {
        min: 18.5,
        max: 24.9,
        clasificacion: "Entre 18,5 y 25",
        info: "Peso ideal",
        obesidad: "0",
    },
    {
        min: 25,
        max: 29.9,
        clasificacion: "Entre 25 y 30",
        info: "Sobrepeso",
        obesidad: "0",
    },
    {
        min: 30,
        max: 34.9,
        clasificacion: "Entre 30 y 35",
        info: "Obesidad I",
        obesidad: "1",
    },
    {
        min: 35,
        max: 39.9,
        clasificacion: "Entre 35 y 39",
        info: "Obesidad II",
        obesidad: "2",
    },
    {
        min: 40,
        max: 999,
        clasificacion: "Mayor a 40",
        info: "Obesidad III",
        obesidad: "3",
    },
];

const usuarios = [{
    nombre: "Belen",
    mail: "belu@gmail.com",
    pass: "belen22",
},{
    nombre: "Barbara",
    mail: "barbi@gmail.com",
    pass: "barbi20",
},{
    nombre: "Raul",
    mail: "raul@gmail.com",
    pass: "raul2022",
},{
    nombre: "User",
    mail: "user@gmail.com",
    pass: "1234",
}];

let emailUsuario = document.getElementById('emailAddress');
let password = document.getElementById('password');
let btnLogin = document.querySelector('#btnLogin');
let btnVaciar = document.getElementById('btnVaciarLocalStorage');

if (btnLogin) {
    btnLogin.addEventListener('click', () => {
        localStorage.setItem('email', JSON.stringify(emailUsuario.value));
        localStorage.setItem('password', JSON.stringify(password.value));
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Logeado correctamente'
        });
    })
}
if(location.href == '../calculadora.html'){
    let user = document.querySelector('#user');
    user.innerText = localStorage.getItem('email') || 'Iniciar sesion'
}

if (btnVaciar) {
    btnVaciar.addEventListener('click', (e) => {
        localStorage.clear();
        Swal.fire({
            title: 'Se han borrado todos los datos',
            icon: 'error',
            confirmButtonText: 'Cool'
        })
        e.preventDefault();
    })
}

function guardarDatos(storage) {

    let user = document.getElementById('emailAddress').value;
    let pass = document.getElementById('password').value;

    const usuario = {
        "user": user,
        "pass": pass
    }

    storage.setItem('user', JSON.stringify(usuario))
}

function borrarDatos(storage) {
    storage.clear();
}

Swal
    .fire({
        title: "Tu nombre",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        inputValidator: nombre => {
            if (!nombre) {
                return "Por favor escribe tu nombre";
            } else {
                return undefined;
            }
        }
    })
    .then(resultado => {
        if (resultado.value) {
            let nombre = resultado.value;
            console.log("Hola, " + nombre);
        }
    });

/*Seleccion de elementos*/

const   imcTabla = document.querySelector("#imc-tabla");

const alturaInput = document.querySelector("#altura");

const pesoInput = document.querySelector("#peso");

const calcBtn = document.querySelector("#calc-btn");

const clearBtn = document.querySelector("#clear-btn");

const calculadoraContainer = document.querySelector("#calculadora-container");

const resultadoContainer = document.querySelector("#resultado-container");

const imcNumero = document.querySelector("#imc-numero span");

const imcInfo = document.querySelector("#imc-info span");

const backBtn = document.querySelector("#back-btn");

/*Funciones*/

function guardarDatos(storage) {

    let user = document.getElementById('#emailAddress').value;
    let pass = document.getElementById('#password').value;

    const usuario = {
        "user": user,
        "pass": pass
    }

    storage.setItem('user', JSON.stringify(usuario))
}

function createTabla(data) {
    data.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("dato-tabla");

        const clasificacion = document.createElement("p");
        clasificacion.innerText = item.clasificacion;

        const info = document.createElement("p");
        info.innerText = item.info;

        const obesidad = document.createElement("p");
        obesidad.innerText = item.obesidad;

        div.appendChild(clasificacion);
        div.appendChild(info);
        div.appendChild(obesidad);

        imcTabla.appendChild(div);
    });

}

function validDigits(text) {
    return text.replace(/[^0-9,]/g, "")
}


function calcImc(peso, altura) {

    const imc = (peso / (altura *altura)).toFixed(1);
    return imc
}


function cleanInputs() {
    alturaInput.value = "";
    pesoInput.value ="";
}
function showOrHideResultado(){
    calculadoraContainer.classList.toggle("hide");
    resultadoContainer.classList.toggle("hide");
}

/*Iniciacion*/
createTabla(data);


//Eventos
[alturaInput, pesoInput].forEach((el) =>{
    el.addEventListener("input", (e)=> {
        const updateValue = validDigits(e.target.value);
        e.target.value =updateValue;
    });

});

calcBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const peso = +pesoInput.value.replace(",",".");
    const altura = +alturaInput.value.replace(",",".");

    if (!peso || !altura) return;
    const imc =calcImc(peso, altura);
    console.log(peso)
    console.log(altura)
    let info;
    data.forEach((item)=> {
        if (imc >= item.min && imc <=item.max) {
            info = item.info;
            return;
        }
    });

    if (!info) return;
    imcNumero.innerText = imc;
    imcInfo.innerText = info;
    console.log(info)
    switch (info){
        case "Bajopeso":
            imcNumero.classList.add("low");
            imcInfo.classList.add("low");
            break;
        
        case "Peso Ideal":
            imcNumero.classList.add("good");
            imcInfo.classList.add("good");
            break;
        
        case "Sobrepeso":
            imcNumero.classList.add("low");
            imcInfo.classList.add("low");
            break;

        case "Obesidad I":
            imcNumero.classList.add("medium");
            imcInfo.classList.add("medium");
            break;

        case "Obesidad II":
            imcNumero.classList.add("medium-high");
            imcInfo.classList.add("medium-high");
            break;

        case "Obesidad III":
            imcNumero.classList.add("high");
            imcInfo.classList.add("high");
            break;
    }

    showOrHideResultado();
});

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cleanInputs();
});

backBtn.addEventListener("click", (e) => {
    cleanInputs();
    showOrHideResultado();
});  

