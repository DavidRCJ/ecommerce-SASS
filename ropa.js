
const ropa = [
    {id:6 , img: "./Imagenes/ropa/camisa.png", tipo: 'Camisa', modelo: 'Playero', cantidad: 1, precio: 250.50 },
    {id:7 , img: "./Imagenes/ropa/playera.png",tipo: 'Playera', modelo: 'Urban', cantidad: 1, precio: 120.15 },
    {id:8 , img: "./Imagenes/ropa/abrigo.png" ,tipo: 'Abrigos', modelo: 'Invierno', cantidad: 1, precio: 300.51 },
    {id:9 , img: "./Imagenes/ropa/panoleta.png" ,tipo: 'Mascadas', modelo: 'Frances', cantidad: 1, precio: 50.50 },
    {id:10, img: "./Imagenes/ropa/cosplay.png", tipo: 'Cosplay', modelo: 'Harry Potter', cantidad: 1, precio: 500.99 }
];


//mostrar productos dinamicamente
const contenedor_Productos = document.getElementById("contenedor_Productos");
const contenedorIconoCarrito = document.getElementById("contenedorCarrito");
const contadorCarrito = document.createElement("p");

const contenedorCarritoCanvas = document.getElementById("contenedorCarritoCanvas");

const botonVaciar = document.getElementById("vaciar_carrito");
const botonMenorMayor = document.getElementById("o_menor_mayor");
const botonMayorMenor = document.getElementById("o_mayor_menor");
const botonPagar = document.getElementById("pagar");
const precioTotal = document.getElementById("precioTotal");

const carritoCompras = JSON.parse(localStorage.getItem("carrito")) || [];

/******************MUESTRA LOS ELEMENTOS DE PRODCUTOS EN EL DOOM********************************************************************/
ropa.forEach(servicio => {
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
    
    const existe = carritoCompras.some (item=> item.id === producto)

    if (existe){
        const prod = carritoCompras.map (prod => { 
            if (prod.id === producto){
               swal("El producto ya esta en el carrito", "se modifico cantidad");
               prod.cantidad++;
            }
        })
    }
    else {
        const servico_select = ropa.find(item => item.id === producto)
        carritoCompras.push(servico_select);
        Swal.fire({
            tittle: "Se agrego con exito al carrito",
            imageUrl: 'https://i.gifer.com/7efs.gif',
            imageWidth: 150,
            imageHeight: 150,
            text: "tu producto se agrego con exito",
            
        });
        
    }
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


/*****************************************ORDENA PRODUCTOS MAYOR A MENOR Y MENOR A MAYOR*****************************************************/
botonMenorMayor.addEventListener('click', () => {
    const ordenAlfabetico = carritoCompras.sort((item1, item2) => {
        if (item1.precio == item2.precio) {
            return 0;
        }
        else if (item1.precio < item2.precio) {
            return -1;
        } else {
            return 1;
        }
    })
    mostrarCarrito();
});

botonMayorMenor.addEventListener('click', () => {
    const ordenAlfabetico1 = carritoCompras.sort((item1, item2) => {
        if (item1.precio == item2.precio) {
            return 0;
        }
        else if (item1.precio < item2.precio) {
            return 1;
        } else {
            return -1;
        }
    })
    mostrarCarrito();
});

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
                <p class="precio_js" class="card-text">Precio C/U : ${servicio.precio} (MX)</p> 
                <p class="precio_js" class="card-text">Cantidad: ${servicio.cantidad}</p>                                  
                <div class="container-sm">
                    <div class="row">
                        <div class="col">
                            
                        </div>
                    <div class="col">                  
                        <button onclick="eliminarDelCarrito (${servicio.id})" id="eliminar_Producto"><img src=" ./Imagenes/eliminar.png" class="rounded mx-auto d-block"
                        alt="Eliminar"></button>             
                    </div>  
                    <div class="col">                  
                        
                    </div>  
                </div>
            </div>                                              
        </div>        
            `
        contenedorCarritoCanvas.appendChild(div);
    })
    carritoCounter();
     precioTotal.innerText = carritoCompras.reduce((acc, servicio) => acc + servicio.cantidad*servicio.precio, 0)
}

/****************************************ELIMINA DEL CARRITO ******************************************************************/
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
    localStorage.clear()
    mostrarCarrito();
})
/***************************************GUARDA EN LOCAL STORAGE **************************************************************/
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carritoCompras));
    mostrarCarrito();
}

/*********************************************PAGAR PRODUCTOS******************************************************************/
botonPagar.addEventListener('click', () => {
    carritoCompras.length = 0;
    localStorage.clear();
    Swal.fire({
        imageUrl: 'https://i.gifer.com/7efs.gif',
        imageWidth: 150,
        imageHeight: 150,
        tittle: "Tu compra es exitosa",
        text: "Tu compra se realizo con exito",
    });
    // swal("Tu Compras es Exitosa", "Tu Compra es Exitosa", "success");
    mostrarCarrito();
})
mostrarCarrito();