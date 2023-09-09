// components/SignIn.js
import React, { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
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
      redirect:true
    })
    console.log(res)
    setEmail("")
    setPassword("")
    setLoading(false)
  }
  if (session) {
    return (
      <div className="h-[calc(100vh-3rem)] flex items-center justify-center">
        <div className="w-96 p-6 space-y-6 bg-white rounded-lg shadow-lg">
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
      <div className="h-[calc(100vh-3rem)] flex items-center justify-center">
        <div className="w-96 p-6 space-y-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center flex "><Image src='/logo.jpg' width={30} height={30} alt='codeverse'></Image>Codeverse</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block font-medium text-gray-700">
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
              <label htmlFor="password" className="block font-medium text-gray-700">
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
              {/* <Component/> */}
            </div>
            <div>
              Don&apos;t have an account? <Link href="/auth/signup" className='text-blue-800 font-bold'> sign up</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SignIn;
