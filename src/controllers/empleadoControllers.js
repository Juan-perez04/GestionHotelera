import { db } from "../config/db.js";

// --- OBTENER TODOS LOS EMPLEADOS ---
export const obtenerEmpleados = async (req, res) => {
    try {
        const [empleados] = await db.query("SELECT * FROM empleado");
        res.json(empleados);
    } catch (error) {
        console.error("❌ Error al obtener empleados:", error);
        res.status(500).json({ mensaje: "Error al obtener empleados" });
    }
};
// --- OBTENER EMPLEADO POR ID ---
export const obtenerEmpleadoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [empleado] = await db.query("SELECT * FROM empleado WHERE idEmpleado = ?", [id]);

        if (empleado.length === 0) {
            return res.status(404).json({ mensaje: "Empleado no encontrado" });
        }

        res.json(empleado[0]);
    } catch (error) {
        console.error("❌ Error al obtener empleado por ID:", error);
        res.status(500).json({ mensaje: "Error interno" });
    }
};
// --- CREAR EMPLEADO ---
export const crearEmpleado = async (req, res) => {
    try {
        const { nombreEmpleado, cargo, telefono, correo } = req.body;

        if (!nombreEmpleado || !cargo) {
            return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
        }

        await db.query(
            "INSERT INTO empleado (nombreEmpleado, cargo, telefono, correo) VALUES (?, ?, ?, ?)",
            [nombreEmpleado, cargo, telefono || null, correo || null]
        );

        res.status(201).json({ mensaje: "✅ Empleado registrado correctamente" });
    } catch (error) {
        console.error("❌ Error al registrar empleado:", error);
        res.status(500).json({ mensaje: "Error interno" });
    }
};
// --- ACTUALIZAR EMPLEADO ---
export const actualizarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreEmpleado, cargo, telefono, correo } = req.body;

        if (!nombreEmpleado || !cargo) {
            return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
        }

        const [result] = await db.query(
            "UPDATE empleado SET nombreEmpleado = ?, cargo = ?, telefono = ?, correo = ? WHERE idEmpleado = ?",
            [nombreEmpleado, cargo, telefono || null, correo || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Empleado no encontrado" });
        }

        res.json({ mensaje: "✅ Empleado actualizado correctamente" });
    } catch (error) {
        console.error("❌ Error al actualizar empleado:", error);
        res.status(500).json({ mensaje: "Error interno", error: error.message });
    }
};


// --- ELIMINAR EMPLEADO ---
export const eliminarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM empleado WHERE idEmpleado = ?", [id]);
        res.json({ mensaje: "🗑️ Empleado eliminado correctamente" });
    } catch (error) {
        console.error("❌ Error al eliminar empleado:", error);
        res.status(500).json({ mensaje: "Error interno" });
    }
}