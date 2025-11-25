import { mostrarRecetas } from './logicaRecetas.js';
import API_URL from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    const buscador = document.getElementById('buscar_recetas');
    const botonesCategoria = document.querySelectorAll('.botonCategoria');
    const selectFiltro = document.getElementById('tipoFiltro');

    const contenedorEtiquetas = document.getElementById('contenedor-etiquetas');
    const contenedorIngredientes = document.getElementById('contenedor-ingredientes');

    function procesarCheckboxes() {
        let tipo = selectFiltro.value;

        if (tipo === "etiquetas") {
            const checks = document.querySelectorAll('input[name="categoria"]:checked');
            const valores = [...checks].map(c => c.value);

            if (valores.length > 0) {
                mostrarRecetas({ categoria: valores });
            }

        } else if (tipo === "ingredientes") {
            const checks = document.querySelectorAll('input[name="ingredientes"]:checked');
            const valores = [...checks].map(c => c.value);

            if (valores.length > 0) {
                mostrarRecetas({ ingredientes: valores });
            }
        }
    }

    document.addEventListener('change', e => {
        if (e.target.matches('input[name="categoria"]') ||
            e.target.matches('input[name="ingredientes"]')) {
            procesarCheckboxes();
        }
    });

    selectFiltro.addEventListener('change', function() {    //Solo pa mostara que filtro poder ver
        contenedorEtiquetas.style.display = 'none';
        contenedorIngredientes.style.display = 'none';

        if (this.value === 'etiquetas') {
            contenedorEtiquetas.style.display='block';
        } else if (this.value === 'ingredientes') {
            contenedorIngredientes.style.display='block';
        }
    });

    botonesCategoria.forEach(btn => {
        btn.addEventListener('click', () => {
            const categoria = btn.dataset.categoria;
            mostrarRecetas({ categoria });
        });
    });

    buscador.addEventListener('input', (e) => {
        const texto = e.target.value.trim();

        if (texto === "") {
            document.querySelector('.cards').innerHTML = "";
            return;
        }

        buscarRecetaTodas(texto)
    });

});

async function buscarRecetaTodas(texto){

    let resultados = await fetch(`${API_URL}/muestrarecetas?nombre=${texto}`)
        .then(r => r.json())
        .catch(() => []);

    if (resultados.length > 0) {
        mostrarRecetas({ nombre: texto });
        return;
    }

    resultados = await fetch(`${API_URL}/muestrarecetas?ingredientes=${texto}`)
        .then(r => r.json())
        .catch(() => []);

    if (resultados.length > 0) {
        mostrarRecetas({ ingredientes: texto });
        return;
    }

    resultados = await fetch(`${API_URL}/muestrarecetas?categoria=${texto}`)
        .then(r => r.json())
        .catch(() => []);

    mostrarRecetas({ categoria: texto });
}