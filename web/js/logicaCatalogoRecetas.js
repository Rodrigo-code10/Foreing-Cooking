import { mostrarRecetas} from './logicaRecetas.js';

document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[name="categoria[]"]');

    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const seleccionadas = [...checkboxes]
                .filter(c => c.checked)
                .map(c => c.value);

            if (seleccionadas.length === 0) {
                
            } else if (seleccionadas.length === 1) {

                mostrarRecetas({ categoria: seleccionadas[0] });
            } else {
                mostrarRecetas({ categoria: seleccionadas.join(',') });
            }
        });
    });
});
