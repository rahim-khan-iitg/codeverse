import mysql from 'mysql2/promise'
export default async function handler(req, res) {
    try
    {
        // const conn =await mysql.createConnection({
        //     host: process.env.DATABASE_HOST,
        //     user: process.env.DATABASE_USER,
        //     password: process.env.DATABASE_PASS,
        //     database: process.env.DATABASE_NAME,
        // })
        const conn =await mysql.createConnection(process.env.DATABASE_URL);
        // const problems=await axios.get("https://64fc6e0b605a026163ae7bdc.mockapi.io/problems");
        const [rows, fields] = await conn.execute("SELECT id,title,difficulty FROM problems");
        conn.end();
        return res.status(200).json(rows);
    }
    catch(err)
    {
        return res.status(200).json({ "message": " not working" });
    }
};