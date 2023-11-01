import connection from '@/database/conn';
import { getSession } from "next-auth/react";
export default async function handler(req, res) {
    const session=await getSession({req});
    if(!session){
        return res.status(400).json({"result":"unauthorised access"})
    }
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