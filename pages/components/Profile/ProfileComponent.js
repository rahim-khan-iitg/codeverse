import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
export default function ProfileComponent(){
    const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [firstname, setName] = useState('');

  const [lastname, setName2] = useState('');
  const [imagelink, setProfile] = useState('');

  let image = session.user.image;
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
    <div className="p-16">
      <div className="p-8 bg-white shadow-lg mt-24 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="text-center mt-20 md:mt-0">
            <p className="font-bold text-gray-700 text-2xl">0</p>
            <p className="text-gray-400">Problems Solved</p>
          </div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <img src={image} alt="image" className="w-48 h-48 rounded-full" />
            </div>
          </div>
          <div className="text-center md:mt-20">
            <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Edit Avatar
            </button>
          </div>
        </div>
        <div className="mt-10 text-center pb-8 border-b border-gray-300">
          <h1 className="text-4xl font-semibold text-gray-700">{firstname} {lastname}</h1>
          <p className="font-light text-gray-600 mt-3">{email}</p>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600 font-light lg:px-16">&quot;You don&apos;t have to be the smartest coder; you just need to be the most persistent one.&quot;</p>
        </div>
      </div>
    </div>
  );
};