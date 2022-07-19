
class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.imagen = imagen
    }
}

class Carrito {
    constructor(id) {
        this.id = id
        this.productos = []
    }

    calcularTotal() {
        let total = 0
        for (let i = 0; i < this.productos.length; i++) {
            total += this.productos[i].precio
        }
        return total
    }
}

/* FUNCIONES */

function individualTarjeta(producto) {
    let tarjetaIndividual = ` 
                <div class="card" >
                <img src="img/${producto.imagen}" alt="">
                <h5>${producto.nombre}</h5>
                <p>$ ${producto.precio}</p>
                <a class="btn btn-primary botonDeCompra" id="${producto.id}">Agregar al carro</a>
            </div>`;

    return tarjetaIndividual;
}

function tarjetaCarro(producto) {
    let carroTarjeta = `
                        
                        <hr><div class="tarjeta-carrito">
                            <div class="imagen">
                                <img src="img/${producto.imagen}" alt="">
                            </div>
                            <div >
                                <h5>${producto.nombre}</h5>
                            </div>
                            <div>
                                <h5>$ ${producto.precio}</h5>
                            </div>
                        </div><hr>`
    return carroTarjeta
}

function btnLimpiarCarro() {
    let botonLimpiarCarrito = `
                            <div class="container limpiarCarro">
                                <a   id="vaciarCarrito" class="btn btn-danger">Vaciar Carrito</a>
                            </div>`
    return botonLimpiarCarrito
    
}

function limpiarCarrito() {
    let divCarrito = document.querySelector("#carrito")
    divCarrito.innerHTML = ""
}

function actualizarCarrito(carrito) {
    let divCarrito = document.querySelector("#carrito")
    carrito.productos.forEach(producto => {
        divCarrito.innerHTML += tarjetaCarro(producto)
    })
    divCarrito.innerHTML += `<h1>Total: $ ${carrito.calcularTotal()}</h1>`
}

function renovarStorage() {
    localStorage.removeItem("carrito")
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function vaciarCarrito() {
    let divCarrito = document.querySelector("#carrito")
    divCarrito.innerHTML = ""
    localStorage.removeItem("carrito")
}

/* CARGAR CARRITO EXISTENTE */

window.addEventListener('DOMContentLoaded', (e) => {
    let storage = JSON.parse(localStorage.getItem("carrito"))
    let carritoGuardado = new Carrito(storage.id, storage.productos)
    storage.productos.forEach(producto => {
        carritoGuardado.productos.push(producto)
    })
    limpiarCarrito()
    actualizarCarrito(carritoGuardado)
})



/* GENERACION CATALOGO DE PRODUCTOS*/

let Catalogo = []

let producto1 = new Producto(1, "Remera", 2000, "modelo.jpg")
let producto2 = new Producto(2, "Short", 1500, "short.jpg")
let producto3 = new Producto(3, "Pijama", 3800, "pijama.jpg")
let producto4 = new Producto(4, "Pantalon", 3500, "pantalon.jpg")



Catalogo.push(producto1)
Catalogo.push(producto2)
Catalogo.push(producto3)
Catalogo.push(producto4)

/* GENERACION DE TARJETAS DE PRODUCTOS*/

let tarjetasDiv = document.querySelector("#tarjetas")
Catalogo.forEach(producto => {
    tarjetasDiv.innerHTML += individualTarjeta(producto)
})

/* carrito De un producto */

let carrito = new Carrito(1);
let botones = document.querySelectorAll(".botonDeCompra");
let arrayDeBotones = Array.from(botones);
arrayDeBotones.forEach(boton => {
    boton.addEventListener("click", (e) => {
        let productoSeleccionado = Catalogo.find(producto => producto.id == e.target.id);
        carrito.productos.push(productoSeleccionado);
        limpiarCarrito();
        actualizarCarrito(carrito);
        renovarStorage();
    })
});

let botonVaciarCarrito = document.querySelector("#vaciarCarrito")

botonVaciarCarrito.addEventListener("click", () => {
        vaciarCarrito()
    })
