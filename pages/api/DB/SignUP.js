
import { genSalt,hash } from "bcryptjs";
import connection from "@/database/conn";
export default async function handler(req, res) {
    if (req.method === "POST") {
        const conn=await connection();
        const salt=await genSalt(10);
        const hash_pass= await hash(req.body.password,salt);
        try
        {
            const q=await conn.execute("INSERT INTO user(email,password) VALUES(?,?)",[req.body.email,hash_pass]);
            conn.end();
        }
        catch(err)
        {
            return res.status(200).json({"message":"user already exist"});
        }
        return res.status(200).json({"message":"sign up successfully"});
    }
    return res.status(200).json({ "message": " not working" });
}