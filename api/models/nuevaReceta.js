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
  ingredientes: [{
    nombre: { type: String, required: true },   
    cantidad: { type: Number, default: null }, 
    unidad: { type: String, default: null },   
    texto: { type: String, required: true }     
  }],
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

export function parseIngrediente(linea) {
  const original = linea.trim();

  const sinAcentos = original
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  let partes = sinAcentos.split(/\s+/);
  let cantidad = null;

  const esFraccion = v => /^\d+\/\d+$/.test(v);
  const esDecimal = v => /^\d+(\.\d+)?$/.test(v);
  const esRango = v => /^\d+(-|\–)\d+$/.test(v);

  if (partes.length) {
    const p0 = partes[0];

    if (esFraccion(p0)) {
      const [a, b] = p0.split("/").map(Number);
      cantidad = a / b;
      partes.shift();
    } else if (esDecimal(p0)) {
      cantidad = Number(p0);
      partes.shift();
    } else if (esRango(p0)) {
      const [a, b] = p0.split(/-|–/).map(Number);
      cantidad = (a + b) / 2; 
      partes.shift();
    }
  }

  const unidades = [
    "taza","tazas",
    "cucharada","cucharadas",
    "cucharadita","cucharaditas",
    "gramo","gramos","g",
    "kg","kilo","kilos",
    "ml","l","litro","litros",
    "pieza","piezas",
    "paquete","paquetes",
    "pizca","pizcas"
  ];

  let unidad = null;
  if (partes.length && unidades.includes(partes[0])) {
    unidad = partes.shift();
  }

  const stopwords = ["de", "del", "al", "a", "para", "por", "con", "en"];
  while (partes.length && stopwords.includes(partes[0])) {
    partes.shift();
  }

  const descriptores = [
    "picado","picada","picados",
    "finamente","fina","fino",
    "troceado","troceada",
    "molido","molida",
    "pelado","pelada",
    "cortado","cortada",
    "entero","entera"
  ];

  partes = partes.filter(p => !descriptores.includes(p));
  const nombre = partes.join(" ").trim();

  return { nombre, cantidad, unidad, texto: original };
}

NewRecetaSchema.pre('save', function(next) {
  if (this.ingredientes && Array.isArray(this.ingredientes)) {
    this.ingredientes = this.ingredientes.map(i => {
      if (typeof i === 'string') return parseIngrediente(i);
      return i; // si ya es objeto, no tocarlo
    });
  }

  // Limpiar pasos y categorías
  const limpiar = arr => arr.map(i => i.trim()).filter(i => i.length > 0);
  this.pasos = limpiar(this.pasos || []);
  this.categoria = limpiar(this.categoria || []);

  next();
});

export const Receta = mongoose.model('Receta', NewRecetaSchema);