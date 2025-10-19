import { Router } from "express";
import {
    obtenerLimpiezas,
    crearLimpieza,
    eliminarLimpieza
} from "../controllers/limpiezaControllers.js";

const router = Router();

router.get("/", obtenerLimpiezas);
router.post("/", crearLimpieza);
router.delete("/:id", eliminarLimpieza);

export default router;
