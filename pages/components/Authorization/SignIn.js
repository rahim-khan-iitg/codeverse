// components/SignIn.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SignIn = () => {
  return (
    <div className="h-[calc(100vh-3rem)] flex items-center justify-center">
      <div className="w-80 p-6 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center flex "><Image src='/logo.jpg' width={30} height={30} alt='codeverse'></Image>Codeverse</h2>
        <form className="space-y-4">
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
            <label htmlFor="password" className="block font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="********"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold p-2 rounded-md hover:bg-indigo-700"
            >
              Log In
            </button>
          </div>
          <div>
            not a member? <Link href="/auth/signup" className='text-blue-800 font-bold'> sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
