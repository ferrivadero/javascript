
const productos = [{id: 1, nombre: "colaless", precio: 500, categoria: "ropa interior"},
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


