import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

// --- REGISTRAR USUARIO ---
export const registrarUsuario = async (req, res) => {
    try {
        console.log("📥 Cuerpo recibido en el backend:", req.body);

        const { nombre, usuario, password, rol } = req.body;
        console.log("👉 Datos extraídos:", { nombre, usuario, password, rol });

        if (!nombre || !usuario || !password) {
            console.log("⚠️ Faltan datos obligatorios");
            return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
        }

        // Verifica si ya existe
        const [existe] = await db.query(
            "SELECT * FROM usuario WHERE usuario = ?",
            [usuario]
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
            "INSERT INTO usuario (nombre, usuario, password, rol, activo) VALUES (?, ?, ?, ?, 1)",
            [nombre, usuario, hashedPassword, rol || "recepcionista"]
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

        const { usuario, password } = req.body;

        if (!usuario || !password) {
            return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
        }

        // Buscar usuario
        const [usuarios] = await db.query(
            "SELECT * FROM usuario WHERE usuario = ?",
            [usuario]
        );

        if (usuarios.length === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        const user = usuarios[0];
        const esValido = await bcrypt.compare(password, user.password);

        if (!esValido) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        // Crear token JWT
        const token = jwt.sign(
            { id: user.idUsuario, usuario: user.usuario, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            mensaje: "✅ Login exitoso",
            token,
            usuario: {
                id: user.idUsuario,
                nombre: user.nombre,
                usuario: user.usuario,
                rol: user.rol
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

// --- OBTENER TODOS LOS USUARIOS ---
export const obtenerUsuarios = async (req, res) => {
    try {
        const [usuarios] = await db.query("SELECT * FROM usuario");
        res.json(usuarios);
    } catch (error) {
        console.error("❌ Error al obtener usuarios:", error);
        res.status(500).json({ mensaje: "Error interno al obtener usuarios" });
    }
};

// --- OBTENER USUARIO POR ID ---
export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [usuarios] = await db.query("SELECT * FROM usuario WHERE idUsuario = ?", [id]);

        if (usuarios.length === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json(usuarios[0]);
    } catch (error) {
        console.error("❌ Error al obtener usuario:", error);
        res.status(500).json({ mensaje: "Error interno al obtener usuario" });
    }
};

// --- ACTUALIZAR USUARIO ---
export const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, usuario, password, rol, activo } = req.body;

        let hashedPassword = null;
        if (password) hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            `UPDATE usuario SET
                nombre = IFNULL(?, nombre),
                usuario = IFNULL(?, usuario),
                password = IFNULL(?, password),
                rol = IFNULL(?, rol),
                activo = IFNULL(?, activo)
            WHERE idUsuario = ?`,
            [nombre, usuario, hashedPassword, rol, activo, id]
        );

        res.json({ mensaje: "✅ Usuario actualizado correctamente" });
    } catch (error) {
        console.error("❌ Error al actualizar usuario:", error);
        res.status(500).json({ mensaje: "Error interno al actualizar usuario" });
    }
};

// --- ELIMINAR USUARIO ---
export const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM usuario WHERE idUsuario = ?", [id]);
        res.json({ mensaje: "✅ Usuario eliminado correctamente" });
    } catch (error) {
        console.error("❌ Error al eliminar usuario:", error);
        res.status(500).json({ mensaje: "Error interno al eliminar usuario" });
    }
};

