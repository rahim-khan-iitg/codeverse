import mysql from "mysql2/promise"
import { genSalt,hash } from "bcryptjs";
export default async function handler(req, res) {
    if (req.method === "POST") {
        try
        {
            const conn =await mysql.createConnection({
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASS,
                database: process.env.DATABASE_NAME,
            })
        }
        catch(err)
        {
            return res.status(200).json({"message":"database is not accessible"});
        }
        
        const salt=await genSalt(10);
        const hash_pass= await hash(req.body.password,salt);
        try
        {
            await conn.execute("INSERT INTO user(email,password) VALUES(?,?)",[req.body.email,hash_pass]);
        }
        catch(err)
        {
            return res.status(200).json({"message":"user already exist"});
        }
        return res.status(200).json({"message":"sign up successfull"});
    }
    return res.status(200).json({ "message": " not working" });
}