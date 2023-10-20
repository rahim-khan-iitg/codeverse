import connection from "@/database/conn";
export default async function handler(req, res) {
    try {
        
        const conn =await connection();
        if(req.method==="POST")
        {
            const [rows, fields] = await conn.execute("SELECT * FROM problems where id=?", [req.body.id]);
            conn.end();
            return res.status(200).json(rows);
        }
        // const problems=await axios.get("https://64fc6e0b605a026163ae7bdc.mockapi.io/problems");

    }
    catch (err) {
        return res.status(200).json({ "message": " not working" });
    }
};