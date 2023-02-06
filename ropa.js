
const ropa = [
    {id:6 , img: "./Imagenes/ropa/camisa.png", tipo: 'Camisa', modelo: 'Playero', stock: 8, precio: 250.50 },
    {id:7 , img: "./Imagenes/ropa/playera.png",tipo: 'Playera', modelo: 'Urban', stock: 10, precio: 120.15 },
    {id:8 , img: "./Imagenes/ropa/abrigo.png" ,tipo: 'Abrigos', modelo: 'Invierno', stock: 9, precio: 300.51 },
    {id:9 , img: "./Imagenes/ropa/panoleta.png" ,tipo: 'Mascadas', modelo: 'Frances', stock: 5, precio: 50.50 },
    {id:10, img: "./Imagenes/ropa/cosplay.png", tipo: 'Cosplay', modelo: 'Harry Potter', stock: 3, precio: 500.99 }
];


const carritoCompras = [];
//mostrar productos dinamicamente
const contenedor_Productos = document.getElementById("contenedor_Productos");
const contenedorIconoCarrito = document.getElementById("contenedorCarrito");
const contadorCarrito = document.createElement("p");
const contenedorCarritoCanvas = document.getElementById("contenedorCarritoCanvas");

const botonVaciar = document.getElementById("vaciar_carrito");
const precioTotal = document.getElementById("precioTotal");



/******************MUESTRA LOS ELEMENTOS DE PRODCUTOS EN EL DOOM********************************************************************/
ropa.forEach(servicio => {
    const div = document.createElement("div");
    div.innerHTML +=
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
        agregarContadorCarrito();
        mostrarCarrito();
    });
});

/********************************* METODO QUE AGREGA LOS PRODCUTOS AL CARRITO***************************************************************** */
const agregarAlCarrito = (producto, carrito) => {
    const servico_select = ropa.find(item => item.id === producto)
    carrito.push(servico_select);
        Swal.fire({
            type: "success",
            tittle: "Se agrego con exito al Carrito",
            text: "Agregaste el prodcuto "
            
        });
}

/**************************AGREGA EL CONTADOR EN FORMATO NUMERO A LADO DERECHO CARRITO*****************************************************************/
const agregarContadorCarrito = () => {
    if (carritoCompras.length !== 0) {
        contenedorIconoCarrito.appendChild(contadorCarrito);
        
        contadorCarrito.classList.add("ProductosCarrito");
    }
    contadorCarrito.textContent = carritoCompras.length;
}

/******************************    MUESTRA LO QUE QUE HAY EN EL CARRITO     ****************************************** */
const mostrarCarrito = () => {
    contenedorCarritoCanvas.innerHTML= "";
    carritoCompras.forEach(servicio => {
        const div = document.createElement("div");
       div.innerHTML =
        `
        <div class="producto_css" class="card" style="width:12rem;" ">
        <img class="imag_js" src="${servicio.img}" class="card-img-top" alt="${servicio.marca}">
            <div class="card-body">
                <h2  class="titulo_h2" class="card-title">${servicio.tipo}</h5>
                <p class="precio_js" class="card-text">Precio (MX): ${servicio.precio}</p>  
               <div>                
               <button onclick="eliminarDelCarrito (${servicio.id})" id="eliminar_Producto"><img src=" ./Imagenes/eliminar.png" class="rounded mx-auto d-block"
               alt="Eliminar"></button>             
               </div>
            </div>
        </div>
            `
        contenedorCarritoCanvas.appendChild(div);            
    })    
    contadorCarrito.textContent = carritoCompras.length;
    precioTotal.innerText = carritoCompras.reduce((acc,servicio) => acc + servicio.precio,0)
}

/*********************************ELIMINA DEL CARRITO *************************************************************************/
const eliminarDelCarrito = (servicio) => {
    const item = carritoCompras.find((producto) => servicio.id === producto);
    const indice = carritoCompras.indexOf(item);
    carritoCompras.splice(indice,1)
    mostrarCarrito();           
}

/*********************VACIA EL CARRITO ********************************************************************/
botonVaciar.addEventListener('click',() =>{
    carritoCompras.length = 0;
    mostrarCarrito();
})

/*****************************CALCULA EL PRECIO TORAL DE MI CARRITO*****************************************/
