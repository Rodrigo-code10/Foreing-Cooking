import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  rol: { type: String, enum: ["usuario", "admin"], default: "usuario" },
  foto:{ type:String, default: "https://res.cloudinary.com/ddnarqecz/image/upload/v1764514329/SinFoto_f1nbvo.png"},
  status: { type:String },
  fechaRegistro: { type: Date, default: Date.now },
  estado: { type: String, enum: ['active', 'desactive'], default: 'active' }
});

export const Usuario = mongoose.model("Usuario", usuarioSchema);
