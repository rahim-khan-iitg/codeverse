import connection from '@/database/conn';
export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            const conn = await connection();
            const [rows, fields] = await conn.execute("delete from submittedQuestions where id=?;", [req.body.id]);
            conn.end();
            return res.status(200).json({ "message": "Deleted" });
        }
        else{
            return res.status(200).json({"message":"Error"})
        }
    }
    catch (err) {
        return res.status(400).json({ "message": " not working" });
    }
};