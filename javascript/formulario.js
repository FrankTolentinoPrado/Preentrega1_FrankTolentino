
const $form = document.querySelector('#form')

$form.addEventListener('submit', handleSubmit)

async function handleSubmit(event) {
    event.preventDefault();

    if (!validarFormulario()) {
        return;
    }

    const form = new FormData(this);
    const response = await fetch(this.action, {
        method: this.method,
        body: form,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        this.reset();
    }

    Swal.fire({
        title: 'Gracias por contactarnos, te responderemos pronto',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
}

function validarFormulario() {
    const nombre = document.querySelector('[name="nombre"]').value;
    const email = document.querySelector('[name="email"]').value;
    const mensaje = document.querySelector('[name="mensaje"]').value;

    if (!nombre || !email || !mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, completa todos los campos del formulario.'
        });
        return false;
    }

    return true;
}