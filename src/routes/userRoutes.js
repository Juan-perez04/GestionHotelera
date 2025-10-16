import express from "express";
import {
  registrarUsuario,
  loginUsuario,
  test
} from "../controllers/userController.js";

const router = express.Router();

router.get("/test", test);
router.post("/register", registrarUsuario);
router.post("/login", loginUsuario);

export default router;
