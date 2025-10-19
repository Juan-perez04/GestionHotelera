import { db } from "../config/db.js";

// ✅ Obtener todos los huéspedes
export const obtenerHuespedes = async (req, res) => {
    try {
        const [huespedes] = await db.query("SELECT * FROM huesped");
        res.json(huespedes);
    } catch (error) {
        console.error("❌ Error al obtener huéspedes:", error);
        res.status(500).json({ mensaje: "Error al obtener huéspedes" });
    }
};

// ✅ Obtener huésped por ID
export const obtenerHuespedPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [huesped] = await db.query("SELECT * FROM huesped WHERE idHuesped = ?", [id]);

        if (huesped.length === 0)
            return res.status(404).json({ mensaje: "Huésped no encontrado" });

        res.json(huesped[0]);
    } catch (error) {
        console.error("❌ Error al obtener huésped:", error);
        res.status(500).json({ mensaje: "Error al obtener huésped" });
    }
};

// ✅ Crear huésped
export const crearHuesped = async (req, res) => {
    try {
        const { nombreHuesped, apellidoHuesped, tipoDocumento, numeroDocumento, telefono, correo, reside } = req.body;

        if (!nombreHuesped || !tipoDocumento || !numeroDocumento) {
            return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
        }

        await db.query(
            "INSERT INTO huesped (nombreHuesped, apellidoHuesped, tipoDocumento, numeroDocumento, telefono, correo, reside) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [nombreHuesped, apellidoHuesped, tipoDocumento, numeroDocumento, telefono, correo, reside]
        );

        res.status(201).json({ mensaje: "✅ Huésped registrado correctamente" });
    } catch (error) {
        console.error("❌ Error al registrar huésped:", error);
        res.status(500).json({ mensaje: "Error al registrar huésped" });
    }
};

// ✅ Actualizar huésped
export const actualizarHuesped = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreHuesped, apellidoHuesped, tipoDocumento, numeroDocumento, telefono, correo, reside } = req.body;

        const [resultado] = await db.query(
            "UPDATE huesped SET nombreHuesped=?, apellidoHuesped=?, tipoDocumento=?, numeroDocumento=?, telefono=?, correo=?, reside=? WHERE idHuesped=?",
            [nombreHuesped, apellidoHuesped, tipoDocumento, numeroDocumento, telefono, correo, reside, id]
        );

        if (resultado.affectedRows === 0)
            return res.status(404).json({ mensaje: "Huésped no encontrado" });

        res.json({ mensaje: "✅ Huésped actualizado correctamente" });
    } catch (error) {
        console.error("❌ Error al actualizar huésped:", error);
        res.status(500).json({ mensaje: "Error al actualizar huésped" });
    }
};

// ✅ Eliminar huésped
export const eliminarHuesped = async (req, res) => {
    try {
        const { id } = req.params;
        const [resultado] = await db.query("DELETE FROM huesped WHERE idHuesped = ?", [id]);

        if (resultado.affectedRows === 0)
            return res.status(404).json({ mensaje: "Huésped no encontrado" });

        res.json({ mensaje: "🗑️ Huésped eliminado correctamente" });
    } catch (error) {
        console.error("❌ Error al eliminar huésped:", error);
        res.status(500).json({ mensaje: "Error al eliminar huésped" });
    }
};
