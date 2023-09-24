import mysql from "mysql2/promise"
import { genSalt,hash } from "bcryptjs";
export default async function handler(req, res) {
    if (req.method === "POST") {
        const conn =await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASS,
            database: process.env.DATABASE_NAME,
        })
        const salt=await genSalt(10);
        const hash_pass= await hash(req.body.password,salt);
        const [rows,fields] = await conn.execute("UPDATE `user` SET `password`=? WHERE `email`=? ",[hash_pass,req.body.email]);
        return res.status(200).json({"message":"password updated successfully"});
    }
    return res.status(200).json({ "message": " not working" });
}