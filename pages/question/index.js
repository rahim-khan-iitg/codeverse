import SignIn from "../components/Authorization/SignIn";
import QuestionSettingPage from "../components/Profile/QuestionSettingPage"
import { useSession } from "next-auth/react"
export default function QuestionPage() {
    const {data:session}=useSession();
    if(session){
    return (
        <div>
            <QuestionSettingPage />
        </div>
    )
    }
    else{
        return(
            <SignIn/>
        )
    }
}