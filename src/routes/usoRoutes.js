import { Router } from "express";
import {
    obtenerUsos,
    crearUso,
    actualizarUso,
    eliminarUso
} from "../controllers/usoControllers.js";

const router = Router();

router.get("/", obtenerUsos);
router.post("/", crearUso);
router.put("/:id", actualizarUso);
router.delete("/:id", eliminarUso);

export default router;