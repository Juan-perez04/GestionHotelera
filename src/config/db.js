import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = await mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "HT"
});

try {
  await db.connect();
  console.log("✅ Conectado correctamente a MySQL");
} catch (error) {
  console.error("❌ Error al conectar a MySQL:", error);
}
