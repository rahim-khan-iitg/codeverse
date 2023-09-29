import { useEffect, useState } from 'react';
import Editor from '../Editor/Codeeditor';
import { useRouter } from 'next/router';
import axios from 'axios';

const ProblemPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [question, setQuestion] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/DB/FetchSingleProblem', { id });
        setQuestion(response.data[0].question);
        setTitle(response.data[0].title);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className='grid grid-cols-3'>
      <div className='p-3'>
        <h1><b>{title}</b></h1>
        <pre className='question-content' dangerouslySetInnerHTML={{ __html: question }}></pre>
      </div>
      <div className='col-span-2'>
        <Editor />
      </div>

      <style jsx>{`
        .question-content {
          max-width: 100%; /* Set maximum width */
          word-wrap: break-word; /* Wrap long words and prevent overflow */
          overflow-x: auto; /* Enable horizontal scrollbar when content overflows horizontally */
        }
      `}</style>
    </div>
  );
};

export default ProblemPage;
