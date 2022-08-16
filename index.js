class Carrito {
  constructor() {  
      this.productos = [];
  }

  calcularTotal() {
      let total = 0;
      for (let i = 0; i < this.productos.length; i++) {
          total += this.productos[i].precio;
      }
      return total;
  }
}

  let carrito = new Carrito()

fetch("https://62e85e8d93938a545be510ee.mockapi.io/api/v1/articulo")
  .then((resp) => resp.json())
  .then((Catalogo) => {

    // FUNCIONES 

    function main() {
      confirmarCompra()
      btnVaciarCarro() 
    }

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
                        </div><hr>`;
      return carroTarjeta;
    }

    function limpiarCarrito() {
      let divCarrito = document.querySelector("#carrito");
      divCarrito.innerHTML = "";
    }

    function actualizarCarrito(carro) {
      let cuota3 = Math.ceil(carrito.calcularTotal() / 3)
      let cuota6 = Math.ceil(carrito.calcularTotal() / 6)
      let cuota12 = Math.ceil(carrito.calcularTotal() * 1.3 / 12)
      let divCarrito = document.querySelector("#carrito");
      divCarrito.innerHTML += `
                                <div class="container limpiarCarro">
                                  <a   id="vaciarCarrito" class="btn btn-danger">Vaciar Carrito</a>
                                </div>`
      carro.productos.forEach((producto) => {
        divCarrito.innerHTML += tarjetaCarro(producto);
      });
      divCarrito.innerHTML += `<h1>Total: $ ${carrito.calcularTotal()}</h1>`;
      divCarrito.innerHTML += `
                            <select name="cuotas" id="cuotas">
                                <option value="1 cuota">1 cuota sin interes de $${carrito.calcularTotal()}</option>
                                <option value="3 cuotas">3 cuotas sin interes de $${cuota3}</option>
                                <option value="6 cuotas">6 cuotas sin interes de $${cuota6}</option>
                                <option value="12 cuotas">12 cuotas fijas de $${cuota12}</option>
                            </select>`;
      divCarrito.innerHTML += `
                            <div class="container comprar">
                                <a id="confirmarCompra" class="btn btn-success">Comprar</a>
                            </div>`;
    }

    function renovarStorage() {
      localStorage.removeItem("carrito");
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    function alert() {
      Swal.fire({
        icon: "success",
        title: "¡Gracias por tu compra!",
        text: "Pronto recibiras toda la info en tu mail",
      });
    }

    function toast(producto) {
      Toastify({
        text: `Agregaste ${producto.nombre} al carrito`,
        duration: 2000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          color: "black",
          background: "linear-gradient(to right, #dddddd, #d2d2d2)",
        },
      }).showToast();
    }

    function confirmarCompra() {
      let botonConfirmarCompra = document.getElementById("confirmarCompra");
      botonConfirmarCompra.addEventListener("click", () => {
        alert();
        vaciarCarrito();
        renovarStorage();
      });
    }

    function vaciarCarrito() {
      let divCarrito = document.querySelector("#carrito");
      divCarrito.innerHTML = "";
      carrito = new Carrito();
    }
    
    function btnVaciarCarro() {     
      let botonVaciarCarrito = document.getElementById("vaciarCarrito");
        botonVaciarCarrito.addEventListener("click", () => {
        vaciarCarrito();
        renovarStorage();
      });
    }

    // CARGAR CARRITO EXISTENTE

    let storage = JSON.parse(localStorage.getItem("carrito"));
    if(storage){
      
      let carritoGuardado = new Carrito(storage.id, storage.productos);
      storage.productos.forEach((producto) => {
        carritoGuardado.productos.push(producto);
        let productoStorage = Catalogo.find(
          (e) => e.id == producto.id);
          carrito.productos.push(productoStorage);
      });
      limpiarCarrito();
      actualizarCarrito(carritoGuardado);
      }

    // GENERACION DE TARJETAS DE PRODUCTOS

    let tarjetasDiv = document.querySelector("#tarjetas");
    Catalogo.forEach((producto) => {
      tarjetasDiv.innerHTML += individualTarjeta(producto);
    });

    // carrito de un producto 

    
    let botones = document.querySelectorAll(".botonDeCompra");
    let arrayDeBotones = Array.from(botones);
    arrayDeBotones.forEach((boton) => {
      boton.addEventListener("click", (e) => {
        let productoSeleccionado = Catalogo.find(
          (producto) => producto.id == e.target.id);
        carrito.productos.push(productoSeleccionado);
        toast(productoSeleccionado);
        limpiarCarrito();
        actualizarCarrito(carrito);
        renovarStorage();
        confirmarCompra();
        btnVaciarCarro()
      })
      });

    
    main()
  });


