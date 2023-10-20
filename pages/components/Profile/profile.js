import { useSession } from 'next-auth/react';
import SignIn from '../Authorization/SignIn';
import ProfileComponent from './ProfileComponent';
const Profile =  () => {
  const { data: session } = useSession();
  
  if (session) {
    return(
      <ProfileComponent/>
    )
  }
  else
  {
    return(
      <SignIn/>
    )
  }
}
export default Profile;
