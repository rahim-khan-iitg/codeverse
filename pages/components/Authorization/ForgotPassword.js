// components/SignIn.js
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';

const Forgotpassword = () => {
    const handleClick=()=>{
        setShowOTPSection(true);
    }
    const [show_otp_section,setShowOTPSection]=useState(false);
  return (
    <div className="h-[calc(100vh-3rem)] flex items-center justify-center">
      <div className="w-80 p-6 space-y-6 bg-white rounded-lg shadow-lg">
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
            />
          </div>
          <div>
            <button
              className="w-full bg-indigo-600 text-white font-semibold p-2 rounded-md hover:bg-indigo-700"
              onClick={handleClick}
            >
              Send OTP
            </button>
          </div>
          <div>
            {show_otp_section?(<div><div>
            <label htmlFor="otp" className="block font-medium text-gray-700">
              OTP
            </label>
            <input
              type='text'
              id="otp"
              name="otp"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="123abc"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="********"
            />
          </div></div>):(<div></div>)}
          </div>
          <div>
            {show_otp_section?(<button
              className="w-full bg-indigo-600 text-white font-semibold p-2 rounded-md hover:bg-indigo-700"
              type='submit'
            >
              Sign Up
            </button>):(<div></div>)}
          </div>
          <div>
            Don&apos;t have an account?
            <Link href="/auth/signup" className='text-blue-800 font-bold'> sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
