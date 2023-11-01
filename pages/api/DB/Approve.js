import { getSession } from "next-auth/react";
import mysql from "mysql2/promise"
export default async function handler(req, res) {
    const session=await getSession({req});
    if(!session){
        return res.status(400).json({"result":"unauthorised access"})
    }
    try {
        
        if (req.method === "POST") {
            // const conn = await connection();
            const conn =await mysql.createConnection(process.env.DATABASE_URL);
            await conn.execute("INSERT INTO problems (title,description,related_topics,question,difficulty,submitted_by,testcases,test_answers,preprocessing_code,preprocessing_function)SELECT title,description,related_topics,question,difficulty,submitted_by,testcases,test_answers,preprocessing_code,preprocessing_function FROM submittedQuestions where id=?", [req.body.id]);
            await conn.execute("delete from submittedQuestions where id=?",[req.body.id])
            conn.end();
            return res.status(200).json({ "message": "Approved" });
        }
        else{
            return res.status(200).json({"message":"Error"})
        }
    }
    catch (err) {
        return res.status(400).json({ "message": " not working" });
    }
};