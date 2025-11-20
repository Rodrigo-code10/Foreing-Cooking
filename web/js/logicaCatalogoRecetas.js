import { mostrarRecetas} from './logicaRecetas.js';

document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[name="categoria[]"]');

    // Primero mostramos TODO
    mostrarRecetas();

    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const seleccionadas = [...checkboxes]
                .filter(c => c.checked)
                .map(c => c.value);

            if (seleccionadas.length === 0) {
                // Sin filtros
                mostrarRecetas();
            } else if (seleccionadas.length === 1) {
                // Una sola
                mostrarRecetas({ categoria: seleccionadas[0] });
            } else {
                // Varias → string separado por comas
                mostrarRecetas({ categoria: seleccionadas.join(',') });
            }
        });
    });
});
