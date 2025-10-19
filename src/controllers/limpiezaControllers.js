import { db } from "../config/db.js";

// Obtener todas
export const obtenerLimpiezas = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT l.*, h.numeroHabitacion, e.nombreEmpleado
       FROM limpieza l
       JOIN habitacion h ON l.idHabitacion = h.idHabitacion
       JOIN empleado e ON l.idEmpleado = e.idEmpleado`
        );
        res.json(rows);
    } catch (err) {
        console.error("❌ Error al obtener limpiezas:", err);
        res.status(500).json({ mensaje: "Error al obtener limpiezas" });
    }
};

// Crear limpieza
export const crearLimpieza = async (req, res) => {
    try {
        const { idHabitacion, idEmpleado, observacion } = req.body;
        await db.query(
            "INSERT INTO limpieza (idHabitacion, idEmpleado, observacion) VALUES (?, ?, ?)",
            [idHabitacion, idEmpleado, observacion]
        );
        res.status(201).json({ mensaje: "✅ Limpieza registrada correctamente" });
    } catch (err) {
        res.status(500).json({ mensaje: "Error al registrar limpieza" });
    }
};

// Eliminar limpieza
export const eliminarLimpieza = async (req, res) => {
    try {
        const { id } = req.params;
        const [r] = await db.query("DELETE FROM limpieza WHERE idLimpieza = ?", [id]);
        if (r.affectedRows === 0)
            return res.status(404).json({ mensaje: "Limpieza no encontrada" });
        res.json({ mensaje: "🧽 Limpieza eliminada correctamente" });
    } catch (err) {
        res.status(500).json({ mensaje: "Error al eliminar limpieza" });
    }
};
