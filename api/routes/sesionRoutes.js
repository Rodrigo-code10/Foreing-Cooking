import express from 'express';
import {
    registrarUsuario,
    iniciarSesion,
} from '../controllers/sesionController.js'; // Controlador para manejar la lógica de registro

const router = express.Router();

// Ruta para ver usuario
router.post('/login', iniciarSesion);    

// Ruta para registrar un nuevo usuario
router.post('/registrar', registrarUsuario); 

console.log("rutas ok");

export default router;
