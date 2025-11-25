import API_URL from './config.js';
import { mostrarMensaje } from './mensajes.js';

const token = localStorage.getItem("token");

document.addEventListener('DOMContentLoaded', async () => {
    const ContarReceta = document.getElementById('ContReceta');
    const solicitudes = document.getElementById('Solicitudes');
    const tablaBody = document.getElementById('tabla-body');

    crearModal();

    try {
        const response = await fetch(`${API_URL}/CuentaRecetas`);
        const data = await response.json();
        ContarReceta.innerHTML = data;
    } catch (error) {
        console.error("Error obteniendo recetas:", error);
        ContarReceta.innerHTML = "0";
    }

    try {
        const pendiente = await fetch(`${API_URL}/pendiente`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const pendienteData = await pendiente.json();
        solicitudes.innerHTML = pendienteData.length;

        tablaBody.innerHTML = "";

        // INSERTAR FILAS
        pendienteData.forEach(receta => {
            const tr = document.createElement("tr");

            // Normalizar fecha
            const fecha = receta.fechaCreacion ? new Date(receta.fechaCreacion).toLocaleString("es-MX", {
                dateStyle: "medium",
                timeStyle: "short"
            }) : "Sin fecha";

            tr.innerHTML = `
                <td>${receta.autor.nombre || "Sin nombre"}</td>
                <td>${receta.nombre || "N/A"}</td>
                <td>${fecha}</td>
                <td>
                    <button class="btn-ver">Ver y Editar</button>
                    <button class="btn-aprobar">Aprobar</button>
                    <button class="btn-rechazar">Rechazar</button>
                </td>
            `;

            tablaBody.appendChild(tr);

            tr.querySelector(".btn-ver").addEventListener("click", () => Ver(receta._id));
            tr.querySelector(".btn-aprobar").addEventListener("click", () => Aprobar(receta._id));
            tr.querySelector(".btn-rechazar").addEventListener("click", () => Rechazar(receta._id));
        });

    } catch (error) {
        console.error("Error obteniendo Pendientes:", error);
        solicitudes.innerHTML = "0";
    }
});

function crearModal() {
    const modalHTML = `
        <div id="modalReceta" class="modal-overlay">
            <div class="modal-container">
                <div class="modal-header">
                    <div class="modal-header-content">
                        <h2>Detalles de la Receta</h2>
                    </div>
                    <button class="modal-close" aria-label="Cerrar"> ✖️ </button>
                </div>
                
                <form id="formReceta" class="modal-form">
                    <input type="hidden" id="recetaId">
                    
                    <div class="form-grid">
                        <div class="form-field">
                            <label for="recetaNombre">
                                Nombre de la Receta
                            </label>
                            <input type="text" id="recetaNombre" class="input-modern" required placeholder="Ingresa el nombre de la receta">
                        </div>
                        
                        <div class="form-field">
                            <label for="recetaAutor"> Autor </label>
                            <input type="text" id="recetaAutor" class="input-modern input-readonly" readonly>
                        </div>
                    </div>
                    
                    <div class="form-field">
                        <label for="recetaDescripcion"> Descripción </label>
                        <textarea id="recetaDescripcion" class="textarea-modern" rows="3" placeholder="Describe brevemente esta receta..."></textarea>
                    </div>

                    <div class="form-field">
                        <label for="recetaTiempoPreparación">  Tiempo de Preparación </label>
                        <input type="number" id="recetaTiempoPreparación" class="input-modern" min="1">
                    </div>

                    <div class="form-field">
                        <label for="recetaPorciones">  Porciones </label>
                        <input type="number" id="recetaPorciones" class="input-modern" min="1">

                    </div>

                    <div class="form-field">
                        <label for="recetaDificultad">  Dificultad </label>
                        <select id="recetaDificultad" class="input-modern">
                            <option value="">Seleccionar...</option>
                            <option value="Fácil">Fácil</option>
                            <option value="Media">Media</option>
                            <option value="Difícil">Difícil</option>
                        </select>
                    </div>

                    <div class="form-field">
                        <label for="recetaCategoria">  Categoria </label>
                         <div class="checkbox-container">
                            <label><input type="checkbox" name="categoria" value="Saludable"> Saludable</label>
                            <label><input type="checkbox" name="categoria" value="Nutritivo"> Nutritivo</label>
                            <label><input type="checkbox" name="categoria" value="Grasoso"> Grasoso</label>
                            <label><input type="checkbox" name="categoria" value="Vegetariano"> Vegetariano</label>
                            <label><input type="checkbox" name="categoria" value="Dulce"> Dulce</label>
                            <label><input type="checkbox" name="categoria" value="Salado"> Salado</label>
                            <label><input type="checkbox" name="categoria" value="Picante"> Picante</label>
                            <label><input type="checkbox" name="categoria" value="Vegana"> Vegana</label>
                            <label><input type="checkbox" class="Tipo_platillo" name="categoria" value="Entrada"> Entrada</label>
                            <label><input type="checkbox" class="Tipo_platillo" name="categoria" value="Postre"> Postre</label>
                            <label><input type="checkbox" class="Tipo_platillo" name="categoria" value="Plato Fuerte"> Plato Fuerte</label>
                        </div>
                    </div>

                    <div class="form-field">
                        <label for="recetaIngredientes">  Ingredientes </label>
                        <textarea id="recetaIngredientes" class="textarea-modern" rows="5" placeholder="Escribe cada ingrediente en una línea nueva..."></textarea>
                        <span class="field-hint">Separa cada ingrediente en una nueva línea</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="recetaInstrucciones"> Instrucciones de Preparación </label>
                        <textarea id="recetaInstrucciones" class="textarea-modern" rows="5" placeholder="Escribe cada paso en una línea nueva..."></textarea>
                        <span class="field-hint">Escribe cada paso de preparación en una nueva línea</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="recetaFecha"> Fecha de Creación </label>
                        <input type="text" id="recetaFecha" class="input-modern input-readonly" readonly>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="submit" class="btn-primary">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('modalReceta');
    const cerrar = document.querySelector('.modal-close');
    const form = document.getElementById('formReceta');

    cerrar.addEventListener('click', () => cerrarModal());

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await guardarCambios();
    });

    function cerrarModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Función para ver y editar receta
async function Ver(id) {
    try {
        const response = await fetch(`${API_URL}/recetas/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();

        document.getElementById('recetaId').value = data._id;
        document.getElementById('recetaNombre').value = data.nombre || '';
        document.getElementById('recetaAutor').value = data.autor?.nombre || 'Sin autor';
        document.getElementById('recetaDescripcion').value = data.descripcion || '';
        document.getElementById('recetaTiempoPreparación').value = data.tiempoPreparacion || '';
        document.getElementById('recetaPorciones').value = data.porciones || '';
        document.getElementById('recetaDificultad').value = data.dificultad || '';
        
        const categorias = data.categoria || [];
        document.querySelectorAll('input[name="categoria"]').forEach(chk => {
            chk.checked = categorias.includes(chk.value);
        });

        const ingredientes = Array.isArray(data.ingredientes)
            ? data.ingredientes.join('\n')
            : data.ingredientes || '';
        document.getElementById('recetaIngredientes').value = ingredientes;

        const pasos = Array.isArray(data.pasos)
            ? data.pasos.join('\n')
            : data.pasos || '';
        document.getElementById('recetaInstrucciones').value = pasos;

        const fecha = data.fechaCreacion
            ? new Date(data.fechaCreacion).toLocaleString("es-MX", {
                dateStyle: "medium",
                timeStyle: "short"
            })
            : "Sin fecha";
        document.getElementById('recetaFecha').value = fecha;

        const modal = document.getElementById('modalReceta');
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

    } catch (error) {
        console.error("Error al ver receta:", error);
        mostrarMensaje('Error al cargar la receta', '#E01616');
    }
}

async function guardarCambios() {
    const id = document.getElementById('recetaId').value;
    const nombre = document.getElementById('recetaNombre').value;
    const descripcion = document.getElementById('recetaDescripcion').value;
    const ingredientes = document.getElementById('recetaIngredientes').value.split('\n').filter(i => i.trim());
    const pasos = document.getElementById('recetaInstrucciones').value.split('\n').filter(i => i.trim());

    const tiempoPreparacion = document.getElementById('recetaTiempoPreparación').value;
    const porciones = document.getElementById('recetaPorciones').value;
    const dificultad = document.getElementById('recetaDificultad').value;
    const categoria = Array.from(document.querySelectorAll('input[name="categoria"]:checked'))
                      .map(chk => chk.value);

    try {
        const response = await fetch(`${API_URL}/recetas/${id}/editar`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre,
                descripcion,
                ingredientes,
                pasos,
                tiempoPreparacion,
                porciones,
                dificultad,
                categoria
            })
        });

        if (response.ok) {
            const data = await response.json();
            mostrarMensaje('Receta actualizada correctamente', '#4CAF50');
            
            const modal = document.getElementById('modalReceta');
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                location.reload();
            }, 300);
        } else {
            throw new Error('Error al actualizar la receta');
        }

    } catch (error) {
        console.error("Error al guardar cambios:", error);
        mostrarMensaje('Error al guardar los cambios', '#E01616');
    }
}


async function Aprobar(id) {
    try {
        const response = await fetch(`${API_URL}/recetas/${id}/aprobar`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        mostrarMensaje(`Receta aprobada: ${data.nombre}`, '#4CAF50');
        location.reload();

    } catch (error) {
        mostrarMensaje(`Error: ${error.message}`, '#E01616');
    }
}

async function Rechazar(id) {
    try {
        const response = await fetch(`${API_URL}/recetas/${id}/rechazar`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        mostrarMensaje(`Receta rechazada: ${data.nombre}`, '#4CAF50');
        location.reload();
    } catch (error) {
        mostrarMensaje(`Error: ${error.message}`, '#E01616');
    }
}