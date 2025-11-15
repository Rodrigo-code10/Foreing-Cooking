//// LOGICA DE REGISTRO /////// 

async function Registra() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        const formElement = registerForm.querySelector('form');
        if (formElement) {
            formElement.addEventListener('submit', async function (e) {
                e.preventDefault();

                const nombre = document.getElementById('register_nombre').value;
                const email = document.getElementById('register_email').value;
                const password = document.getElementById('register_password').value;

                // Validaciones básicas
                if (nombre.length < 3) {
                    alert('El nombre debe tener al menos 3 caracteres');
                    return;
                }

                if (password.length < 6) {
                    alert('La contraseña debe tener al menos 6 caracteres');
                    return;
                }

                try {
                    const usuario = { nombre, email, password};
                    
                    // Deshabilitar botón mientras se procesa
                    const submitBtn = this.querySelector('.submit-btn');
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Registrando...';

                    const res = await fetch('http://localhost:3000/registrar', { // Se hace la petición al backend
                        method: 'POST',  // Método HTTP POST
                        headers: { 'Content-Type': 'application/json' }, // Se especifica que el cuerpo es JSON
                        body: JSON.stringify(usuario)  // Se envían los datos del usuario
                    });

                    const data = await res.json(); // Respuesta del backend (se convierte en objeto)

                    if (res.ok) {
                        // Si todo fue bien, se guarda el token en el almacenamiento local
                        console.log('Usuario registrado:', data.usuario.nombre);
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('usuario', JSON.stringify(data.usuario.nombre));
                    } else {
                        // Si ocurrió un error, se muestra en consola
                        console.error('Error:', data.error);
                    }

                    // Mostrar mensaje de éxito
                    alert('¡Registro exitoso! Bienvenido ' + data.usuario.nombre);

                    // Redirigir a la página principal
                    window.location.href = 'index.php';                 

                } catch (error) {
                    // Mostrar error
                    alert('Error: ' + error.message);

                    // Rehabilitar botón
                    const submitBtn = this.querySelector('.submit-btn');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Registrarse';
                }
            });
        }
    }
}


async function login() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const formElement = loginForm.querySelector('form');
        if (formElement) {
            formElement.addEventListener('submit', async function (e) {
                e.preventDefault();

                const email = document.getElementById('login_email').value;
                const password = document.getElementById('login_password').value;

                try {
                    // Deshabilitar botón mientras se procesa
                    const submitBtn = this.querySelector('.submit-btn');
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Iniciando sesión...';

                    const response = await fetch('http://localhost:3000/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, password })
                    });
                    
                    const data = await response.json();
                    
                    if (!response.ok) {
                        throw new Error(data.error || 'Error al iniciar sesión');
                    }
                    
                    // Guardar token en localStorage
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('usuario', JSON.stringify(data.usuario));

                    // Mostrar mensaje de éxito
                    alert('¡Bienvenido ' + data.usuario.nombre + '!');

                    // Redirigir a la página principal
                    window.location.href = 'CrearRecetas.php';         //Cambiar después jajajajja

                } catch (error) {
                    // Mostrar error
                    alert('Error: ' + error.message);

                    // Rehabilitar botón
                    const submitBtn = this.querySelector('.submit-btn');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Iniciar Sesión';
                }
            });
        }
    }
}

// Crear nueva receta
async function nuevaReceta() {
    try {
        const token = obtenerToken();
        if (!token) {
            throw new Error('Debes iniciar sesión para crear una receta');
        }

        const form = document.getElementById("formCrearReceta");
        const formData = new FormData(form);

        const response = await fetch('http://localhost:3000/newreceta', {
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
        window.location.href = "CatalogoRecetas.php";

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


function obtenerToken() {
    return localStorage.getItem('token');
}

///Funcion pa cerrar sesion
function cerrarSesion(){
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = 'index.php';
    }

}

