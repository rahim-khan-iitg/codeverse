import axios from "axios";
import connection from "@/database/conn";
export default async function handler(req, res) {
    try
    {
        // const problems=await axios.get("https://64fc6e0b605a026163ae7bdc.mockapi.io/problems");
        const conn = await connection();
        const [rows, fields] = await conn.execute("SELECT * FROM problems");
        // console.log(rows);
        return res.status(200).json(rows);
    }
    catch(err)
    {
        return res.status(200).json({ "message": " not working" });
    }
};