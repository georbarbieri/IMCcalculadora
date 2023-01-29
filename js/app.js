const cards = document.getElementById("cards")
const items = document.getElementById("items")
const footer = document.getElementById("footer")
const templateCard = document.getElementById("template-card").content
const templateFooter = document.getElementById("template-footer").content
const templateCarrito = document.getElementById("template-carrito").content
const fragment = document.createDocumentFragment()
let carrito = {}

const fetchData = async ()=>{
    try {
        const res = await fetch('./js/api.json')
        const data = await res.json()
       // console.log(data)
        pintarCards(data)
    }catch(error){
        console.log(error)
    }
}
document.addEventListener("DOMContentLoaded", () =>{
    fetchData();
    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
        pintarCarrito();
    }
})
cards.addEventListener("click", e =>{
    addCarrito (e)
})

items.addEventListener("click", e => {
    btnAumentarDisminuir(e)
})

function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}

const pintarCards = data =>{
    data.forEach(producto =>{
       templateCard.querySelector("h5").textContent = producto.title
       templateCard.querySelector("h6").textContent = producto.ingredientes
       templateCard.querySelector("p").textContent = producto.precio
       templateCard.querySelector("img").setAttribute("src", producto.img)
       templateCard.querySelector(".btn-dark").dataset.id =producto.id
       const clone= templateCard.cloneNode(true)
       fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const addCarrito = e => {

    if(e.target.classList.contains("btn-dark")) {
        setCarrito(e.target.parentElement)

    }
    e.stopPropagation()
}

const setCarrito = item =>{
    const producto ={
            id: item.querySelector(".btn-dark").dataset.id,
            title: item.querySelector("h5").textContent,
            ingredientes: item.querySelector("h6").textContent,
            precio: item.querySelector("p").textContent,
            cantidad: 1
        }

        if(carrito.hasOwnProperty(producto.id)){
            producto.cantidad = carrito[producto.id].cantidad + 1
        }
    carrito[producto.id]= { ...producto}
    pintarCarrito()
}
const pintarCarrito = ()=>{
        items.innerHTML = " "
        Object.values(carrito).forEach(producto =>{ 
            templateCarrito.querySelector("th").textContent =producto.id
            templateCarrito.querySelectorAll("td")[0].textContent =producto.title
            templateCarrito.querySelectorAll("td")[1].textContent =producto.cantidad
            templateCarrito.querySelector(".btn-info").dataset.id = producto.id
            templateCarrito.querySelector(".btn-danger").dataset.id = producto.id
            templateCarrito.querySelector("span").textContent =producto.cantidad * producto.precio
            const clone = templateCarrito.cloneNode(true)
            fragment.appendChild(clone)
        })
        items.appendChild(fragment)

        pintarFooter()

}

const pintarFooter =()=> {
    footer.innerHTML =" "
    if(Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - Realice su pedido de Viandas!</th>`
        return
    }

    const nCantidad = Object.values(carrito).reduce(( acc, { cantidad })=> acc + cantidad , 0)
    const nPrecio = Object.values (carrito).reduce((acc,{cantidad, precio}) => acc + cantidad*precio,0)

    templateFooter.querySelectorAll("td")[0].textContent = nCantidad
    templateFooter.querySelector("span").textContent =nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.querySelector("#vaciar-carrito")
    btnVaciar.addEventListener("click", ( )=>{
        carrito = { }
        pintarCarrito();
    })
    const btnConfirm = document.querySelector("#comprar")
    btnConfirm.addEventListener("click", ()=>{
        swal.fire({
            title: "¡Completaste tu pedido!",
            text: "Por favor comuniquese de lunes a viernes de 8 a 13 o de 16 a 20hs para coordinar su pedido" ,
            type: "success"
        }).then(function() {
            window.location = "index.html";
        });
    })
}

const btnAumentarDisminuir = e => {
    // console.log(e.target.classList.contains('btn-info'))
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito()
    }
    e.stopPropagation()
}

