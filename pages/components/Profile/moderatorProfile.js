import { useSession } from "next-auth/react";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ModeratorProfileComponent() {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [firstname, setName] = useState('');
  const [lastname, setName2] = useState('');
  const [imagelink, setProfile] = useState('');
  const [solved, SolvedProb] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/DB/fatchprofile', { email: session.user.email });
        setEmail(response.data[0].email);
        setName(response.data[0].first_name);
        setName2(response.data[0].last_name);
        setProfile(session.user.image);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (session.user.email) {
      fetchData();
    }
  }, [session]);

  const update_name = async () => {
    console.log("Update button clicked");
    const res = await fetch("/api/DB/updateprofile", {
      method: "POST",
      body: JSON.stringify({ email: session.user.email, firstname: firstname, lastname: lastname }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const message = await res.json();
      console.log("Update response:", message);
      toast(message["message"]);
    } else {
      console.error("Update request failed");
    }
  }
  const [searchTerm, setSearchTerm] = useState('');
  const [problems, setProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          '/api/DB/FetchModeratorTable', {
          method: "POST",
          body: JSON.stringify({ email: session.user.email, firstname: firstname, lastname: lastname }),
          headers: { "Content-Type": "application/json" },
        }
        );
        const data = await response.json();

        setProblems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (session.user.email) {
      fetchData();
    }
  }, [session, firstname, lastname]);
  const filteredProblems = problems
    .filter(problem =>
      problem.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(problems.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };
  async function Approve(id) {
    const response = await fetch('/api/DB/Approve', {method: "POST",body: JSON.stringify({id:id}),headers: { "Content-Type": "application/json" }});
    const data= await response.json();
    toast(data.message);

  }
  async function DeleteProblem(id) {
    const response = await fetch('/api/DB/DeleteProblem', {method: "POST",body: JSON.stringify({id:id}),headers: { "Content-Type": "application/json" } });
    const data= await response.json();
    toast(data.message);
  }
  return (

    <div className="p-16">
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
      <div className="p-8 bg-white shadow-lg mt-24 rounded-lg dark:bg-black dark:text-white dark:shadow-gray-600 dark:shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="text-center mt-20 md:mt-0">
            <div class="flex">
              <div class="flex-1 text-center">
                <p class="font-bold text-gray-700 text-2xl dark:text-white">{solved}</p>
                <p class="text-gray-400 dark:text-white">Problems Solved</p>
              </div>
              <div class="flex-1 text-center">
                <p class="font-bold text-gray-700 text-2xl dark:text-white">{problems.length}</p>
                <p class="text-gray-400 dark:text-white">Problems Submitted</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <img src={imagelink} alt="image" className="w-48 h-48 rounded-full" />
            </div>
          </div>
        </div>
        <div className="mt-20 text-center pb-8 border-b border-gray-300">
          <h1 className="text-4xl font-semibold text-gray-700 dark:text-white">{firstname} {lastname} (moderator)</h1>
          <p className="font-light text-gray-600 mt-3 dark:text-white">{email}</p>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600 font-light lg:px-16 dark:text-white">&quot;You don&apos;t have to be the smartest coder; you just need to be the most persistent one.&quot;</p>
        </div>
      </div>
      <div className="max-w-sm mt-7">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-black">
          Change Avatar
          <div className="text-center md:mt-20">
            <input type="file" name="" id="" />
            <button className="text-white py-2 px-4 uppercase rounded bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Update Photo
            </button>
          </div>
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
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setName2(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={update_name}>
              Update
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Problems to Review</h1>
        <input
          type="text"
          placeholder="Search problems"
          className="p-2 border mb-4 rounded-xl"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <table className="min-w-full border border-gray-300 dark:bg-black rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border text-left">ID</th>
              <th className="py-2 px-4 border text-left">Title</th>
              <th className="py-2 px-4 border text-left">Difficulty</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map(problem => (
              <tr key={problem.id}>
                <td className="py-2 px-4 border"><Link href={`problem/${problem.id}`}>{problem.id}</Link></td>
                <td className="py-2 px-4 border"><Link href={`problem/${problem.id}`}>{problem.title}</Link></td>
                <td className="py-2 px-4 border"><Link href={`problem/${problem.id}`}>{problem.difficulty}</Link></td>
                <td className="py-2 px-4 border text-center"><button className="px-4 py-2 mx-1 bg-indigo-600 rounded text-white" onClick={()=>Approve(problem.id)}>Approve</button>
                  <button className="px-4 py-2 mx-1 bg-indigo-600 rounded text-white" onClick={()=>DeleteProblem(problem.id)}>Delete</button>
                  <button className="px-4 py-2 mx-1 bg-indigo-600 rounded text-white">Revert</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between">
          <button
            className="px-4 py-2 bg-indigo-600 rounded text-white"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 rounded text-white"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};