import API_URL from './config.js';

let recetaIdActual = null;

// Obtener el ID de la receta desde la URL
const urlParams = new URLSearchParams(window.location.search);
const recetaId = urlParams.get('id');

if (recetaId) {
    recetaIdActual = recetaId;
    cargarReceta(recetaId);
} else {
    alert('No se especificó una receta');
    window.location.href = 'index.php';
}

async function cargarReceta(id) {
    try {
        const response = await fetch(`${API_URL}/recetas/${id}`);
        
        if (!response.ok) {
            throw new Error('Receta no encontrada');
        }

        const receta = await response.json();
        mostrarReceta(receta);
    } catch (error) {
        console.error('Error al cargar la receta:', error);
        alert('Error al cargar la receta: ' + error.message);
        window.location.href = 'CatalogoRecetas.php';
    }
}

function mostrarReceta(receta) {
    // Actualizar título
    document.getElementById('nombreReceta').textContent = receta.nombre;

    // Actualizar calificación
    const calificacion = receta.calificacion || 0;
    const numCalificaciones = receta.numCalificaciones || 0;
    document.getElementById('calificacionTexto').textContent = `${calificacion} / 5.0`;

    // Actualizar estrellas
    const estrellas = document.querySelector('.estrellas');
    const estrellasLlenas = Math.round(calificacion);
    estrellas.textContent = '★'.repeat(estrellasLlenas) + '☆'.repeat(5 - estrellasLlenas);

    // Actualizar imagen principal
    const imagenPrincipal = document.getElementById('imagenPrincipal');
    imagenPrincipal.src = `${API_URL}${receta.imagen}`;
    imagenPrincipal.alt = receta.nombre;

    // Crear miniaturas
    const miniaturas = document.querySelector('.imagenes-miniaturas');
    miniaturas.innerHTML = '';
    
    const miniatura = document.createElement('img');
    miniatura.src = `${API_URL}${receta.imagen}`;
    miniatura.alt = receta.nombre;
    miniatura.classList.add('miniatura', 'active');
    miniatura.onclick = () => cambiarImagenPrincipal(`${API_URL}${receta.imagen}`, miniatura);
    miniaturas.appendChild(miniatura);

    // Actualizar avatar y nombre del autor
    const autorAvatar = document.getElementById('autorAvatar');
    const autorNombre = document.getElementById('autorNombre');
    
    if (receta.autor) {
        // Si el autor tiene foto propia y NO es el placeholder
        if (receta.autor.foto && receta.autor.foto !== '/default/SinFoto.png') {
            autorAvatar.src = `${API_URL}${receta.autor.foto}`;
        }
        
        autorAvatar.alt = receta.autor.nombre || 'Usuario';
        autorNombre.textContent = `por @${receta.autor.nombre || 'Desconocido'}`;
    } else {
        // Si no hay autor, mantener el placeholder del PHP
        autorAvatar.src = `${API_URL}/default/SinFoto.png`;
        autorNombre.textContent = 'por @Desconocido';
    }

    // Actualizar estadísticas
    document.getElementById('likesCount').textContent = receta.likes || 0;
    document.getElementById('tiempoPrep').textContent = `${receta.tiempoPreparacion} min`;
    document.getElementById('porciones').textContent = `${receta.porciones} porciones`;
    document.getElementById('dificultad').textContent = receta.dificultad || 'Media';

    // Actualizar descripción
    const descripcionDiv = document.getElementById('descripcionTexto');
    if (receta.descripcion) {
        const parrafos = receta.descripcion.split('\n').filter(p => p.trim() !== '');
        descripcionDiv.innerHTML = parrafos.map(p => `<p>${p}</p>`).join('');
    } else {
        descripcionDiv.innerHTML = '<p>No hay descripción disponible.</p>';
    }

    // Actualizar ingredientes
    const listaIngredientes = document.getElementById('listaIngredientes');
    listaIngredientes.innerHTML = '';
    
    if (receta.ingredientes && receta.ingredientes.length > 0) {
        receta.ingredientes.forEach(ingrediente => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="ingrediente-icono"></span>
                <span>${ingrediente}</span>
            `;
            listaIngredientes.appendChild(li);
        });
    } else {
        listaIngredientes.innerHTML = '<li>No hay ingredientes disponibles.</li>';
    }

    // Actualizar pasos de preparación
    const pasosList = document.getElementById('pasospreparacion');
    pasosList.innerHTML = '';
    
    if (receta.pasos && receta.pasos.length > 0) {
        receta.pasos.forEach(paso => {
            const li = document.createElement('li');
            li.textContent = paso;
            pasosList.appendChild(li);
        });
    } else {
        pasosList.innerHTML = '<li>No hay pasos disponibles.</li>';
    }

    // Configurar botón de like
    const btnLike = document.getElementById('btnLike');
    btnLike.onclick = darLike;
}

function cambiarImagenPrincipal(src, miniaturaElement) {
    document.getElementById('imagenPrincipal').src = src;
    
    // Remover clase active de todas las miniaturas
    document.querySelectorAll('.miniatura').forEach(img => {
        img.classList.remove('active');
    });
    
    // Agregar clase active a la miniatura clickeada
    if (miniaturaElement) {
        miniaturaElement.classList.add('active');
    }
}

async function darLike() {
    if (!recetaIdActual) return;

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Debes iniciar sesión para dar like');
            window.location.href = 'IniciarRegistrarse.php?mode=login';
            return;
        }

        const response = await fetch(`${API_URL}/recetas/${recetaIdActual}/like`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const contentType = response.headers.get('content-type');
        let data;
        
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            console.error('Respuesta no JSON:', text);
            throw new Error('Respuesta del servidor no es JSON');
        }

        if (!response.ok) {
            console.error('Error del servidor:', data);
            alert(data.error || 'Error al dar like');
            return;
        }

        // Actualizar el contador de likes
        document.getElementById('likesCount').textContent = data.likes;

    } catch (error) {
        console.error('Error al dar like:', error);
        alert('Ocurrió un error al dar like');
    }
}