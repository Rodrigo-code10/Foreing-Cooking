import mongoose from "mongoose";

const NewRecetaSchema = new mongoose.Schema({
  nombre:{
    type:String,
    required:true,
    trim:true //Quita espacio al inicio
  },
  descripcion:{
    type:String,
    required:true,
    trim:true
  },
  tiempoPreparacion:{
    type:Number,
    required:true,
    min:1
  },
  porciones:{
    type:Number,
    required:true,
    min:1
  },
  dificultad:{
    type:String,
    enum:['Fácil', 'Media', 'Difícil'],
    required:true
  },
  ingredientes:{
    type:[String],
    required:true
  },
  pasos:{
    type:[String],
    required:true
  },
  imagen:{
    type:String, //Guarda la dirección
    required:true
  },
  autor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Usuario',  //Hace referencia al usuario que subio
    required:true
  },
  fechaCreacion:{
    type:Date,
    default:Date.now
  },
  categoria: {
    type: [String],
    required:true
  },
  calificacion: {
    type:Number,
    default:0
  },
  numCalificaciones: { 
    type:Number, 
    default:0 
  },
  likes: { 
    type:Number, 
    default:0 
  },
  estado: {
    type: String,
    enum: ['pendiente', 'aprobada', 'rechazada'],
    default: 'pendiente'
  }
});

NewRecetaSchema.pre('save', function(next) {

  const limpiar = (arr) => {
    if (!arr || !Array.isArray(arr)) return arr;

    return arr
      .map(i => 
        i
          .replace(/\s+/g, ' ') // convierte saltos de línea y tabs en un solo espacio
          .trim()               // quita espacios inicio/fin
      )
      .filter(i => i.length > 0); // elimina strings vacíos
  };

  this.ingredientes = limpiar(this.ingredientes);
  this.pasos = limpiar(this.pasos);
  this.categoria = limpiar(this.categoria);

  next();
});
export const Receta = mongoose.model('Receta', NewRecetaSchema);
