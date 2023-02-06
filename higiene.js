
const higiene = [
    { id: 1, img: "./Imagenes/higiene/jabon.png", tipo: 'Jabon', marca: 'Hunter', cantidad: 1, precio: 50.50 },
    { id: 2, img: "./Imagenes/higiene/crema.png", tipo: 'Crema', marca: 'Go Care', cantidad: 1, precio: 80.60 },
    { id: 3, img: "./Imagenes/higiene/shampoo.png", tipo: 'Shampoo', marca: 'Consentido', cantidad: 1, precio: 200.73 },
    { id: 4, img: "./Imagenes/higiene/losion.png", tipo: 'Losion', marca: 'Fresh Pet', cantidad: 1, precio: 120.15 },
    { id: 5, img: "./Imagenes/higiene/acondicionador.png", tipo: 'Acondicionador', marca: 'Espree', cantidad: 1, precio: 60.14 }
];

//mostrar productos dinamicamente
const contenedor_Productos = document.getElementById("contenedor_Productos");
const contenedorIconoCarrito = document.getElementById("contenedorCarrito");
const contadorCarrito = document.createElement("p");

const contenedorCarritoCanvas = document.getElementById("contenedorCarritoCanvas");

const botonVaciar = document.getElementById("vaciar_carrito");
const precioTotal = document.getElementById("precioTotal");

const carritoCompras = JSON.parse(localStorage.getItem("carrito")) || [];

/******************MUESTRA LOS ELEMENTOS DE PRODCUTOS EN EL DOOM********************************************************************/
higiene.forEach(servicio => {
    const div = document.createElement("div");
    div.innerHTML =
        ` 
    <div class="producto_css" class="card" style="width:12rem;" ">
        <img class="imag_js" src="${servicio.img}" class="card-img-top" alt="${servicio.marca}">
            <div class="card-body">
                <h2  class="titulo_h2" class="card-title">${servicio.tipo}</h5>
                <p class="precio_js" class="card-text">Precio (MX): ${servicio.precio}</p>
                <a class="buton_js" id ="add_car${servicio.id}" class="btn btn-primary">Agregar al Carrito</a>
            </div>
    </div>
    `
    contenedor_Productos.appendChild(div);

    const addCarritoC = document.getElementById(`add_car${servicio.id}`);
    addCarritoC.addEventListener("click", () => {
        agregarAlCarrito(servicio.id, carritoCompras);
        mostrarCarrito();
    });
});

/********************************* METODO QUE AGREGA LOS PRODCUTOS AL CARRITO***************************************************************** */
const agregarAlCarrito = (producto, carritoCompras) => {
    const servico_select = higiene.find(item => item.id === producto)
   
    carritoCompras.push(servico_select);
    Swal.fire({
        type: "success",
        tittle: "SE AGREGO CON EXITO EL PRODUCTO AL CARRITO",
        text: "SE AGREGO CON EXITO EL PRODUCTO AL CARRITO"
    });

    saveLocal();
    mostrarCarrito();    
    
}

/************************** CONTADOR DEL CARRITO*****************************************************************/
const carritoCounter = () => {
    const almacenaContador = carritoCompras.length;
    localStorage.setItem("almacenaContador", JSON.stringify(almacenaContador));
    contenedorIconoCarrito.innerText = JSON.parse(localStorage.getItem("almacenaContador"));
    //carritoCompras.length ;   
}

carritoCounter();


/*****************************    MUESTRA LO QUE QUE HAY EN EL CARRITO     ****************************************** */
const mostrarCarrito = () => {

    contenedorCarritoCanvas.innerHTML = "";
    carritoCompras.forEach(servicio => {
        const div = document.createElement("div");
        div.innerHTML =
            `
        <div class="producto_css" class="card" style="width:12rem;" ">
            <img class="imag_js" src="${servicio.img}" class="card-img-top" alt="${servicio.marca}">
            <div class="card-body">
                <h2  class="titulo_h2" class="card-title">${servicio.tipo}</h5>
                <p class="precio_js" class="card-text">Precio (MX): ${servicio.precio}</p> 
                <p class="precio_js" class="card-text">Cantidad: ${servicio.cantidad}</p>                                  
                <div class="container-sm">
                    <div class="row">
                        <div class="col">
                            <button onclick="sumarDelCarrito (${servicio.id})" class="sumar" id="eliminar_Producto"><img src=" ./Imagenes/sumar.png" class="rounded mx-auto d-block"
                            alt="sumar"></button>             
                        </div>
                    <div class="col">                  
                            <button onclick="restarDelCarrito (${servicio.id})" class="restar" id="eliminar_Producto"><img src=" ./Imagenes/restar.png" class="rounded mx-auto d-block"
                                alt="restar"></button>             
                    </div>  
                    <div class="col">                  
                            <button onclick="eliminarDelCarrito (${servicio.id})" id="eliminar_Producto"><img src=" ./Imagenes/eliminar.png" class="rounded mx-auto d-block"
                            alt="Eliminar"></button>             
                    </div>  
                </div>
            </div>                                              
        </div>        
            `
        contenedorCarritoCanvas.appendChild(div);


       /* let restar = carritoCompras.querySelector(".restar");
        restar.addEventListener("click" = () => {
            console.log("1")
        });*/
    })

    carritoCounter();
    precioTotal.innerText = carritoCompras.reduce((acc, servicio) => acc + servicio.precio, 0)
}

/******************************************SUMA O AGREGA MAS PRODCUTO DEL MISMO */
const sumarDelCarrito = (servicio) => {}

const restarDelCarrito = (servicio) => {
    
    
}

/*********************************ELIMINA DEL CARRITO *************************************************************************/
const eliminarDelCarrito = (servicio) => {
    const item = carritoCompras.find((producto) => servicio.id === producto);
    const indice = carritoCompras.indexOf(item);
    carritoCompras.splice(indice, 1)
    mostrarCarrito();
    saveLocal();
}


/*****************************************VACIA EL CARRITO ********************************************************************/
botonVaciar.addEventListener('click', () => {
    carritoCompras.length = 0;
    mostrarCarrito();
})
/********************************************************* */
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carritoCompras));
    mostrarCarrito();
}


mostrarCarrito();