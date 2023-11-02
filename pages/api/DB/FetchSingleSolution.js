import connection from "@/database/conn";
export default async function handler(req, res) {
    try {
        
        const conn =await connection();
        if(req.method==="POST")
        {
            const [rows, fields] = await conn.execute("(SELECT p.question as question, s.test_cases as testcases, s.submitted_code as preprocessing_function FROM solutions s,problems p where s.problem_id=? and p.id=?);", [req.body.id,req.body.id]);
            conn.end();
            return res.status(200).json(rows);
        }
    }
    catch (err) {
        return res.status(200).json({ "message": " not working" });
    }
};