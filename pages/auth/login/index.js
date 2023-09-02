import SignIn from "@/pages/components/Authorization/SignIn";
import Navbar from "@/pages/components/NavBar/navbar";

export default function Login() {
    return (
        <div>
            <Navbar></Navbar>
            <div>
                <SignIn></SignIn>
            </div>
        </div>
    )
};