import { useEffect, useState } from 'react';
import Editor from '../Editor/Codeeditor';
import { useRouter } from 'next/router';
import axios from 'axios';

const ProblemPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [question, setQuestion] = useState('');
  const [title, setTitle] = useState('');
  const [test_case,setTestCase]=useState('');
  const [test_answers,setTestAnswer]=useState('');
  const [preprocessing_code,setPreprocessingCode]=useState('');
  const [preprocessing_function,setPreprocessingFunction]=useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/DB/FetchSingleProblem', { id });
        setQuestion(response.data[0].question);
        setTitle(response.data[0].title);
        if(response.data[0].testcases!=null){setTestCase(response.data[0].testcases);}
        if(response.data[0].test_answers!=null){setTestAnswer(response.data[0].test_answers);}
        if(response.data[0].preprocessing_code!=null){setPreprocessingCode(response.data[0].preprocessing_code);}
        if(response.data[0].preprocessing_function!=null){setPreprocessingFunction(response.data[0].preprocessing_function);}
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
        <Editor preprocessing_code={preprocessing_code} test_cases={test_case} submit={1} test_answers={test_answers} pre_function={preprocessing_function}/>
      </div>

      <style jsx>{`
        .question-content {
          max-width: 100%; /* Set maximum width */
          word-wrap: break-word; /* Wrap long words and prevent overflow */
          overflow-x: auto; /* Enable horizontal scrollbar when content overflows horizontally */
          overflow-y:auto;
          max-height:105vh;
        }
      `}</style>
    </div>
  );
};
export default ProblemPage;
