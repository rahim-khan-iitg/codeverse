import React, { useState, useEffect } from 'react';
import Link from 'next/link';
const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [problems, setProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [checked,setChecked]=useState(false);
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
      <table className="min-w-full border border-gray-300 dark:bg-black">
        <thead>
          <tr>
            <th className="py-2 px-4 border text-left w-2">ID</th>
            <th className='py-2 border w-4 px-2'>Solved</th>
            <th className="py-2 px-4 border text-left">Title</th>
            <th className="py-2 px-4 border text-left">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {filteredProblems.map(problem => (
            <tr key={problem.id}>
              <td className="py-2 px-4 border"><Link href={`problem/${problem.id}`}>{problem.id}</Link></td>
              <td className='py-3 px-4 border grid place-content-center'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
<path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path>
</svg></td>
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
