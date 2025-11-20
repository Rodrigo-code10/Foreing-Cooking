import { mostrarRecetas } from './logicaRecetas.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const checkboxes = document.querySelectorAll('input[name="categoria[]"]');
    const buscador = document.getElementById('buscar_recetas');
    const botonesCategoria = document.querySelectorAll('.botonCategoria');

    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const seleccionadas = [...checkboxes]
                .filter(c => c.checked)
                .map(c => c.value);

            if (seleccionadas.length === 0) return;

            if (seleccionadas.length === 1) {
                mostrarRecetas({ categoria: seleccionadas[0] });
            } else {
                mostrarRecetas({ categoria: seleccionadas.join(',') });
            }
        });
    });

    botonesCategoria.forEach(btn => {
        btn.addEventListener('click', () => {
            const categoria=btn.dataset.categoria;
            mostrarRecetas({ categoria });
        });
    });

    buscador.addEventListener('input', (e) => {
        const texto = e.target.value.trim();

        // Si el usuario borra, solo limpia el contenedor
        if (texto === "") {
            document.querySelector('.cards').innerHTML = "";
            return;
        }

        mostrarRecetas({ nombre: texto });
    });

});


document.addEventListener("DOMContentLoaded", () => {

    const selectFiltro = document.getElementById("tipoFiltro");
    const opcionesEtiquetas = document.getElementById("opcionesEtiquetas");
    const opcionesIngredientes = document.getElementById("opcionesIngredientes");

    selectFiltro.addEventListener("change", () => {
        if (selectFiltro.value === "etiquetas") {
            opcionesEtiquetas.style.display = "grid";
            opcionesIngredientes.style.display = "none";
        } else {
            opcionesEtiquetas.style.display = "none";
            opcionesIngredientes.style.display = "grid";
        }
    });

});
