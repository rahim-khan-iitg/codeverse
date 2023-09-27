import React from 'react'
import Editor from '../Editor/Codeeditor'
// pages/problems/[id].js
import { useRouter } from 'next/router';

// const ProblemPage = () => {

//   return (
    
//   );
// };

// export default ProblemPage;
import { useState } from 'react';

const ProblemPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  return (
    <div className='grid grid-cols-3'>
      <div className='p-3'>
        problem goes here
      </div>
      <div className='col-span-2'>
        <Editor/>
      </div>
    </div>
    
  );
};

export default ProblemPage;
