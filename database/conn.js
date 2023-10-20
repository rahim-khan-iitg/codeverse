import mysql from "mysql2/promise"
export default async function connection() {
    const conn =await mysql.createConnection(process.env.DATABASE_URL);
    return conn;
};