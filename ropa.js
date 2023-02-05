
const ropa = [
    {id:6 , img: "./Imagenes/ropa/camisa.png", tipo: 'Camisa', modelo: 'Playero', stock: 8, precio: 250.50 },
    {id:7 , img: "./Imagenes/ropa/playera.png",tipo: 'Playera', modelo: 'Urban', stock: 10, precio: 120.15 },
    {id:8 , img: "./Imagenes/ropa/abrigo.png" ,tipo: 'Abrigos', modelo: 'Invierno', stock: 9, precio: 300.51 },
    {id:9 , img: "./Imagenes/ropa/panoleta.png" ,tipo: 'Mascadas', modelo: 'Frances', stock: 5, precio: 50.50 },
    {id:10, img: "./Imagenes/ropa/cosplay.png", tipo: 'Cosplay', modelo: 'Harry Potter', stock: 3, precio: 500.99 }
];

const contenedor_Productos_2 = document.getElementById("contenedor_Productos_2");
ropa.forEach(servicio1 => {
    const div = document.createElement("div");
    div.innerHTML+=
    ` 
    <div class="producto_css" class="card" style="width:12rem;" ">
        <img class="imag_js" src="${servicio1.img}" class="card-img-top" alt="${servicio1.modelo}">
            <div class="card-body">
                <h2  class="titulo_h2" class="card-title">${servicio1.tipo}</h5>
                <p class="precio_js" class="card-text">Precio (MX): ${servicio1.precio}</p>
                <a class="buton_js" id =${servicio1.id} class="btn btn-primary">Agregar al Carrito</a>
            </div>
    </div>
    `
    contenedor_Productos_2.appendChild(div)
})