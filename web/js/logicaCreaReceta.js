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

        alert("¡Receta creada exitosamente!");
        window.location.href = "index.php";

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

function obtenerToken() {
    return localStorage.getItem('token');
}


document.getElementById("formCrearReceta").addEventListener("submit", async (e) => {
    e.preventDefault(); 
    try {
        await nuevaReceta();
    } catch (error) {
        console.error("Error al crear receta:", error);
    }
});


