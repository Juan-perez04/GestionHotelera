import { db } from "../config/db.js";

// Obtener todas las reservas
export const obtenerReservas = async (req, res) => {
    try {
        const [reservas] = await db.query(`
      SELECT r.*, h.numeroHabitacion, hu.nombreHuesped
      FROM reserva r
      JOIN habitacion h ON r.idHabitacion = h.idHabitacion
      JOIN huesped hu ON r.idHuesped = hu.idHuesped
    `);
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener reservas" });
    }
};

// Crear reserva
export const crearReserva = async (req, res) => {
    try {
        const { idHuesped, idHabitacion, fechaInicio, fechaFin, estadoReserva } = req.body;
        await db.query(
            "INSERT INTO reserva (idHuesped, idHabitacion, fechaInicio, fechaFin, estadoReserva) VALUES (?, ?, ?, ?, ?)",
            [idHuesped, idHabitacion, fechaInicio, fechaFin, estadoReserva]
        );
        res.status(201).json({ mensaje: "✅ Reserva creada correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear reserva" });
    }
};

// Actualizar
export const actualizarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const { fechaInicio, fechaFin, estadoReserva } = req.body;
        const [resultado] = await db.query(
            "UPDATE reserva SET fechaInicio=?, fechaFin=?, estadoReserva=? WHERE idReserva=?",
            [fechaInicio, fechaFin, estadoReserva, id]
        );
        if (resultado.affectedRows === 0)
            return res.status(404).json({ mensaje: "Reserva no encontrada" });
        res.json({ mensaje: "✅ Reserva actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar reserva" });
    }
};

// Eliminar
export const eliminarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const [r] = await db.query("DELETE FROM reserva WHERE idReserva=?", [id]);
        if (r.affectedRows === 0)
            return res.status(404).json({ mensaje: "Reserva no encontrada" });
        res.json({ mensaje: "🗑️ Reserva eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar reserva" });
    }
};
