import connection from '@/database/conn';
export default async function handler(req, res) {
    try {
        const conn = await connection();
        const [rows, fields] = await conn.execute("SELECT id,title,difficulty FROM problems");
        conn.end();
        return res.status(200).json(rows);

    }
    catch (err) {
        return res.status(200).json({ "message": " not working" });
    }
};