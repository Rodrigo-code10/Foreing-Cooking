import express from 'express';
import multer from "multer";
import {
    verificarToken,
    crearReceta,
    mostrarRecetas,
    obtenerRecetaPorId,
    like,
    eliminarReceta,
    soloAdmin,
    Aprobar,
    Rechazar,
    Pendiente,
    ContarRecetas,
    Ver,
    Editar,
} from '../controllers/recetasController.js'; // Controlador para manejar la lógica de las recetas

import { 
    calificarReceta, 
    obtenerMiCalificacion 
} from '../controllers/recetasController.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Ruta para crear una receta
router.post("/newreceta", verificarToken, upload.single("imagen_receta"), crearReceta);   

router.get("/muestrarecetas", mostrarRecetas);

router.get("/recetas/:id", obtenerRecetaPorId);

router.post("/recetas/:id/like",verificarToken, like);

router.delete("/rmiRecetas/:id",verificarToken,eliminarReceta);

// Calificar una receta
router.post("/recetas/:id/calificar", verificarToken, calificarReceta);

// Obtener mi calificación de una receta
router.get("/recetas/:id/mi-calificacion", verificarToken, obtenerMiCalificacion);


//Panel Administrativo

router.put('/recetas/:id/aprobar',verificarToken, soloAdmin, Aprobar);

router.put('/recetas/:id/rechazar',verificarToken, soloAdmin, Rechazar);

router.get('/recetas/:id/ver',verificarToken, soloAdmin, Ver);

router.put('/recetas/:id/editar',verificarToken, Editar);

router.get('/pendiente',verificarToken, soloAdmin, Pendiente)

router.get('/CuentaRecetas', ContarRecetas)

console.log("rutas ok");

export default router;
