// components/SignIn.js
import React, { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from '@emotion/react'
import { MoonLoader } from 'react-spinners';
const spinnerStyles = css`
  display: block;
  margin: 0 auto;
`;
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  async function handleOnSubmit() {
    setLoading(true)
    const res=await signIn('credentials',{
      email:email,password:password,
      redirect:false
    })
    // console.log(res)
    toast("signed in successfully");
    setEmail("")
    setPassword("")
    setLoading(false)
  }
  if (session) {
    return (
      <div className="h-[calc(100vh-3rem)] flex items-center justify-center dark:text-white">
        <div className="w-96 p-6 space-y-6 bg-white rounded-lg shadow-lg dark:bg-black dark:shadow-gray-700">
          <h2 className="text-2xl font-semibold text-center flex "><Image src='/logo.jpg' width={30} height={30} alt='codeverse'></Image>Codeverse</h2>
          <div className="space-y-4">
          <div>
            signed In as {session.user.email}<br/>
            <button className="w-full bg-indigo-600 text-white font-semibold p-2 mt-2 rounded-md hover:bg-indigo-700" onClick={()=>signOut()}>Sign Out</button>
          </div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="h-[calc(100vh-3rem)] flex items-center justify-center dark:text-white">
        <div className="w-96 p-6 space-y-6 bg-white rounded-lg shadow-lg dark:bg-black dark:text-white dark:shadow-gray-700">
          <h2 className="text-2xl font-semibold text-center flex "><Image src='/logo.jpg' width={30} height={30} alt='codeverse'></Image>Codeverse</h2>
          <div className="space-y-4">
            <div>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
              <label htmlFor="email" className="block font-medium text-gray-700 dark:text-white">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block font-medium text-gray-700 dark:text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="********"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              {loading ? (<div className='grid place-items-center'>
                <MoonLoader color='#6893F6' loading={loading} css={spinnerStyles} size={22}></MoonLoader>
              </div>) :
                (<button
                  type="button"
                  className="w-full bg-indigo-600 text-white font-semibold p-2 rounded-md hover:bg-indigo-700"
                  onClick={handleOnSubmit}
                >
                  Log In
                </button>)}
            </div>
            <div className='space-x-2'><button onClick={()=>{signIn('github'); toast("signed in successfully")}}><img src='https://logos-download.com/wp-content/uploads/2016/09/GitHub_logo.png' alt='github' height={30} width={30}/></button><button onClick={()=>{signIn('google');toast("signed in successfully")}}> <img src="https://th.bing.com/th/id/OIP.jzpEpg2QzzXWjH4-4CPg2QHaHa?pid=ImgDet&rs=1" alt="google" width={30} height={30} className='rounded-xl' /></button></div>
            <div>
              Don&apos;t have an account? <Link href="/auth/signup" className='text-blue-800 font-bold'> sign up</Link>
            </div>
            <div>
              <Link href="/auth/forgot" className='text-red-600 font-bold'>Forgot Password</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SignIn;
