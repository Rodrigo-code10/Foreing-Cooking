import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {connectMongo} from "./config/db.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import Stripe from "stripe";

import sesionRoutes from "./routes/sesionRoutes.js";
import recetasRoutes from "./routes/recetasRoutes.js";
import favoritasRoutes from "./routes/favoritasRoutes.js";
import iaRoutes from "./routes/iaRoutes.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Opiniones",
            version: "1.0.0",
            description: "API para gestionar MongoDB",
        },
    },
    apis: ["./controllers/*.js"], // comentarios con formato @openapi
};

// //instancia de swagger
// const swaggerDocs = swaggerJSDoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


dotenv.config(); // Cargar variables de entorno
const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // para entender peticiones JSON

//proxy

app.use("/api", (req, res, next) => {
    req.url = req.url.replace("/api", "");
    next();
  });


// Conexiones a bases de datos 
await connectMongo();

// Rutas
app.get("/", (req,res) => {
    res.send(`
    <h2> API corriendo correctamente</h2>
    <p>Entorno: <b>${process.env.NODE_ENV || "development"}</b></p>
    <p>Puerto: <b>${process.env.MONGO_URI}</b></p>`);
});

app.get("/health", async (req, res) => {
    try {
        const mongoOk = mongoose.connection.readyState === 1;
        
        res.status(mongoOk ? 200 : 503).json({
            status: mongoOk ? "ok" : "error",
            services: {
                mongo: mongoOk ? "connected" : "disconnected",
            },
            environment: process.env.NODE_ENV || "development",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(503).json({
            status: "error",
            error: error.message,
            timestamp: new Date().toISOString(),
        });
    }
});

// Rutas 
app.use("/", sesionRoutes);
app.use("/", recetasRoutes);
app.use("/", favoritasRoutes);
app.use("/", iaRoutes);

app.get("/config", (req, res) => {
    res.json({
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
      apiUrl: process.env.URL_API
    });
});
  
  
// Endpoint para crear un Payment Intent
app.post("/pagos/crear", async (req, res) => {
    try {
        const { monto, moneda, descripcion } = req.body;

        if (!monto) {
            return res.status(400).json({ error: "Monto requerido" });
        }

        // Crear Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: monto,
            currency: moneda || "mxn",
            description: descripcion || "Pago tienda",
            automatic_payment_methods: {
                enabled: true,
            }
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
            idTransaccion: paymentIntent.id
        });

    } catch (error) {
        console.log("Error Stripe:", error);
        res.status(500).json({ error: error.message });
    }
});

// Instancia de swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
});
