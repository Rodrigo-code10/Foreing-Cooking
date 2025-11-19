import API_URL from './config.js';

async function mostrarRecetas(filtros = {}) {
    try {
        const queryString = new URLSearchParams(filtros).toString();
        const url = `${API_URL}/muestrarecetas${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url);
        const recetas = await response.json();

        const contenedor = document.querySelector('.cards');

        recetas.forEach(receta => {
            const card = document.createElement('div');
            card.classList.add('card');
            

            card.innerHTML = `
                <div class="card-image">
                    <img src="${API_URL}${receta.imagen}" alt="${receta.nombre}">
                    <span class="card-badge">Nuevo</span>
                </div>

                <div class="card-content">
                    <div class="card-rating">
                        <span class="star">★★★★★</span>
                        <span class="rating-number">${receta.calificacion} (${receta.numCalificaciones})</span>
                    </div>
                    <h3 class="card-title">${receta.nombre}</h3>
                    <p class="card-author">por @${receta.autor.nombre || "Desconocido"}</p>

                    <div class="card-info">
                        <div class="info-item">
                            <span class="info-icon">⏱️</span>
                            <span>${receta.tiempoPreparacion} min</span>
                        </div>
                        <div class="info-item">
                            <span class="info-icon">👥</span>
                            <span>${receta.porciones} porciones</span>
                        </div>
                        <div class="info-item">
                            <span class="info-icon">🔥</span>
                            <span>${receta.dificultad}</span>
                        </div>
                    </div>
                </div>

                <div class="card-footer">
                    <button class="btn-receta">Ver Receta</button>
                    <button onclick="toggleLike('${receta._id}')" class="btn-heart">❤️</button>
                    <span class="like-count">${receta.likes}</span>
                </div>
            `;
            contenedor.appendChild(card);
        });

    } catch (error) {
        console.error('Error al mostrar recetas:', error);
    }
}
mostrarRecetas();




async function toggleLike(recetaId) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Debes iniciar sesión para dar like');
        }

        const response = await fetch(`${API_URL}/recetas/${recetaId}/like`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        let data;
        const contentType = response.headers.get('content-type');
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
        const card = document.querySelector(`.card button[onclick="toggleLike('${recetaId}')"]`);
        if (card) {
            const likeCount = card.nextElementSibling; 
            likeCount.textContent = data.likes;
        }

        return data;

    } catch (error) {
        console.error('Error en toggleLike:', error);
        alert('Ocurrió un error al dar like');
    }
}
