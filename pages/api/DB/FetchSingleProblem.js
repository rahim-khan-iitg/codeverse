import mysql from "mysql2/promise"
export default async function handler(req, res) {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASS,
            database: process.env.DATABASE_NAME,
        })
        if(req.method==="POST")
        {
            const [rows, fields] = await conn.execute("SELECT * FROM problems where id=?", [req.body.id]);
            console.log(req.body.id)
            return res.status(200).json(rows);
        }
        
        // const problems=await axios.get("https://64fc6e0b605a026163ae7bdc.mockapi.io/problems");

    }
    catch (err) {
        return res.status(200).json({ "message": " not working" });
    }
};