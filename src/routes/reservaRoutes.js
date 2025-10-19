import { Router } from "express";
import {
    obtenerReservas,
    crearReserva,
    actualizarReserva,
    eliminarReserva
} from "../controllers/reservaControllers.js";

const router = Router();

router.get("/", obtenerReservas);
router.post("/", crearReserva);
router.put("/:id", actualizarReserva);
router.delete("/:id", eliminarReserva);

export default router;