import SignIn from "@/pages/components/Authorization/ModeratorLogin";
import ModeratorProfileComponent from "@/pages/components/Profile/moderatorProfile";
import { useSession } from "next-auth/react";
export default function ModeratorProfile(){
    const {data:session}=useSession();
    if(session)
    {
        return(
            <ModeratorProfileComponent/>
        )
    }
    else{
        return(
            <SignIn/>
        )
    }
}