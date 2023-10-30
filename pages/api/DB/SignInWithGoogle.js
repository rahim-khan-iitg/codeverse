
import connection from "@/database/conn";
export default async function handler(req, res) {
    if (req.method === "POST") {
        const conn=await connection();
        try
        {
            const q=await conn.execute("INSERT INTO user(email) VALUES(?)",[req.body.email]);
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