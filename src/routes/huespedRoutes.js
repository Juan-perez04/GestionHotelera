import { Router } from "express";
import {
    obtenerHuespedes,
    obtenerHuespedPorId,
    crearHuesped,
    actualizarHuesped,
    eliminarHuesped
} from "../controllers/huespedControllers.js";

const router = Router();

router.get("/", obtenerHuespedes);
router.get("/:id", obtenerHuespedPorId);
router.post("/", crearHuesped);
router.put("/:id", actualizarHuesped);
router.delete("/:id", eliminarHuesped);

export default router;
