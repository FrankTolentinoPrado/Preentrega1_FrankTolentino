let productos = [
    { nombre: 'Funkpop 1', precio: 65, imagen: '../img/piplup.jpeg' },
    { nombre: 'Funkpop 2', precio: 50, imagen: '../img/mushi.webp' },
    { nombre: 'Funkpop 3', precio: 65, imagen: '../img/oshawott.webp' },
    { nombre: 'Funkpop 4', precio: 80, imagen: '../img/arcanine.jpg' },
    { nombre: 'Funkpop 5', precio: 65, imagen: '../img/lucas.webp' },
    { nombre: 'Polo 1', precio: 50, imagen: '../img/poloanime1.webp' },
    { nombre: 'Polo 2', precio: 65, imagen: '../img/poloanime2.webp' },
    { nombre: 'Polo 3', precio: 72, imagen: '../img/poloanime3.webp' },
    { nombre: 'Polo 4', precio: 56, imagen: '../img/poloanime 4.webp' },
    { nombre: 'Polo 5', precio: 65, imagen: '../img/poloanime5.webp' },
    { nombre: 'Coleccionable 1', precio: 65, imagen: '../img/coleccionable1.webp' },
    { nombre: 'Coleccionable 2', precio: 56, imagen: '../img/coleccionable2.webp' },
    { nombre: 'Coleccionable 3', precio: 84, imagen: '../img/coleccionable3.webp' },
    { nombre: 'Coleccionable 4', precio: 120, imagen: '../img/coleccionable4.webp' },
    { nombre: 'Coleccionable 5', precio: 90, imagen: '../img/coleccionable5.webp' },
    { nombre: 'Peluche 1', precio: 65, imagen: '../img/peluche1.jpeg' },
    { nombre: 'Peluche 2', precio: 56, imagen: '../img/peluche2.webp' },
    { nombre: 'Peluche 3', precio: 100, imagen: '../img/peluche-gengar.jpg' },
    { nombre: 'Peluche 4', precio: 75, imagen: '../img/peluche4.jpg' },
    { nombre: 'Peluche 5', precio: 90, imagen: '../img/peluche-rengoku.webp' }
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

// Botón "Mayor precio"
document.getElementById("btnMayorPrecio").addEventListener("click", () => {
    productos.sort((a, b) => b.precio - a.precio);
    mostrarProductos();
});

// Botón "Menor precio"
document.getElementById("btnMenorPrecio").addEventListener("click", () => {
    productos.sort((a, b) => a.precio - b.precio);
    mostrarProductos();
});

// Botón "Más relevante"
document.getElementById("btnMasRelevante").addEventListener("click", () => {
    productos.sort((a, b) => {

        const diffA = Math.abs(a.precio - 65);
        const diffB = Math.abs(b.precio - 65);

        if (diffA < diffB) {
            return -1;
        }
        if (diffA > diffB) {
            return 1;

        } else if (a.precio < b.precio) {
            return -1;

        } else if (a.precio > b.precio) {
            return 1;

        } else {
            return a.nombre.localeCompare(b.nombre);
        }
    });
    mostrarProductos();
});

// Botón "Limpiar filtros"
document.getElementById("btnLimpiarFiltros").addEventListener("click", () => {
    productos = productosOriginal.slice(); 
    mostrarProductos();
});

const productosOriginal = productos.slice(); 

function mostrarProductos() {
    const productosContainer = document.getElementById("productos");
    productosContainer.innerHTML = "";

    productos.forEach((producto, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="product"><img class="product" src="${producto.imagen}" alt="${producto.nombre}"></div>
            <span>${producto.nombre} - S/.${producto.precio}</span>
            <div>
                <input type="number" min="1" value="1" id="cantidad-${index}" />
            </div>
            <button class="agregar-button" data-index="${index}">Agregar al carrito</button>
        `;

        productosContainer.appendChild(div);
    });

    const agregarButtons = document.querySelectorAll(".agregar-button");
    agregarButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const index = button.getAttribute("data-index");
            const cantidad = document.getElementById(`cantidad-${index}`).value;
            agregarProducto(index, cantidad);
        });
    });
}
