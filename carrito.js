let carrito = [];
let total = 0;

function agregarProducto(precio) {
    const cantidad = prompt("Ingrese la cantidad:");

    if (cantidad !== null && cantidad !== "") {
        const cantidadNumerica = parseInt(cantidad);

        if (!isNaN(cantidadNumerica)) {
            const subtotal = precio * cantidadNumerica;
            carrito.push(subtotal);
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

    carrito.forEach((subtotal, index) => {
        const li = document.createElement('li');
        li.textContent = `Producto ${index + 1} - $${subtotal.toFixed(2)}`;
        listaCarrito.appendChild(li);
    });

    totalSpan.textContent = total.toFixed(2);
}