import mysql from "mysql2/promise"
// import { connection } from "@/database/conn";
export default async function handler(req, res) {
    if (req.method === "POST") {
        return res.status(200).json({ "email": "rahim@gmail.com", "name": "rahim" });
    }
    return res.status(200).json({ "message": " not working" });
}