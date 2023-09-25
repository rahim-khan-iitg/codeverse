// components/SignIn.js
import Link from 'next/link';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
const SignUp = () => {
  const generate_otp = () => {
    let x = Math.floor(Math.random() * 10000);
    return x;
  }
  const handleClick = async () => {
    if (email != "") {
      setShowOTPSection(true);
      let otp = generate_otp()
      setGeneratedOTP(otp);
      const res = await fetch("/api/Email", { method: "POST", body: JSON.stringify({ email: email, otp: otp }), headers: { "Content-Type": "application/json" } })
    }
  }
  const handleSignUp = async () => {
    if (OTP == generated_otp && password != "") {
      const res = await fetch("/api/DB/SignUP", { method: "POST", body: JSON.stringify({ email: email, password: password }), headers: { "Content-Type": "application/json" } });
      const message=await res.json();
      toast(message['message']);
      setShowOTPSection(false);
      setEmail("");
      setGeneratedOTP("");
      setPassword("");
      setOTP("");
    }
    else {
      toast("OTP is not correct");
    }
  }
  const [show_otp_section, setShowOTPSection] = useState(false);
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState();
  const [password, setPassword] = useState("");
  const [generated_otp, setGeneratedOTP] = useState();
  return (
    <div className="h-[calc(100vh-3rem)] flex items-center justify-center">
      <div className="w-96 p-6 space-y-6 bg-white rounded-lg shadow-lg">

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
              value={email} onChange={(e) => setEmail(e.target.value)}
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
            {show_otp_section ? (<div><div>
              <label htmlFor="otp" className="block font-medium text-gray-700">
                OTP
              </label>
              <input
                type='text'
                id="otp"
                name="otp"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="1234"
                required
                value={OTP} onChange={(e) => setOTP(e.target.value)}
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
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
              </div></div>) : (<div></div>)}
          </div>
          <div>
            {show_otp_section ? (<button className="w-full bg-indigo-600 text-white font-semibold p-2 rounded-md hover:bg-indigo-700" onClick={handleSignUp}>Sign Up</button>) : (<div></div>)}
          </div>
          <div>
            already have an account?
            <Link href="/auth/login" className='text-blue-800 font-bold'> sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
