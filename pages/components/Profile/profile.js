import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import SignUp from "@/pages/components/Authorization/SignUp";

const profile = () => {

  const { data: session } = useSession();

  let image = session.user.image;
  if (image == undefined) {
    image = "https://th.bing.com/th/id/OIP.R87PbOkdc695AAZ-_qrLYwHaHk?pid=ImgDet&rs=1";
  }
  if (!session) {
    return (
      <div>
        <SignUp></SignUp>
      </div>
    )
  }
  else {
    const [email, setEmail] = useState('');
    const [firstname, setName] = useState('');
    const [lastname, setName2] = useState('');
    const [imagelink, setProfile] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post('/api/DB/fatchprofile', { email: session.user.email });
          setEmail(response.data[0].email);
          setName(response.data[0].firts_name);
          setName2(response.data[0].last_name);
          setProfile(response.data[0].profile_image_link);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      if (session.user.email) {
        fetchData();
      }
    }, [session.user.email]);
    return (
      <div class="p-16">
        <div class="p-8 bg-white shadow-lg mt-24 rounded-lg">
          <div class="grid grid-cols-1 md:grid-cols-3">
            <div class="text-center mt-20 md:mt-0">
              <p class="font-bold text-gray-700 text-2xl">0</p>
              <p class="text-gray-400">Problems Solved</p>
            </div>
            <div class="relative">
              <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img src={image} alt="image" className="w-48 h-48 rounded-full" />
              </div>
            </div>
            <div class="text-center md:mt-20">
              <button class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Edit Avatar
              </button>
            </div>
          </div>
          <div class="mt-10 text-center pb-8 border-b border-gray-300">
            <h1 class="text-4xl font-semibold text-gray-700">{firstname} {lastname}</h1>
            <p class="font-light text-gray-600 mt-3">{email}</p>
          </div>
          <div class="mt-6 text-center">
            <p class="text-gray-600 font-light lg:px-16">"You don't have to be the smartest coder; you just need to be the most persistent one."</p>
          </div>
        </div>
      </div>
      


      
    );
  }
};
export default profile;
