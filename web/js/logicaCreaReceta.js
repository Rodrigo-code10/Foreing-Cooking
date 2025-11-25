import API_URL from './config.js';
// Crear nueva receta
async function nuevaReceta() {
    try {
        const token = obtenerToken();
        if (!token) {
            throw new Error('Debes iniciar sesión para crear una receta');
        }

        const form = document.getElementById("formCrearReceta");
        const formData = new FormData(form);

        const response = await fetch(`${API_URL}/newreceta`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al crear receta');
        }

        mostrarMensaje("Solicitud de receta enviada exitosamente!",'#4CAF50');
        window.location.href = "index.php";

    } catch (error) {
        mostrarMensaje(`Ocurrio un error: ${error}`,'#E01616');
        console.error('Error:', error);
        throw error;
    }
}

function obtenerToken() {
    return localStorage.getItem('token');
}

let enviando = false;

document.getElementById("formCrearReceta").addEventListener("submit", async (e) => {
    e.preventDefault();

    if (enviando) return; 
    enviando = true;

    try {
        await nuevaReceta();
    } finally {
        enviando = false;
    }
});


