import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send("🚀 Servidor del Hotel corriendo correctamente!");
});

app.use((req, res, next) => {
  console.log("🧠 Método:", req.method);
  console.log("📍 Ruta:", req.url);
  console.log("📦 Body recibido:", req.body);
  next();
});

// Rutas de usuario
app.use("/api/users", userRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));

