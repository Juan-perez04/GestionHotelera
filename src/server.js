import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import empleadoRoutes from "./routes/empleadoRoutes.js";
import habitacionRoutes from "./routes/habitacionRoutes.js";
import huespedRoutes from "./routes/huespedRoutes.js";
import limpiezaRoutes from "./routes/limpiezaRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";
import usoRoutes from "./routes/usoRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // 👈 IMPORTANTE para que funcione req.body

app.get("/", (req, res) => {
  res.send("🚀 Servidor del Hotel corriendo correctamente!");
});

app.use("/api/users", userRoutes);
app.use("/api/empleados", empleadoRoutes);
app.use("/api/habitaciones", habitacionRoutes);
app.use("/api/huespedes", huespedRoutes);
app.use("/api/limpiezas", limpiezaRoutes);
app.use("/api/reservas", reservaRoutes);
app.use("/api/usos", usoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));
