import express from 'express';
import { verificarToken } from '../middleware/auth.js'; 
import { RecetaIA } from '../controllers/iaController.js'; 

const router = express.Router();

router.post("/ia/receta",verificarToken,RecetaIA);  

console.log("rutas ok");

export default router;