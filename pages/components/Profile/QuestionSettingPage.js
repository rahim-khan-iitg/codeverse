import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const QuestionSettingPage = () => {
  const [title, setTitle] = useState(" ");
  const [category, setCategory] = useState("Array");
  const [difficulty, setDifficulty] = useState("Easy");
  const [description, setDescription] = useState();
  const [testcases, setTestcases] = useState();
  const [test_answers, setTestAnswers] = useState();
  const [preprocessing_code, setPreprocessingCode] = useState();
  const [preprocessing_function, setPreprocessingFunction] = useState();
  const {data:session}=useSession();
  const categories = [
    'Array',
    'String',
    'Linked List',
    'Tree',
    'Graph',
    'Stack',
    'Queue',
    'Hashmap',
    'Sorting',
    'Sliding window',
    'Trie'
  ];
  async function handleOnSubmit() {
    if (description != null && testcases != null && test_answers != null && title != null && preprocessing_code != null && preprocessing_function != null) {
      const res = await fetch("/api/DB/submitQuestion", {
        method: "POST", body: JSON.stringify({
          title: title, category: category,
          difficulty: difficulty, description: description, testcases: testcases, test_answers: test_answers, preprocessing_code: preprocessing_code, preprocessing_function: preprocessing_function,email:session.user.email
        }), headers: { "Content-Type": "application/json" }
      });
      const data=await res.json();
      toast(data.message);
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center mt-2 dark:text-white dark:bg-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-full lg:w-full dark:bg-black">
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
        <h1 className="text-2xl font-semibold mb-4">Set New Question</h1>

        {/* Question Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600 dark:text-white">Question Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Enter the question title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-600 dark:text-white">Category</label>
          <select
            id="category"
            name="category"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {/* Map through your category options */}
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Level */}
        <div className="mb-4">
          <label htmlFor="difficulty" className="block text-gray-600 dark:text-white">Difficulty Level</label>
          <select
            id="difficulty"
            name="difficulty"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option key="Easy" value="Easy">Easy</option>
            <option key="Medium" value="Medium">Medium</option>
            <option key="Hard" value="Hard">Hard</option>
          </select>
        </div>
        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-600 dark:text-white">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="border border-gray-300 rounded-md p-2 w-full h-96"
            placeholder="Enter the question description in formatted html format"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        {/* Constraints */}
        <div className="mb-4">
          <label htmlFor="constraints" className="block text-gray-600 dark:text-white">Constraints</label>
          <textarea
            id="constraints"
            name="constraints"
            rows="2"
            disabled
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="write constraints in description only"
          ></textarea>
        </div>

        {/* Test Cases */}
        <div className="mb-4">
          <label htmlFor="testCases" className="block text-gray-600 dark:text-white">Test Cases (String Format)</label>
          <textarea
            id="testCases"
            name="testCases"
            rows="4"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Enter test cases (one per line)"
            required
            value={testcases}
            onChange={(e) => setTestcases(e.target.value)}
          ></textarea>
        </div>
        {/* Test Cases */}
        <div className="mb-4">
          <label htmlFor="testCases" className="block text-gray-600 dark:text-white">Answers of the Test Cases (String Format)</label>
          <textarea
            id="testCases"
            name="testCases"
            rows="4"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Enter test case Answers (one per line)"
            required
            value={test_answers}
            onChange={(e) => setTestAnswers(e.target.value)}
          ></textarea>
        </div>

        {/* Initial Code */}
        <div className="mb-4">
          <label htmlFor="initialCode" className="block text-gray-600 dark:text-white">Preprocessing Code</label>
          <textarea
            id="initialCode"
            name="initialCode"
            rows="6"
            className="border border-gray-300 rounded-md p-2 w-full h-96"
            placeholder="Enter code (if applicable)"
            value={preprocessing_code}
            onChange={(e) => setPreprocessingCode(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="initialCode" className="block text-gray-600 dark:text-white">Preprocessing Function</label>
          <textarea
            rows="6"
            className="border border-gray-300 rounded-md p-2 w-full h-96"
            placeholder="Enter code (if applicable)"
            required
            value={preprocessing_function}
            onChange={(e) => setPreprocessingFunction(e.target.value)}
          ></textarea>
        </div>
        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="button"
            className="bg-indigo-600 text-white font-semibold p-2 rounded-md hover:bg-indigo-700"
            onClick={handleOnSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionSettingPage;
