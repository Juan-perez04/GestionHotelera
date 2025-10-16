import { Router } from "express";

const router = Router();

// Ruta de prueba (para verificar conexión backend)
router.get("/test", (req, res) => {
    res.status(200).json({
        message: "🔥 Servidor funcionando correctamente (ruta /api/users/test)",
    });
});

// Ruta para registrar usuario (ejemplo)
router.post("/register", (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    if (!nombre || !correo || !contraseña) {
        return res.status(400).json({ error: "Faltan datos del usuario" });
    }

    res.status(201).json({
        message: "Usuario registrado correctamente (demo)",
        data: { nombre, correo },
    });
});

// Ruta para login (ejemplo)
router.post("/login", (req, res) => {
    const { correo, contraseña } = req.body;

    if (correo === "admin@example.com" && contraseña === "1234") {
        return res.status(200).json({ message: "✅ Login exitoso" });
    }

    res.status(401).json({ error: "❌ Credenciales incorrectas" });
});

export default router;
