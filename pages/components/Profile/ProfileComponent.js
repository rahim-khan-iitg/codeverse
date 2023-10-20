import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
export default function ProfileComponent(){
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [firstname, setName] = useState('');
  const [lastname, setName2] = useState('');
  const [imagelink, setProfile] = useState('');
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post('/api/DB/fatchprofile', { email: session.user.email });
          setEmail(response.data[0].email);
          setName(response.data[0].first_name);
          setName2(response.data[0].last_name);
          setProfile(response.data[0].profile_image_link);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      if (session.user.email) {
        fetchData();
      }
    }, [session]);
  return (
    <div className="p-16">
      <div className="p-8 bg-white shadow-lg mt-24 rounded-lg dark:bg-black dark:text-white dark:shadow-gray-600 dark:shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="text-center mt-20 md:mt-0">
            <p className="font-bold text-gray-700 text-2xl dark:text-white">0</p>
            <p className="text-gray-400 dark:text-white">Problems Solved</p>
          </div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <img src={imagelink} alt="image" className="w-48 h-48 rounded-full" />
            </div>
          </div>
          <div className="text-center md:mt-20">
          <input type="file" name="" id=""/>
            <button className="text-white py-2 px-4 uppercase rounded bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Update Photo
            </button>
          </div>
        </div>
        <div className="mt-10 text-center pb-8 border-b border-gray-300">
          <h1 className="text-4xl font-semibold text-gray-700 dark:text-white">{firstname} {lastname}</h1>
          <p className="font-light text-gray-600 mt-3 dark:text-white">{email}</p>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600 font-light lg:px-16 dark:text-white">&quot;You don&apos;t have to be the smartest coder; you just need to be the most persistent one.&quot;</p>
        </div>
      </div>
      <div className="max-w-sm mt-7">
      <div  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-black">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="firstName">
            First Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e)=>setName2(e.target.value)}
          />
        </div>  
        <div className="flex items-center justify-between">
          <button
            className="bg-indigo-600  hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};