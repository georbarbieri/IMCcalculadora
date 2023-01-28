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

/*Funciones*/


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


const productos = [ ]
let carrito = JSON.parse(localStorage.getItem("carrito") ) || [ ]

class Producto {
    constructor (id, nombre, precio, img, ingredientes){
        this.id =id,
        this.nombre = nombre,
        this.precio= precio,
        this.img =img,
        this.ingredientes=ingredientes
    }
    desplegarProducto(){`
        const card = <div class="card">
        <p>${this.nombre}</p>
        <div><img src="${this.img}" alt="" class="imgVianda"></div>
        <div><p>$${this.precio}</p>
        </div>
        <div><p>${this.ingredientes}</p></div>
        <div class="btn-container">
            <button id=${this.id} class="btnAgregar"> Agregar al carrito</button>
        </div>
    </div>`
    const contenedorCard = document.getElementById('contenedorCard')
    contenedorCard.innerHTML += card
    }
    agregarEvento (){
        const btnAgregar =document.getElementById(`${this.id}`)
        const finderProduct = producto.find( p => p.id == this.id)
        btnAgregar.addEventListener("click", () => agregarAlCarrito(finderProduct))
    }
}

fetch('./js/api.json')
    .then(res => res.json())
    .then(data=> {
            data.forEach( prod =>{
                let newProd = new Producto (prod.id, prod.nombre, prod.precio, prod.img, prod.ingredientes)
                productos.push(newProd)
            })
            productos.forEach (e=>{
                e.desplegarProducto()
            })
            productos.forEach( e => {
                e.agregarEvento()
            })
        })
    .catch( err =>console.log(err));

function agregarAlCarrito(producto){
    console.log(producto)
    
    const enCarrito = carrito.find(prod=> prod.id=== producto.id)

    if(!enCarrito){
        carrito.push ({...producto, cantidad: 1})
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }else{
        let carritoFiltrado = carrito.filter( prod.id != enCarrito.id)
        carrito = [
            ...carritoFiltrado,
            {
                ...enCarrito,
                cantidad: cantidad +1
            }
        ]
        localStorage.setItem('carrito',JSON.stringify(carrito))
    }
    contador.innerHTML= carrito.reduce((acc, prod)=> acc + prod.cantidad,0 )
}
    const contador = document.getElementById('cartCounter')
    contador.innerHTML= carrito.reduce((acc, prod)=> acc + prod.cantidad,0 )


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

