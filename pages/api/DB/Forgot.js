import { genSalt, hash } from "bcryptjs";
import connection from "@/database/conn";
export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const conn = await connection();

            const salt = await genSalt(10);
            const hash_pass = await hash(req.body.password, salt);
            const result = await conn.execute("UPDATE `user` SET `password`=? WHERE `email`=? ", [hash_pass, req.body.email]);
            conn.end();
        }
        catch (err) {
            return res.status(200).json({ "message": "user does not exist please signup" });
        }
        return res.status(200).json({ "message": "password updated successfully" });
    }
    return res.status(200).json({ "message": " not working" });
}