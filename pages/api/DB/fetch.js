import mysql from "mysql2/promise"
// import { connection } from "@/database/conn";
export default async function handler(req,res){
    if(req.method==="POST"){
    const conn =  await mysql.createConnection({
        host:'localhost',
        user: 'rahim',
        password: 'rahim123',
        database: 'codeverse',
    });
    console.log(req.body.email)
    const [row,field]=await conn.execute("SELECT * FROM user WHERE email=?",[req.body.email]);
    console.log(row)
    return res.status(200).json({"email":"rahim@gmail.com","name":"rahim"})
}
    // console.log(conn)
    return res.status(200).json({"message":" not working"});
}