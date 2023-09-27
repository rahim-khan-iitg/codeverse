import axios from "axios";

export default async function handler(req, res) {
    try
    {
        const problems=await axios.get("https://64fc6e0b605a026163ae7bdc.mockapi.io/problems");
        return res.status(200).json(problems.data);
    }
    catch(err)
    {
        return res.status(200).json({ "message": " not working" });
    }
};