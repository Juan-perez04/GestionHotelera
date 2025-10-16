import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

// --- REGISTRAR USUARIO ---
export const registrarUsuario = async (req, res) => {
    try {
        console.log("📥 Cuerpo recibido en el backend:", req.body);

        const { username, password } = req.body;
        console.log("👉 Datos extraídos:", { username, password });

        if (!username || !password) {
            console.log("⚠️ Faltan datos obligatorios");
            return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
        }

        // Verifica si ya existe
        const [existe] = await db.query(
            "SELECT * FROM usuario WHERE username = ?",
            [username]
        );

        if (existe.length > 0) {
            console.log("⚠️ El usuario ya existe en la base de datos");
            return res.status(400).json({ mensaje: "El usuario ya existe" });
        }

        // Encripta contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("🔐 Contraseña encriptada correctamente");

        // Inserta en la base de datos
        await db.query(
            "INSERT INTO usuario (username, password) VALUES (?, ?)",
            [username, hashedPassword]
        );

        console.log("✅ Usuario insertado correctamente en la base de datos");
        res.status(201).json({ mensaje: "✅ Usuario registrado correctamente" });
    } catch (error) {
        console.error("❌ Error al registrar usuario:", error);
        res.status(500).json({ mensaje: "Error interno al registrar usuario" });
    }
};

// --- LOGIN USUARIO ---
export const loginUsuario = async (req, res) => {
    try {
        console.log("📥 Intentando login con:", req.body);

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
        }

        // Buscar usuario
        const [usuarios] = await db.query(
            "SELECT * FROM usuario WHERE username = ?",
            [username]
        );

        if (usuarios.length === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        const usuario = usuarios[0];
        const esValido = await bcrypt.compare(password, usuario.password);

        if (!esValido) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        // Crear token JWT
        const token = jwt.sign(
            { id: usuario.idUsuario, username: usuario.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            mensaje: "✅ Login exitoso",
            token,
            usuario: {
                id: usuario.idUsuario,
                username: usuario.username
            }
        });
    } catch (error) {
        console.error("❌ Error al iniciar sesión:", error);
        res.status(500).json({ mensaje: "Error interno al iniciar sesión" });
    }
};

// --- TEST ROUTE ---
export const test = (req, res) => {
    res.json({ mensaje: "🔥 Servidor funcionando correctamente" });
};
