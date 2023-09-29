import React, { useState } from 'react';

const QuestionSettingPage = () => {
  // State to hold form input values
  const [formData, setFormData] = useState({
    title: '',
    category: 'C', // Default category
    difficulty: 1, // Default difficulty level
    description: '',
    constraints: '',
    initialCode: '',
    testCases: '',
    selectedLanguages: [],
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle language options checkbox changes
  const handleLanguageCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedLanguages = [...formData.selectedLanguages];

    if (checked) {
      updatedLanguages.push(name);
    } else {
      const index = updatedLanguages.indexOf(name);
      if (index !== -1) {
        updatedLanguages.splice(index, 1);
      }
    }

    setFormData({ ...formData, selectedLanguages: updatedLanguages });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the formData to the backend for storage
    // You'll need to implement this part using an API route.
  };

  // Define your category options
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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center mt-2 dark:text-white dark:bg-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-full lg:w-full dark:bg-black">
        <h1 className="text-2xl font-semibold mb-4">Set New Question</h1>
        <form onSubmit={handleSubmit}>
          {/* Question Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-600 dark:text-white">Question Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter the question title"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-600 dark:text-white">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
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
                value={formData.difficulty}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                required
            >
                <option value="1">1 (Easy)</option>
                <option value="2">2 (Medium)</option>
                <option value="3">3 (Moderate)</option>
                <option value="4">4 (Difficult)</option>
                <option value="5">5 (Very Difficult)</option>
            </select>
            </div>


          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-600 dark:text-white">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter the question description"
              required
            ></textarea>
          </div>

          {/* Diagrams/Images Upload */}
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-white">Diagrams/Images Upload</label>
            <input type='file' className='mt-1' accept='image/*' multiple></input>
          </div>

          {/* Constraints */}
          <div className="mb-4">
            <label htmlFor="constraints" className="block text-gray-600 dark:text-white">Constraints</label>
            <textarea
              id="constraints"
              name="constraints"
              rows="2"
              value={formData.constraints}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter constraints (if any)"
            ></textarea>
          </div>

          {/* Test Cases */}
          <div className="mb-4">
            <label htmlFor="testCases" className="block text-gray-600 dark:text-white">Test Cases (String Format)</label>
            <textarea
              id="testCases"
              name="testCases"
              rows="4"
              value={formData.testCases}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter test cases (one per line)"
              required
            ></textarea>
          </div>
          {/* Test Cases */}
          <div className="mb-4">
            <label htmlFor="testCases" className="block text-gray-600 dark:text-white">Answers of the Test Cases (String Format)</label>
            <textarea
              id="testCases"
              name="testCases"
              rows="4"
              value={formData.testCases}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter test case Answers (one per line)"
              required
            ></textarea>
          </div>

          {/* Initial Code */}
          <div className="mb-4">
            <label htmlFor="initialCode" className="block text-gray-600 dark:text-white">Initial Code</label>
            <textarea
              id="initialCode"
              name="initialCode"
              rows="6"
              value={formData.initialCode}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter initial code (if applicable)"
            ></textarea>
          </div>
          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold p-2 rounded-md hover:bg-indigo-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionSettingPage;
