let productos = [
    { nombre: 'Funkpop 1', precio: 65, imagen: './img/piplup.jpeg' },
    { nombre: 'Funkpop 2', precio: 56, imagen: './img/mushi.webp' },
    { nombre: 'Funkpop 3', precio: 84, imagen: './img/oshawott.webp'},
    { nombre: 'Funkpop 4', precio: 75, imagen: './img/arcanine.jpg'}, 
    { nombre: 'Funkpop 5', precio: 90, imagen: './img/lucas.webp'}
];

let carrito = [];
let total = 0;

function agregarProducto(index, cantidad) {
    if (cantidad !== null && cantidad !== "") {
        const cantidadNumerica = parseInt(cantidad);

        if (!isNaN(cantidadNumerica) && cantidadNumerica > 0) {
            const producto = productos[index];
            const subtotal = producto.precio * cantidadNumerica;
            carrito.push({ producto, cantidad: cantidadNumerica, subtotal });
            total += subtotal;

            actualizarCarrito();
        } else {
            alert('Ingrese una cantidad válida');
        }
    }
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalSpan = document.getElementById('total');

    listaCarrito.innerHTML = '';

    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.producto.nombre} - Cantidad: ${item.cantidad} - Subtotal: $${item.subtotal.toFixed(2)}`;
        listaCarrito.appendChild(li);
    });

    totalSpan.textContent = total.toFixed(2);
}

function buscarProducto(nombre) {
    return productos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
}

function filtrarProductos(precioMaximo) {
    return productos.filter(producto => producto.precio <= precioMaximo);
}


for (let i = 0; i < productos.length; i++) {
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="product"><img class="product" src="${productos[i].imagen}" alt="${productos[i].nombre}"></div>
        <span>${productos[i].nombre} - S/.${productos[i].precio}</span>
        <button onclick="agregarProducto(${i}, prompt('Ingrese la cantidad:'))">Agregar al carrito</button>
    `;
    document.getElementById('productos').appendChild(div);
}