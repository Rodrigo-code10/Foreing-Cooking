import express from 'express';
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import {
    registrarUsuario,
    iniciarSesion,
    ModificarPerfil,
    TotalUsuarios,
    BuscarUsuario,
    EstadoPerfil,
    ModificarPaquete,
} from '../controllers/sesionController.js'; // Controlador para manejar la lógica de registro

import { verificarToken, soloAdmin, } from '../middleware/auth.js'; 

// Configuración de multer para guardar fotos
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Dynamic folders", // carpeta en cloudinary
        allowed_formats: ["jpg", "jpeg", "png"],
    },
});

const upload = multer({ storage });

const router = express.Router();

// Ruta para ver usuario
router.post('/login', iniciarSesion);    

// Ruta para registrar un nuevo usuario
router.post('/registrar', registrarUsuario); 

router.put('/editarperfil', verificarToken,upload.single("foto"), ModificarPerfil);

router.put('/editarPaquete', verificarToken, ModificarPaquete);

router.get('/BuscarUsuario',verificarToken, BuscarUsuario);

//Panel  Administrativo
router.put('/usuario/:id/Estado',verificarToken, soloAdmin, EstadoPerfil);

router.get('/CuentaUsuarios',verificarToken, soloAdmin, TotalUsuarios)

console.log("rutas ok");

export default router;
