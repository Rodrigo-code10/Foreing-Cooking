import { mostrarRecetas } from './logicaRecetas.js';
import API_URL from './config.js';

let filtrosActuales = null;   
let paginaActual = 1;         
const LIMIT = 8;             

document.addEventListener('DOMContentLoaded', () => {
    const buscador = document.getElementById('buscar_recetas');

    function procesarCheckboxes() {

        const checksCat = [...document.querySelectorAll('input[name="categoria"]:checked')]
            .map(c => c.value);

        const checksIng = [...document.querySelectorAll('input[name="ingredientes"]:checked')]
            .map(c => c.value);

        // Si no hay filtros marcados limpiamos
        if (checksCat.length === 0 && checksIng.length === 0) {
            document.querySelector('.cards').innerHTML = "";
            const pag = document.querySelector('.paginacion');
            if (pag) pag.innerHTML = "";
            filtrosActuales = null;
            paginaActual = 1;
            return;
        }

        const filtros = { orden: 'top' };  

        if (checksCat.length > 0) filtros.categoria = checksCat;
        if (checksIng.length > 0) filtros.ingredientes = checksIng;

        filtrosActuales = filtros;
        paginaActual = 1;
        cargarPagina(paginaActual);
    }
    document.addEventListener('change', e => {
        if (e.target.matches('input[name="categoria"]') ||
            e.target.matches('input[name="ingredientes"]')) {

            procesarCheckboxes();
        }
    });

    buscador.addEventListener('input', (e) => {
        const textoCrudo = e.target.value;
        const textoNormalizado = textoCrudo.trim().toLowerCase();

        if (textoNormalizado === "") {o
            document.querySelector('.cards').innerHTML = "";
            const pag = document.querySelector('.paginacion');
            if (pag) pag.innerHTML = "";
            filtrosActuales = null;
            paginaActual = 1;
            return;
        }

        buscarRecetaTodas(textoCrudo);
    });
});

async function cargarPagina(pagina = paginaActual) {
    if (!filtrosActuales) return;

    paginaActual = pagina;

    const filtrosConPagina = {
        ...filtrosActuales,
        page: paginaActual,
        limit: LIMIT
    };

    await mostrarRecetas('.cards', filtrosConPagina);
    await dibujarPaginacion();

    setTimeout(enfocarRecetas, 200);
}

async function dibujarPaginacion() {
    const cont = document.querySelector('.paginacion');
    if (!cont) return;

    cont.innerHTML = '';

    if (!filtrosActuales) return;

    // Botón Anterior
    if (paginaActual > 1) {
        const btnPrev = document.createElement('button');
        btnPrev.type = 'button';
        btnPrev.textContent = 'Anterior';
        btnPrev.addEventListener('click', () => {
            cargarPagina(paginaActual - 1);
        });
        cont.appendChild(btnPrev);
    }

    // Texto con número de página
    const span = document.createElement('span');
    span.textContent = `Página ${paginaActual}`;
    cont.appendChild(span);

    //Pagina Siguientye
    const haySiguiente = await existePagina(paginaActual + 1);
    if (haySiguiente) {
        const btnNext = document.createElement('button');
        btnNext.type = 'button';
        btnNext.textContent = 'Siguiente';
        btnNext.addEventListener('click', () => {
            cargarPagina(paginaActual + 1);
        });
        cont.appendChild(btnNext);
    }
}

async function existePagina(pagina) {
    if (!filtrosActuales) return false;

    const filtrosSiguiente = {
        ...filtrosActuales,
        page: pagina,
        limit: LIMIT
    };

    const queryString = new URLSearchParams(filtrosSiguiente).toString();
    const url = `${API_URL}/muestrarecetas?${queryString}`;

    try {
        const resp = await fetch(url);
        const recetas = await resp.json();
        
        return Array.isArray(recetas) && recetas.length > 0;
    } catch (error) {
        console.error('Error comprobando siguiente página:', error);
        return false;
    }
}

async function buscarRecetaTodas(texto) {
    const textoNormalizado = texto.trim().toLowerCase();

    if (textoNormalizado === "todas") {
        filtrosActuales = { orden: 'top' }; // sin filtros, solo orden
        paginaActual = 1;
        await cargarPagina(paginaActual);
        return;
    }

    let resultados = [];

    try {
        resultados = await fetch(
            `${API_URL}/muestrarecetas?nombre=${encodeURIComponent(texto)}&orden=top&limit=${LIMIT}&page=1`
        ).then(r => r.json());
    } catch (e) {
        resultados = [];
    }

    if (Array.isArray(resultados) && resultados.length > 0) {
        filtrosActuales = { nombre: texto, orden: 'top' };
        paginaActual = 1;
        await cargarPagina(paginaActual);
        return;
    }

    try {
        resultados = await fetch(
            `${API_URL}/muestrarecetas?ingredientes=${encodeURIComponent(texto)}&orden=top&limit=${LIMIT}&page=1`
        ).then(r => r.json());
    } catch (e) {
        resultados = [];
    }

    if (Array.isArray(resultados) && resultados.length > 0) {
        filtrosActuales = { ingredientes: texto, orden: 'top' };
        paginaActual = 1;
        await cargarPagina(paginaActual);
        return;
    }

    try {
        resultados = await fetch(
            `${API_URL}/muestrarecetas?categoria=${encodeURIComponent(texto)}&orden=top&limit=${LIMIT}&page=1`
        ).then(r => r.json());
    } catch (e) {
        resultados = [];
    }

    filtrosActuales = { categoria: texto, orden: 'top' };
    paginaActual = 1;
    await cargarPagina(paginaActual);
}

function enfocarRecetas() {
    const cards = document.querySelector('.cards');
    if (!cards) return;

    cards.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}