import mysql from 'mysql2/promise'
export default async function handler(req, res) {
    try
    {
        const conn =await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASS,
            database: process.env.DATABASE_NAME,
        })
        const [rows, fields] = await conn.execute("SELECT * FROM user WHERE email=?", [req.body.email]);
        return res.status(200).json(rows);
    }
    catch(err)
    {
        return res.status(200).json({ "message": " not working" });
    }
};