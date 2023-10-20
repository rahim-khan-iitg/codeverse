import mysql from "mysql2/promise"
import { connection } from "@/database/conn";
export default async function handler(req, res) {
    if (req.method === "POST") {
        const conn = await connection();
        const [rows, fields] = await conn.execute("SELECT password FROM user WHERE email=?",[email]);
        conn.end();
        return res.status(200).json({ "email": "rahim@gmail.com", "name": "rahim" });
    }
    return res.status(200).json({ "message": " not working" });
}