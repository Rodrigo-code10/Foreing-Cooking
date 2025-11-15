import { Receta } from "../models/NuevaReceta.js";
import { Usuario } from "../models/Usuario.js";

//import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

export async function crearReceta(req,res) {
    try {
        const usuario = await Usuario.findById(req.usuarioId);
        
        const nuevaReceta = new Receta({
            nombre: req.body.nombre_receta,
            descripcion: req.body.descripcion,
            tiempoPreparacion: req.body.tiempo_preparacion, 
            porciones: req.body.porciones,
            dificultad: req.body.dificultad, 
            ingredientes: req.body.ingredientes.split('\n'), 
            pasos: req.body.pasos.split('\n'),
            imagen: req.file ? req.file.filename : null, 
            autor: req.usuarioId,
            categoria: req.body.categoria 
        });

        await nuevaReceta.save();

        res.status(201).json({
            mensaje: 'Receta creada exitosamente',
            receta: nuevaReceta
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear receta', detalle: error.message });
    }
    
}


export function verificarToken(req, res, next) {
    const header = req.headers['authorization'];

    if (!header) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    const [bearer, token] = header.split(" ");

    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ error: "Formato de token inválido" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuarioId = decoded.id;
        next(); 
    } catch (error) {
        return res.status(403).json({ error: "Token inválido o expirado" });
    }
}
