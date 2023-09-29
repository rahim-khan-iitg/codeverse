import { transporter } from "@/lib/Transporter";
export default async function handler(req,res){
    if (req.method==="POST"){
       await transporter.sendMail({
            from: process.env.EMAIL_ID,
            to: req.body.email,
            text:"OTP from codeverse",
            html:`<h1>your OTP is ${req.body.otp} </h1>`
        })
        // console.log(req.body.otp," OTP");
       return res.status(200).json({"result":"email sent"})
    }
    return res.status(400).json({"result":"bad request"})
}