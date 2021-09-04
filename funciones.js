// PRODUCTOS
class Productos{
    constructor (id, nombre, precio, url, cantidad){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio; 
        this.url = url;    
        this.cantidad = cantidad;            
    }
}

let producto1 = new Productos(1, "Sweater NARANJA", 4000,"imagenes/s1.jpg", 0);
let producto2 = new Productos(2, "Sweater LAVANDA", 5000,"imagenes/s2.jpg", 0);
let producto3 = new Productos(3, "Sweater ROJO", 3500,"imagenes/s3.jpg", 0);
let producto4 = new Productos(4, "Sweater CREMA", 4300, "imagenes/s4.jpg", 0);
let producto5 = new Productos(5, "Sweater BEIGE", 4000, "imagenes/s5.jpg", 0);
let producto6 = new Productos(6, "Sweater CELESTE", 3400, "imagenes/s6.jpg", 0);
let producto7 = new Productos(7, "Sweater CELESTE X", 3100, "imagenes/s8.jpg", 0);
let producto8 = new Productos(8, "Sweater BLANCO", 3800, "imagenes/s9.jpg", 0);
let producto9 = new Productos(9, "Sweater VERDE", 4000, "imagenes/s10.jpg", 0);
let producto10 = new Productos(10, "Sweater TERRACOTA", 4300, "imagenes/s11.jpg", 0);
let producto11 = new Productos(11, "Sweater LILA", 2800, "imagenes/s12.jpg", 0);
let producto12 = new Productos(12, "Sweater AZUL", 3900, "imagenes/s13.jpg", 0);

let arrayProd = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12];

let carrito = [];

let contenedorProd = $("#productos"); 
let contenedorCarrito = $("#carrito");

for (const producto of arrayProd){
contenedorProd.append(`<div class="card ml-5 mt-5 text-center imgProd" style="width: 15rem;">
<img class="card-img-top" src="${producto.url}" alt="Card image cap">
<div class="card-body">
    <h5 class="card-title">${producto.nombre}</h5>
    <p class="card-text">$ ${producto.precio}</p>
    <a id = "${producto.id}"href="#" class="btn botones agregar">Agregar al carrito</a>
</div>
</div>
`)
}

// funciones del carrito
let idProdEncontrado; 
function buscarProdPorId(id){
return idProdEncontrado = arrayProd.find(producto =>producto.id == id);
}

let total = 0;
let contador = 0;

function mostrarCarrito(){
    contenedorCarrito.html("");
    contenedorCarrito.append (`<table id = "tabla">
                            <th>
                                <td align = "center">Producto</td>
                                <td align = "center" width = "100px">Precio</td>
                                <td align = "center" width = "100px">Cantidad</td>
                            </th>
                        </table>`)

    for (const producto of carrito){
        $("#tabla").append(`
            <tr id = "producto-${producto.id}">
                <td align = "center" width = "100px"><img src="${producto.url}" class = "p-2 pro" width = "50 px"/></td>
                <td align = "center" width = "100px">${producto.nombre}</td>  
                <td align = "center" width = "100px">$ ${producto.precio}</td>  
                <td align = "center" width = "100px"><div class="cantidadProd">${producto.cantidad}</div></td> 
                <td><button onclick="eliminarElemento(${producto.id})" class = "p-3 d-flex flex-column align-items-center justify-content-center btn botones">X</button></td>
            </tr>
            `)     
}    
}


function eliminarElemento(prodAEliminar){

    let carritoDelLocal = JSON.parse(localStorage.getItem("carrito"));
    const prodDelCarritoDelLocal = carritoDelLocal.find(elemento => elemento.id == prodAEliminar);
    prodAEliminar = arrayProd.find(producto =>producto.id == prodAEliminar);
    carrito.splice(prodAEliminar, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    total -= (prodAEliminar.precio * prodDelCarritoDelLocal.cantidad);
    localStorage.setItem("total", JSON.stringify(total)); 
    contador -= prodDelCarritoDelLocal.cantidad;
    prodAEliminar.cantidad -= prodDelCarritoDelLocal.cantidad;
    total = JSON.parse(localStorage.getItem("total"));
    localStorage.setItem("contador", JSON.stringify(contador)); 
    contador = JSON.parse(localStorage.getItem("contador"));
    $("#contador").html(contador);
    $("#totales").html(`TOTAL: $ ${total}`);
    $(`#producto-${prodAEliminar.id}`).remove();
}


function vaciarCarrito(){
    
    localStorage.setItem("carrito", []);
    $("table").remove();
    total = 0;
    localStorage.setItem("total", JSON.stringify(total));
    carrito = [];
    total = JSON.parse(localStorage.getItem("total"));
    $("#totales").html(total);
    contador = 0;
    localStorage.setItem("contador", JSON.stringify(contador)); 
    contador = JSON.parse(localStorage.getItem("contador"));
    $("#contador").html(contador);
    for (const cant of arrayProd){
            cant.cantidad = 0;
    }
}


$(document).ready(function(){
if (localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
    mostrarCarrito();
}
$("#productos").click(function(e) {
    let id = e.target.id;
    
    let prodSeleccionado = buscarProdPorId(id);
    if (prodSeleccionado != undefined){
        carrito.push(prodSeleccionado);    
        const carritoSinDuplicados = [...new Set(carrito)];
        prodSeleccionado.cantidad += 1;
        carrito = carritoSinDuplicados; 
        contador += 1;
        localStorage.setItem("contador", JSON.stringify(contador)); 
        contador = JSON.parse(localStorage.getItem("contador"));
        $("#contador").html(contador);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
        total += prodSeleccionado.precio;
    
        if (contador == 0){
            total = 0;
            localStorage.setItem("total", JSON.stringify(total));
            total = JSON.parse(localStorage.getItem("total"));
            $("#totales").html(`$ TOTAL: ${total}`);        
                }

        localStorage.setItem("total", JSON.stringify(total));
        contenedorCarrito.append(`<div class = "col-lg-4 offset-1 p-2" id = "totales">TOTAL: $ ${total}</div><button class = "vaciar p-2 mt-3 btn botones col-lg-4 offset-5" onclick="vaciarCarrito()">Vaciar Carrito</button>
        `)  
        }
})

        contador = JSON.parse(localStorage.getItem("contador"));
        $("#contador").html(contador);
        total = JSON.parse(localStorage.getItem("total"));
        contenedorCarrito.append(`<div class = "col-lg-4 offset-1 p-2" id = "totales">TOTAL: $ ${total}</div><button  class = "vaciar p-2 btn botones mt-3 col-lg-4 offset-5 col-4" onclick="vaciarCarrito()">Vaciar Carrito</button>
        `) 


// USUARIOS

$("#enviar").click(ingresar);
function ingresar(e) {
    e.preventDefault(); 
    localStorage.setItem("nombre",$("#nombreCliente").val());
    localStorage.setItem("correo",$("#emailCliente").val());
    localStorage.setItem("direccion",$("#direccionCliente").val());

    const usuario = localStorage.getItem("nombre");
    const correo = localStorage.getItem("correo");
    const direccion = localStorage.getItem("direccion");

        $("#saludar").append(`<div class = "text-center">
        <p>Bienvenido/a.</p>
        <p>Este es tu usuario: ${usuario}</p>
        <p>tu correo: ${correo}</p>  
        <p>y tu direccion: ${direccion}</p> 
        </div>`);
        $("#enviar").remove();
        $("#resetear").remove();
};

})

$("#subir").click( function(e) { 
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#principio").offset().top  
    }, 2000);
} );














