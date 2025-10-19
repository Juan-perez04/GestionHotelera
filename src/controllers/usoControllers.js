import { db } from "../config/db.js";

// Obtener usos
export const obtenerUsos = async (req, res) => {
    try {
        const [usos] = await db.query(`
      SELECT u.*, h.numeroHabitacion, hu.nombreHuesped
      FROM uso u
      JOIN habitacion h ON u.idHabitacion = h.idHabitacion
      JOIN huesped hu ON u.idHuesped = hu.idHuesped
    `);
        res.json(usos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usos" });
    }
};

// Crear uso
export const crearUso = async (req, res) => {
    try {
        const { idHabitacion, idHuesped, fechaEntrada, fechaSalida, estadoUso } = req.body;
        await db.query(
            "INSERT INTO uso (idHabitacion, idHuesped, fechaEntrada, fechaSalida, estadoUso) VALUES (?, ?, ?, ?, ?)",
            [idHabitacion, idHuesped, fechaEntrada, fechaSalida, estadoUso]
        );
        res.status(201).json({ mensaje: "✅ Uso registrado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al registrar uso" });
    }
};

// Finalizar uso
export const actualizarUso = async (req, res) => {
    try {
        const { id } = req.params;
        const { fechaSalida, estadoUso } = req.body;
        const [resultado] = await db.query(
            "UPDATE uso SET fechaSalida=?, estadoUso=? WHERE idUso=?",
            [fechaSalida, estadoUso, id]
        );
        if (resultado.affectedRows === 0)
            return res.status(404).json({ mensaje: "Uso no encontrado" });
        res.json({ mensaje: "✅ Uso actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar uso" });
    }
};

// Eliminar uso
export const eliminarUso = async (req, res) => {
    try {
        const { id } = req.params;
        const [r] = await db.query("DELETE FROM uso WHERE idUso=?", [id]);
        if (r.affectedRows === 0)
            return res.status(404).json({ mensaje: "Uso no encontrado" });
        res.json({ mensaje: "🗑️ Uso eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar uso" });
    }
};
