import connection from '@/database/conn';
import { getSession } from "next-auth/react";
export default async function handler(req, res) {
    // const session = await getSession({ req });
    // if (!session) {
    //     return res.status(400).json({ "result": "unauthorised access" })
    // }
    try {
        if (req.method === "POST") {

            const email = req.body.email;
            const conn = await connection();
            const [rows, fields] = await conn.execute("SELECT id,title,difficulty FROM problems WHERE submitted_by=?", [email]);
            conn.end();
            return res.status(200).json(rows);
        }
        else
        {
            return res.status(400).json({"message":"bad request"});
        }

    }
    catch (err) {
        return res.status(200).json({ "message": " not working" });
    }
};