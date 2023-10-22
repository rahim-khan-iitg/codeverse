import axios from "axios";
import { getSession } from "next-auth/react";
export default async function handler(req,res){
    if(req.method==="POST")
    {
        let submission_url="https://leetcode.com/playground/api/runcode";
        let n=0;
        let response = await axios.post(submission_url,req.body.post);
        let interpret_id= await response.data.interpret_id;
        let result_url="https://www.leetcode.com/submissions/detail/"+interpret_id+"/check/"
        let result=await axios.get(result_url);
        while(result.data.state!="SUCCESS")
        {
            result=await axios.get(result_url);
            if(n==4)
            {
                break;
            }
            n=n+1;
        }
        let ans1=req.body.test.split("\n");
        let ans2=result.data.code_output;
        let compare=JSON.stringify({"a":ans1})==JSON.stringify({"a":ans2})
        if(compare)
        {
            return res.status(200).json({"message":"success"});
        }
        return res.status(200).json({"message":"some of the testcases are failing"});
    }
    return res.status(400).json({message:"bad request"})
}