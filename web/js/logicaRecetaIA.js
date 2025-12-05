import API_URL from './config.js';

const categoriaOtro = document.getElementById('categoriaOtro');
const inputOtro = document.getElementById('inputOtro');
const form = document.getElementById('formCrearReceta');

categoriaOtro.addEventListener('change', function () {
    if (this.checked) {
        inputOtro.disabled = false;
        inputOtro.focus();
    }
});

document.querySelectorAll('.Tipo_platillo:not(#categoriaOtro)').forEach(radio => {
    radio.addEventListener('change', function () {
        inputOtro.disabled = true;
        inputOtro.value = '';
    });
});

inputOtro.addEventListener('input', function () {
    categoriaOtro.value = this.value.trim();
});

function generarPrompt(formData) {
    return `
    Situación
    El usuario necesita generar recetas personalizadas basadas en parámetros específicos proporcionados a través de un formulario. La receta debe adaptarse dinámicamente según el tiempo disponible, número de porciones, nivel de dificultad, tipo de platillo e ingredientes disponibles.

    Tarea
    Generar una receta completa y coherente que cumpla exactamente con los parámetros especificados: tiempo de preparación, porciones, nivel de dificultad, tipo de platillo e ingredientes disponibles. La respuesta debe ser exclusivamente un objeto JSON válido sin texto adicional.

    Objetivo
    Proporcionar al usuario una receta práctica, realista y lista para ejecutar que respete todas las restricciones indicadas y sea coherente con el tipo de platillo solicitado.

    Conocimiento
    - Los ingredientes utilizados deben ser reales y emplearse de manera culinariamente correcta.
    - Las cantidades de ingredientes deben ajustarse proporcionalmente al número de porciones especificado.
    - El tiempo total de la receta no debe exceder el tiempo de preparación indicado.
    - El nivel de dificultad debe reflejarse en la complejidad de los pasos y técnicas requeridas.
    - La receta debe ser coherente y lógica respecto al tipo de platillo seleccionado.
    - El formato de respuesta debe ser un objeto JSON válido sin ningún texto adicional antes o después.

    Todo esto se debe tener a lo que proporciona el usuario que quiere ver, por lo que considera estos parámetros:
    tiempo: ${formData.tiempo},
    porciones: ${formData.porciones}, 
    dificultad: ${formData.dificultad}, 
    categoria: ${formData.categoria}, 
    ingredientes: ${formData.ingredientes}, 

    Estructura JSON requerida:
    {
    "titulo": "string",
    "descripcion": "string",
    "tipo_platillo": "string",
    "porciones": number,
    "tiempo_total_minutos": number,
    "dificultad": "string",
    "ingredientes": [
        {
        "nombre": "string",
        "cantidad": number,
        "unidad": "string"
        }
    ],
    "pasos": [
        {
        "numero": number,
        "descripcion": "string"
        }
    ],
    "notas_utiles": [
        "string"
    ]
    }

    El asistente debe generar una receta que utilice los ingredientes y sus cantidades disponibles proporcionados, respete el tiempo de preparación máximo, se adapte al número de porciones requerido, coincida con el nivel de dificultad especificado y sea coherente con el tipo de platillo indicado. La respuesta debe contener únicamente el objeto JSON válido sin explicaciones, preámbulos ni texto adicional.
    `;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (categoriaOtro.checked && !inputOtro.value.trim()) {
        inputOtro.focus();
        return;
    }

    const categoriaSeleccionada = document.querySelector('.Tipo_platillo:checked');

    const formData = {
        tiempo: document.getElementById('tiempo_preparacion').value,
        porciones: document.getElementById('porciones').value,
        dificultad: document.getElementById('dificultad').value,
        categoria: categoriaSeleccionada.value,
        ingredientes: document.getElementById('ingredientes').value.trim()
    };

    console.log("Enviando datos:", formData);
    cargarPregunta(formData);
});

async function cargarPregunta(formData) {
    const botonEnviar = document.querySelector('.enviar');
    const textoBoton = document.getElementById('Envio_Datos');
    
    botonEnviar.disabled = true;
    textoBoton.textContent = 'Generando receta...';

    try {
        const response = await fetch(`${API_URL}/ia/receta`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                mensaje: generarPrompt(formData)
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(data);
            textoBoton.textContent = "Error generando receta.";
            botonEnviar.disabled = false;
            return;
        }

        console.log("Respuesta de backend:", data.respuesta);
        desplegarReceta(data.respuesta);

    } catch (error) {
        console.error("Error al conectar al backend:", error);
        textoBoton.textContent = "Error al conectar con el servidor.";
        botonEnviar.disabled = false;
    }
}

function desplegarReceta(textoJSON) {
    try {
        let jsonLimpio = textoJSON.trim();
        jsonLimpio = jsonLimpio.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        const receta = JSON.parse(jsonLimpio);
        
        // Ocultar el formulario
        document.querySelector('.Formulario_Receta').style.display = 'none';
        
        // Crear el contenedor de la receta
        const contenedorReceta = document.createElement('div');
        contenedorReceta.className = 'receta-generada';
        contenedorReceta.innerHTML = `
            <div class="receta-header">
                <button class="btn-regresar">
                    ← Generar otra receta
                </button>
                <h1 class="receta-titulo">${receta.titulo}</h1>
                <p class="receta-descripcion">${receta.descripcion}</p>
                
                <div class="receta-info-grid">
                    <div class="info-item">
                        <div>
                            <span class="info-label">Tiempo</span>
                            <span class="info-value">${receta.tiempo_total_minutos} min</span>
                        </div>
                    </div>
                    <div class="info-item">
                        <div>
                            <span class="info-label">Porciones</span>
                            <span class="info-value">${receta.porciones}</span>
                        </div>
                    </div>
                    <div class="info-item">
                        <div>
                            <span class="info-label">Dificultad</span>
                            <span class="info-value">${receta.dificultad}</span>
                        </div>
                    </div>
                    <div class="info-item">
                        <div>
                            <span class="info-label">Tipo</span>
                            <span class="info-value">${receta.tipo_platillo}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="receta-contenido">
                <div class="receta-seccion">
                    <h2 class="seccion-titulo">
                        Ingredientes
                    </h2>
                    <ul class="lista-ingredientes">
                        ${receta.ingredientes.map(ing => `                              
                            <li class="ingrediente-item">
                                <span class="ingrediente-cantidad">${ing.cantidad} ${ing.unidad}</span>
                                <span class="ingrediente-nombre">${ing.nombre}</span>
                            </li> `).join('')}
                    </ul>
                </div>

                <div class="receta-seccion">
                    <h2 class="seccion-titulo">
                        Preparación
                    </h2>
                    <ol class="lista-pasos">
                        ${receta.pasos.map(paso => `
                            <li class="paso-item">
                                <span class="paso-numero">${paso.numero}</span>
                                <p class="paso-descripcion">${paso.descripcion}</p>
                            </li>
                        `).join('')}
                    </ol>
                </div>

                ${receta.notas_utiles && receta.notas_utiles.length > 0 ? `
                    <div class="receta-seccion notas-seccion">
                        <h2 class="seccion-titulo">
                            Notas Útiles
                        </h2>
                        <ul class="lista-notas">
                            ${receta.notas_utiles.map(nota => `
                                <li class="nota-item">${nota}</li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
        
        document.querySelector('.Formulario_contenedor').appendChild(contenedorReceta);
        
        setTimeout(() => {
            contenedorReceta.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1000);
        
    } catch (error) {
        console.error("Error al parsear la receta:", error);
        alert("Hubo un error al mostrar la receta. Por favor intenta de nuevo.");
    }
}

document.addEventListener('click', function(e) {
    if (e.target.closest('.btn-regresar')) {

        const recetaGenerada = document.querySelector('.receta-generada');
        const formulario = document.querySelector('.Formulario_Receta');

        if (recetaGenerada) {
            recetaGenerada.remove();
        }

        formulario.style.display = 'block';

        form.reset();
        inputOtro.disabled = true;
        inputOtro.value = '';

        const textoBoton = document.getElementById('Envio_Datos');
        const botonEnviar = document.querySelector('.enviar'); 
        botonEnviar.disabled = false;
        textoBoton.textContent = 'Generar Receta con IA';

        setTimeout(() => {
            formulario.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
});