fetch("https://62e85e8d93938a545be510ee.mockapi.io/api/v1/articulo")
    .then((resp) => resp.json())
    .then((Catalogo) => {


        class Carrito {
            constructor(id) {
                this.id = id;
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
                        </div><hr>`;
            return carroTarjeta;
        }

        function btnLimpiarCarro() {
            let botonLimpiarCarrito = `
                            <div class="container limpiarCarro">
                                <a   id="vaciarCarrito" class="btn btn-danger">Vaciar Carrito</a>
                            </div>`;
            return botonLimpiarCarrito;
        }

        function limpiarCarrito() {
            let divCarrito = document.querySelector("#carrito");
            divCarrito.innerHTML = "";
        }

        function actualizarCarrito(carrito) {
            let divCarrito = document.querySelector("#carrito");
            carrito.productos.forEach((producto) => {
                divCarrito.innerHTML += tarjetaCarro(producto);
            });
            divCarrito.innerHTML += `<h1>Total: $ ${carrito.calcularTotal()}</h1>`;
            divCarrito.innerHTML += `
                            <select name="cuotas" id="cuotas">
                                <option value="1 cuota">1 cuota sin interes de $${carrito.calcularTotal()}</option>
                                <option value="3 cuotas">3 cuotas sin interes de $${carrito.calcularTotal() / 3
                                }</option>
                                <option value="6 cuotas">6 cuotas sin interes de $${carrito.calcularTotal() / 6
                                }</option>
                                <option value="12 cuotas">12 cuotas fijas de $${
                                  (carrito.calcularTotal() * 1.3) / 12
                                }</option>
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

        function vaciarCarrito() {
            let divCarrito = document.querySelector("#carrito");
            divCarrito.innerHTML = "";
            carrito = new Carrito();
        }

        function alert() {
            Swal.fire({
                icon: "success",
                title: "¡Gracias por tu compra!",
                text: "Pronto recibiras toda la info en tu mail",
            });
        }

        function alertError() {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No has seleccionado ningun producto",
            });
        }

        function toast(producto) {
            Toastify({
                text: `Agregaste ${producto.nombre} al carrito`,
                duration: 2000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
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

        /* CARGAR CARRITO EXISTENTE */

        window.addEventListener("DOMContentLoaded", (e) => {
            let storage = JSON.parse(localStorage.getItem("carrito"));
            let carritoGuardado = new Carrito(storage.id, storage.productos);
            storage.productos.forEach((producto) => {
                carritoGuardado.productos.push(producto);
            });
            limpiarCarrito();
            actualizarCarrito(carritoGuardado);
        });

        /* GENERACION DE TARJETAS DE PRODUCTOS*/

        let tarjetasDiv = document.querySelector("#tarjetas");
        Catalogo.forEach((producto) => {
            tarjetasDiv.innerHTML += individualTarjeta(producto);
        });

        /* carrito De un producto */

        let carrito = new Carrito();
        let botones = document.querySelectorAll(".botonDeCompra");
        let arrayDeBotones = Array.from(botones);
        arrayDeBotones.forEach((boton) => {
            boton.addEventListener("click", (e) => {
                let productoSeleccionado = Catalogo.find(
                    (producto) => producto.id == e.target.id
                );
                carrito.productos.push(productoSeleccionado);
                toast(productoSeleccionado);
                limpiarCarrito();
                actualizarCarrito(carrito);
                renovarStorage();
                confirmarCompra();
            });
        });

        let botonVaciarCarrito = document.querySelector("#vaciarCarrito");

        botonVaciarCarrito.addEventListener("click", () => {
            vaciarCarrito();
            renovarStorage();
        });
    });