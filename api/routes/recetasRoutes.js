import express from 'express';
import multer from "multer";
import {
    verificarToken,
    crearReceta,
} from '../controllers/recetasController.js'; // Controlador para manejar la lógica de las recetas

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Ruta para crear una receta
router.post("/newreceta", verificarToken, upload.single("imagen_receta"), crearReceta);   
console.log("rutas ok");

export default router;
