import { Usuario } from "../models/usuario.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET


export async function registrarUsuario(req, res) {
    try {
        const { nombre, email, password } = req.body;

        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        // Encriptar contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear usuario
        const nuevoUsuario = await Usuario.create({
            nombre,
            email,
            passwordHash: passwordHash,
        });

        // Crear token JWT
        const token = jwt.sign({ id: nuevoUsuario._id }, JWT_SECRET, { expiresIn: '7d' });

        // Responder al cliente
        res.status(201).json({
            mensaje: 'Usuario registrado exitosamente',
            token,
            usuario: {
                id: nuevoUsuario._id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol,
                foto: nuevoUsuario.foto,
                status: nuevoUsuario.status,
            }
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Hubo un error en el registro' });
    }
}


export async function iniciarSesion(req, res){
    try {
        const { email, password } = req.body;

        // Buscar usuario
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ error: 'Credenciales incorrectas' });
        }

        // Verificar contraseña
        const passwordValida = await bcrypt.compare(password, usuario.passwordHash);
        if (!passwordValida) {
            return res.status(400).json({ error: 'Credenciales incorrectas' });
        }

        // Crear token JWT
        const token = jwt.sign({ id: usuario._id }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            mensaje: 'Login exitoso',
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                foto: usuario.foto,
                status: usuario.status,
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión', detalle: error.message });
    }
}

