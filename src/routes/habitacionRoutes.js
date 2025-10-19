import { Router } from "express";
import {
    obtenerHabitaciones,
    obtenerHabitacionPorId,
    crearHabitacion,
    actualizarHabitacion,
    eliminarHabitacion
} from "../controllers/habitacionControllers.js";

const router = Router();

router.get("/", obtenerHabitaciones);
router.get("/:id", obtenerHabitacionPorId);
router.post("/", crearHabitacion);
router.put("/:id", actualizarHabitacion);
router.delete("/:id", eliminarHabitacion);

export default router;
