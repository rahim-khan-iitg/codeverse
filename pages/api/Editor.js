import axios from "axios";
export default async function handler(req,res){
    if(req.method==="POST")
    {
        let submission_url="https://leetcode.com/playground/api/runcode";
        let n=0;
        let response = await axios.post(submission_url,req.body);
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
        // console.log(result);
        return res.status(200).json(result.data);
    }
    return res.status(400).json({message:"bad request"})
}