import React, { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [enteredTexts, setEnteredTexts] = useState([]);
  const [showAdditionalHeaders, setShowAdditionalHeaders] = useState(true);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    if (inputText.trim() !== '') {
      const newEntry = {
        text: inputText,
        prediction: "This is a sample prediction.", // Replace with your actual prediction logic
      };
      setEnteredTexts([...enteredTexts, newEntry]);
      setInputText('');
      setShowAdditionalHeaders(false); // Hide additional headers after the first text is entered
    }
  };

  return (
    <div className='h-screen flex flex-col justify-center'>
      {/* Remove the scrollbar using ::-webkit-scrollbar */}
      <style>
        {`
          /* Hide the scrollbar completely */
          ::-webkit-scrollbar {
            width: 0;
            height: 0;
          }
        `}
      </style>

      <div className='text-white text-center'>
        <div className='max-w-[800px] mx-auto'>
          <p className='text-[#00df9a] font-bold p-2'>
            Avg ASAPP Hackathon
          </p>
          <h1 className='text-6xl font-bold py-2'>
            Sentence Saliency System
          </h1>
          {showAdditionalHeaders && (
            <>
              <div className='flex justify-center items-center'>
                <p className='text-4xl font-bold py-2'>
                  Kudi panlam BRO
                </p>
              </div>
              <p className='text-2xl font-bold text-gray-500 pt-4'>
                An intelligent system capable of identifying salient sentences within a given conversation
              </p>
            </>
          )}
        </div>
      </div>

      <div className='text-gray-200 mt-4 mx-auto'>
        <div className='w-[1100px] mx-auto max-h-[500px] overflow-scroll overflow-x-hidden'>
          <div className='rounded-md p-4'>
            {enteredTexts.map((entry, index) => (
              <div key={index} className={`mb-4 ${index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'} rounded-md flex flex-col`}>
                <span className='text-lg p-2 flex-grow' style={{ overflowWrap: 'break-word' }}>
                  {entry.text}
                </span>
                <span className='text-lg p-2'>
                  Prediction: {entry.prediction}
                </span>
                <div className='flex justify-end p-2'>
                  <button className=' text-white rounded-full w-8 h-8 mr-2'>
                    <span role='img' aria-label='thumbs-up'>👍</span>
                  </button>
                  <button className=' text-white rounded-full w-8 h-8'>
                    <span role='img' aria-label='thumbs-down'>👎</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='text-center mt-4 mx-auto'>
        <div className='max-w-[800px] mx-auto'>
          <div className='flex flex-col items-center'>
            <textarea
              className='border border-gray-300 rounded-md p-2 w-[700px] min-h-[70px] text-lg'
              placeholder='Enter your text'
              value={inputText}
              onChange={handleInputChange}
              style={{ color: 'black' }}
            />
            <button
              className='bg-[#00df9a] rounded-md font-medium mt-4 py-3 px-6 text-black'
              onClick={handleSubmit}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
