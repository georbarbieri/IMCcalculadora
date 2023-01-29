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
const cartIcon = document.querySelector(".cart")
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

const closeBtn= document.querySelector("#cerrar-sesion");


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

function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}

function cleanInputs() {
    alturaInput.value = "";
    pesoInput.value ="";
}
function showOrHideResultado(){
    calculadoraContainer.classList.toggle("hide");
    resultadoContainer.classList.toggle("hide");
}


createTabla(data);


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


let h3 = document.getElementById("saludo")
h3.innerText =`Logueado como ${localStorage.getItem("email")}`;

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cleanInputs();
});

closeBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    swal.fire({
            icon: "warning",
            title: "¿ESTAS SEGURO DE CERRAR SESIÓN?",
            text: "¡Si desea puede permanecer en la página!",
            cancelButtonColor: '#3085d6',
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#d33',
            confirmButtonText: "Si, estoy seguro!",
            showCancelButton: true,
            showConfirmButton: true,
        } ).then(function(result){
            if(result.value){
                window.location = "index.html";
                borrarDatos();
                showOrHideResultado();
                cleanInputs();
            }else{
                return false;
            }
        })
    });

backBtn.addEventListener("click", (e) => {
    cleanInputs();
    showOrHideResultado();
});  