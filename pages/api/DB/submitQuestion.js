import { connection } from "@/database/conn";
import mysql from "mysql2/promise"
export default async function handler(req, res) {
    if (req.method === "POST") {
        const conn =await mysql.createConnection(process.env.DATABASE_URL);
        // const conn = await connection();
        // console.log(req.body.title,req.body.category,req.body.difficulty,req.body.description,req.body.testcases,req.body.test_answers,req.body.preprocessing_code,req.body.preprocessing_function,req.body.email);
         await conn.execute("INSERT INTO submittedQuestions set title=?,related_topics=?, difficulty=?,question=?,testcases=?,test_answers=?,preprocessing_code=?,preprocessing_function=?,submitted_by=?",[req.body.title,req.body.category,req.body.difficulty,req.body.description,req.body.testcases,req.body.test_answers,req.body.preprocessing_code,req.body.preprocessing_function,req.body.email]);
        conn.end();
        return res.status(200).json({"message":"successfully Submitted"});
    }
    return res.status(200).json({ "message": " not working" });
};