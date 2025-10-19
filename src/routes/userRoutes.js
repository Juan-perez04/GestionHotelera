import express from "express";
import {
  registrarUsuario,
  loginUsuario,

  test,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
}
  from "../controllers/userControllers.js";

test

const router = express.Router();

router.get("/test", test);
router.post("/register", registrarUsuario);
router.post("/login", loginUsuario);

router.get("/", obtenerUsuarios);
router.get("/:id", obtenerUsuarioPorId);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);
export default router;
