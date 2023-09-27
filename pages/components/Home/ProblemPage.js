import { useEffect,useState } from 'react';
import Editor from '../Editor/Codeeditor';
import { useRouter } from 'next/router';
import axios from 'axios';

const ProblemPage = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/DB/FetchSingleProblem', { id });
        console.log(response.data);  // Assuming the problem data is logged
        setDescription(response.data[0].description);
        setId1(response.data[0].id);
        setTitle(response.data[0].title);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);
  const [id1,setId1] = useState();
  const [title,setTitle]=useState();
  const [description,setDescription]=useState();
  return (
    <div className='grid grid-cols-3'>
      <div className='p-3'>
      <h1 className='font-bold'>{title}</h1>
      <p>{description}</p>
      </div>
      <div className='col-span-2'>
        <Editor />
      </div>
    </div>
  );
};

export default ProblemPage;
