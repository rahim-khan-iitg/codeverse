import React, { useState, useEffect } from 'react';
import Link from 'next/link';
const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [problems, setProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [checked,setChecked]=useState(false);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          '/api/DB/FetchProblems'
        );
        const data = await response.json();
        setProblems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

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

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Coding Problems</h1>
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
            <th className='py-2 border'>Solved</th>
            <th className="py-2 px-4 border text-left">Title</th>
            <th className="py-2 px-4 border text-left">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {filteredProblems.map(problem => (
            <tr key={problem.id}>
              <td className="py-2 px-4 border"><Link href={`problem/${problem.id}`}>{problem.id}</Link></td>
              <td className='py-2 px-4 border text-center'><input type="checkbox"/></td>
              <td className="py-2 px-4 border"><Link href={`problem/${problem.id}`}>{problem.title}</Link></td>
              <td className="py-2 px-4 border"><Link href={`problem/${problem.id}`}>{problem.difficulty}</Link></td>
              
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
  );
};

export default HomePage;
