let productos = [
    { nombre: 'Funkpop 1', precio: 65, imagen: './img/piplup.jpeg' },
    { nombre: 'Funkpop 2', precio: 56, imagen: './img/mushi.webp' },
    { nombre: 'Funkpop 3', precio: 84, imagen: './img/oshawott.webp' },
    { nombre: 'Funkpop 4', precio: 75, imagen: './img/arcanine.jpg' },
    { nombre: 'Funkpop 5', precio: 90, imagen: './img/lucas.webp' }
];

let carrito = [];
let total = 0;

document.addEventListener("DOMContentLoaded", () => {
    cargarCarritoDesdeLocalStorage();
    actualizarCarrito();
});

function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("total", total);
}

function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    const totalGuardado = localStorage.getItem("total");

    if (carritoGuardado && totalGuardado) {
        carrito = JSON.parse(carritoGuardado);
        total = parseFloat(totalGuardado);
    }
}

function agregarProducto(index, cantidad) {
    if (cantidad > 0) {
        const producto = productos[index];
        const subtotal = producto.precio * cantidad;
        carrito.push({ producto, cantidad, subtotal });
        total += subtotal;

        guardarCarritoEnLocalStorage();
        actualizarCarrito();
    } else {
        alert('Ingrese una cantidad válida');
    }
}

function eliminarProducto(index) {
    const productoEliminado = carrito.splice(index, 1)[0];
    total -= productoEliminado.subtotal;

    guardarCarritoEnLocalStorage();
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalSpan = document.getElementById('total');

    listaCarrito.innerHTML = '';

    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.producto.nombre} - Cantidad: ${item.cantidad} - Subtotal: $${item.subtotal.toFixed(2)}`;
        
        const eliminarButton = document.createElement('button');
        eliminarButton.textContent = "Eliminar";
        eliminarButton.addEventListener("click", () => {
            eliminarProducto(index);
        });

        li.appendChild(eliminarButton);
        listaCarrito.appendChild(li);
    });

    totalSpan.textContent = total.toFixed(2);
}

for (let i = 0; i < productos.length; i++) {
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="product"><img class="product" src="${productos[i].imagen}" alt="${productos[i].nombre}"></div>
        <span>${productos[i].nombre} - S/.${productos[i].precio}</span>
        <div>
        <input type="number" min="1" value="1" id="cantidad-${i}" />
        </div>
        <button class="agregar-button" data-index="${i}">Agregar al carrito</button>
    `;
    document.getElementById('productos').appendChild(div);
}

const agregarButtons = document.querySelectorAll(".agregar-button");
agregarButtons.forEach(button => {
    button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        const cantidad = document.getElementById(`cantidad-${index}`).value;
        agregarProducto(index, cantidad);
    });
});
