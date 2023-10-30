import connection from "@/database/conn";

export default async function handler(req, res) {
    if (req.method === "POST") {
        let conn; // Define the connection variable outside of the try-catch block.

        try {
            conn = await connection();
        } catch (err) {
            return res.status(500).json({ message: "Database not accessible" });
        }

        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email; // Make sure to get the email from the request body.

        try {
            // Execute the UPDATE query without attempting to retrieve rows.
            await conn.execute("UPDATE `user` SET `first_name`=?, `last_name`=? WHERE `email`=?", [firstname, lastname, email]);
            conn.end();
            // console.log(firstname,lastname,email);
            return res.status(200).json({ message: "Name updated successfully" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "An error occurred while processing the request." });
        }
    }  
    return res.status(200).json({ message: "Not a POST request" });
}
