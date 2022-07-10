/*const productos = [{id: 1, nombre: "colaless", precio: 500, categoria: "ropa interior"},
            {id: 2, nombre: "pijama", precio: 2500, categoria: "pijama"},
            {id: 3, nombre: "corpiño", precio: 700, categoria: "ropa interior"},
            {id: 4, nombre: "remera", precio: 1500, categoria: "ropa"},
            {id: 5, nombre: "short", precio: 1100, categoria: "ropa"},
            {id: 6, nombre: "pantalon", precio: 1700, categoria: "ropa "}]

function acumular(num){
    total += num
}


function simCompra(){
    let total = 0

    let continuarCompra = ""
    
    do{
        let idProducto = parseInt(prompt("Ingrese el numero del producto que desee\n1. colaless. precio: 500\n2. pijama. precio: 2500\n3. corpiño. precio: 700\n4. remera. precio: 1500\n5. short. precio: 1100\n6. pantalon. precio: 1700" ))

        let cantidad = parseInt(prompt("Ingrese la cantidad que necesita"))
        
        let producto = productos.find(elemento => elemento.id === idProducto)
        console.log(producto)
        let subtotal = producto.precio * cantidad

        total = total + subtotal 

        continuarCompra = prompt("¿Seguir comprando?\n 1. SI\n 2. NO ")

    }while (continuarCompra == 1)
    alert ("El total de la compra es $"+ total)
    
    
}

simCompra()

*/
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
        for(let i = 0; i < this.productos.length; i++) {
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
                <a href="#" class="btn btn-primary botonDeCompra" id="${producto.id}">Agregar al carro</a>
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

function limpiarCarrito() {
    let divCarrito = document.querySelector("#carro")
    divCarrito.innerHTML = ""
}

function actualizarCarrito() {
    let divCarrito = document.querySelector("#carro")
    carrito.productos.forEach(producto => {
        divCarrito.innerHTML += tarjetaCarro(producto)
    })
    divCarrito.innerHTML += `<h1>Total: $ ${carrito.calcularTotal()}</h1>`
}

function renovarStorage() {
    localStorage.removeItem("carrito")
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

/* CARGAR CARRITO EXISTENTE */

window.addEventListener("DOMContentLoaded", (e) => {
    let storage = JSON.parse(localStorage.getItem("carro"))
    let carritoGuardado = new Carrito(storage.id, storage.productos)
    storage.productos.forEach(producto => {
        carritoGuardado.producto.push(producto)
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

let carrito = new Carrito(1)

/* botones */

let botones = document.querySelectorAll(".botonDeCompra")

let arrayDeBotones = Array.from(botones)

arrayDeBotones.forEach(boton => {
            boton.addEventListener("click", (e) => {
                    let productoSeleccionado = Catalogo.find(producto => producto.id == e.target.id)
                    carrito.productos.push(productoSeleccionado)
                    limpiarCarrito()
                    actualizarCarrito(carrito)
                    renovarStorage()
                })
            })

























        /*let botonUno = document.getElementById("btnRopaUno")
        let botonDos = document.getElementById("btnRopaDos")
        let botonTres = document.getElementById("btnRopaTres")
        let botonCuatro = document.getElementById("btnRopaCuatro")

        botonUno.addEventListener("click", () => {
                alert("se agrego al carrito")})

        botonDos.addEventListener("click", () => {
                alert("se agrego al carrito")})

        botonTres.addEventListener("click", () => {
                alert("se agrego al carrito")})

        botonCuatro.addEventListener("click", () => {
                alert("se agrego al carrito")})
                    
        */