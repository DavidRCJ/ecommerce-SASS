const accesorios = [
    { id: 11 , img:"./Imagenes/accesorios/cadena.png" , tipo: 'Codena', stock: 2, precio: 120.50 },
    { id: 12 , img:"./Imagenes/accesorios/lentes.png" , tipo: 'Lentes', stock: 5, precio: 250.45 },
    { id: 13 , img:"./Imagenes/accesorios/boina.png" , tipo: 'Boinas', stock: 6, precio: 150.90 },
    { id: 14 , img:"./Imagenes/accesorios/gorra.png" , tipo: 'Gorras', stock: 8, precio: 199.99 },
    { id: 15 , img:"./Imagenes/accesorios/rascadera.png" , tipo: 'Rascadera', stock: 4, precio: 1500.99 }
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
accesorios.forEach(servicio => {
    const div = document.createElement("div");
    div.innerHTML =
        ` 
    <div class="producto_css" class="card" style="width:12rem;" ">
        <img class="imag_js" src="${servicio.img}" class="card-img-top" alt="${servicio.tipo}">
            <div class="card-body">
                <h2  class="titulo_h2" class="card-title">${servicio.tipo}</h5>
                <p class="precio_js" class="card-text">Precio (MX): ${servicio.precio}</p>
                <a class="buton_js" id ="add_car2${servicio.id}" class="btn btn-primary">Agregar al Carrito</a>
            </div>
    </div>
    `
    contenedor_Productos.appendChild(div);

    const addCarritoC1 = document.getElementById(`add_car2${servicio.id}`);
    addCarritoC1.addEventListener("click", () => {
        agregarAlCarrito(servicio.id, carritoCompras);
        agregarContadorCarrito();
        mostrarCarrito();
    });
});

/********************************* METODO QUE AGREGA LOS PRODCUTOS AL CARRITO***************************************************************** */
const agregarAlCarrito = (producto, carrito) => {
    const servico_select = accesorios.find(item => item.id === producto)
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
