import mysql from "mysql2/promise"
export default async function connection() {
    const conn =await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME,
    })
    return conn;
}