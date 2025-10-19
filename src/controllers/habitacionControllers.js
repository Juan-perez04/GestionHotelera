import { db } from "../config/db.js";

// ✅ Obtener todas las habitaciones
export const obtenerHabitaciones = async (req, res) => {
  try {
    const [habitaciones] = await db.query("SELECT * FROM habitacion");
    res.json(habitaciones);
  } catch (error) {
    console.error("❌ Error al obtener habitaciones:", error);
    res.status(500).json({ mensaje: "Error al obtener habitaciones" });
  }
};

// ✅ Obtener una habitación por ID
export const obtenerHabitacionPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [habitacion] = await db.query(
      "SELECT * FROM habitacion WHERE idHabitacion = ?",
      [id]
    );

    if (habitacion.length === 0)
      return res.status(404).json({ mensaje: "Habitación no encontrada" });

    res.json(habitacion[0]);
  } catch (error) {
    console.error("❌ Error al obtener habitación:", error);
    res.status(500).json({ mensaje: "Error al obtener habitación" });
  }
};

// ✅ Crear una nueva habitación
export const crearHabitacion = async (req, res) => {
  try {
    const { numeroHabitacion, tipoHabitacion, precio, estado, observaciones } = req.body;

    if (!numeroHabitacion || !tipoHabitacion || !precio) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    await db.query(
      "INSERT INTO habitacion (numeroHabitacion, tipoHabitacion, precio, estado, observaciones) VALUES (?, ?, ?, ?, ?)",
      [numeroHabitacion, tipoHabitacion, precio, estado || "Disponible", observaciones || null]
    );

    res.status(201).json({ mensaje: "✅ Habitación creada correctamente" });
  } catch (error) {
    console.error("❌ Error al crear habitación:", error);
    res.status(500).json({ mensaje: "Error al crear habitación" });
  }
};

// ✅ Actualizar habitación
export const actualizarHabitacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { numeroHabitacion, tipoHabitacion, precio, estado, observaciones } = req.body;

    const [resultado] = await db.query(
      "UPDATE habitacion SET numeroHabitacion = ?, tipoHabitacion = ?, precio = ?, estado = ?, observaciones = ? WHERE idHabitacion = ?",
      [numeroHabitacion, tipoHabitacion, precio, estado, observaciones, id]
    );

    if (resultado.affectedRows === 0)
      return res.status(404).json({ mensaje: "Habitación no encontrada" });

    res.json({ mensaje: "✅ Habitación actualizada correctamente" });
  } catch (error) {
    console.error("❌ Error al actualizar habitación:", error);
    res.status(500).json({ mensaje: "Error al actualizar habitación" });
  }
};

// ✅ Eliminar habitación
export const eliminarHabitacion = async (req, res) => {
  try {
    const { id } = req.params;
    const [resultado] = await db.query(
      "DELETE FROM habitacion WHERE idHabitacion = ?",
      [id]
    );

    if (resultado.affectedRows === 0)
      return res.status(404).json({ mensaje: "Habitación no encontrada" });

    res.json({ mensaje: "🗑️ Habitación eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar habitación:", error);
    res.status(500).json({ mensaje: "Error al eliminar habitación" });
  }
};
