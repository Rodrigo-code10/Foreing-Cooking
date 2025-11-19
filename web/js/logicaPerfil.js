import API_URL from './config.js';
import { CambiarHeader } from "./logicaHeader.js";

///Funcion pa cerrar sesion
function cerrarSesion(){
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = 'index.php';
    }
}

// ACTUALIZAR HEADER AL CARGAR CUALQUIER PÁGINA
document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if(usuario && usuario.foto){
        CambiarPerfil(usuario.foto,usuario);
        CambiarHeader(usuario.foto);
    }

    // Agregar evento al botón de cerrar sesión
    const btnCerrarSesion = document.querySelector(".btn_sesion");
    if(btnCerrarSesion){
        btnCerrarSesion.addEventListener("click", cerrarSesion);
    }
});

async function CambiarPerfil(fotoPerfil,usuario){
    const perfil = document.getElementById("foto-perfil");
    if(perfil){        
        perfil.src = `${API_URL}${fotoPerfil}` ;
    }

    const nombre = document.getElementById("nombre");
    nombre.innerHTML = usuario.nombre;

    const descripcion = document.getElementById("descripcion");
    usuario.status?descripcion.innerHTML=usuario.status:"...";


    const recetasContainer = document.getElementById("muestra-recetas" );

    try {
        // Hacer petición al backend para obtener recetas del usuario
        const response = await fetch(`${API_URL}/muestrarecetas?autor=${usuario.id}`);
        const recetas = await response.json();

        if (recetas.length === 0) {
            recetasContainer.innerHTML = "<p>Este usuario no ha creado recetas aún.</p>";
        }

        recetas.forEach(receta => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <div class="card-image">
                    <img src="${API_URL }${receta.imagen}" alt="${receta.nombre}">
                </div>
                <div class="card-content">
                    <div class="card-rating">
                        <span class="star">★★★★★</span>
                        <span class="rating-number">${receta.calificacion} (${receta.numCalificaciones || 0})</span>
                    </div>
                    <h3 class="card-title">${receta.nombre}</h3>

                    <div class="card-info">
                        <div class="info-item">
                            <span class="info-icon">⏱️</span>
                            <span>${receta.tiempoPreparacion} min</span>
                        </div>
                        <div class="info-item">
                            <span class="info-icon">👥</span>
                            <span>${receta.porciones} porción(es)</span>
                        </div>
                        <div class="info-item">
                            <span class="info-icon">🔥</span>
                            <span>${receta.dificultad}</span>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn-receta">Ver Receta</button>
                    <button class="btn-receta eliminar">Eliminar</button>
                </div>
            `;
            recetasContainer.appendChild(card);

            const btnEliminar = card.querySelector(".btn-receta.eliminar");
            btnEliminar.addEventListener("click", () => {
                eliminarReceta(receta._id);
            });
        });

        const Conteorecetas = document.getElementById("recetas-creadas");
        Conteorecetas.innerHTML = recetas.length;

        const Favoritas = document.getElementById("Favoritas");
        try {
            const responseFav = await fetch(`${API_URL}/obtenerfavoritos`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const recetasFav = await responseFav.json();

            if (!responseFav.ok) throw new Error(recetasFav.error || "Error al obtener favoritos");

            Favoritas.innerHTML = recetasFav.length;            
        }catch(error){console.error("Error al cargar recetas del usuario:", error);
            Favoritas.innerHTML = 0;
        }

        const seguidores = document.getElementById("Seguidores");
        try {
            const resposeSeg = await fetch(`${API_URL}/obtenerseguidores`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const listseguidores = await resposeSeg.json();

            if (!resposeSeg.ok) throw new Error(listseguidores.error || "Error al obtener seguidores");

            seguidores.innerHTML = listseguidores.length;            
        }catch(error){
            console.error("Error al cargar recetas del usuario:", error);
            seguidores.innerHTML = 0;
        }

    } catch (error) {
        console.error("Error al cargar recetas del usuario:", error);
        recetasContainer.innerHTML = "<p>No se pudieron cargar las recetas.</p>";
    }
}


async function eliminarReceta(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch(`${API_URL}/rmiRecetas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al eliminar receta');
            }

            window.location.reload();
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}