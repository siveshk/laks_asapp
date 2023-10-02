import React, { useState } from 'react';
import axios from 'axios'; // Import axios

function App() {
  const [inputText, setInputText] = useState('');
  const [enteredTexts, setEnteredTexts] = useState([]);
  const [showAdditionalHeaders, setShowAdditionalHeaders] = useState(true);
  const [censoredText, setCensoredText] = useState();
  const [pflag, setPflag] = useState();
  const [predictedClass, setPredictedClass] = useState();
  const [probability, setProbability] = useState();
  const [outputData, setOutputData] = useState([]);

  // Create a custom Axios instance with CORS options
  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleThumbsUpClick = (index) => {
    const updatedEnteredTexts = [...enteredTexts];
    if (!updatedEnteredTexts[index].isThumbsUpClicked) {
      updatedEnteredTexts[index].isThumbsUpClicked = true;
      updatedEnteredTexts[index].isThumbsDownClicked = false;
      setEnteredTexts(updatedEnteredTexts);

      const feedbackData = {
        sentence: inputText,
        predicted: predictedClass,
        probability: probability,
        user_feedback: 1,
      };

      axiosInstance
        .post("/feedback", feedbackData)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  };

  const handleThumbsDownClick = (index) => {
    const updatedEnteredTexts = [...enteredTexts];
    if (!updatedEnteredTexts[index].isThumbsDownClicked) {
      updatedEnteredTexts[index].isThumbsDownClicked = true;
      updatedEnteredTexts[index].isThumbsUpClicked = false;
      setEnteredTexts(updatedEnteredTexts);
      const feedbackData = {
        sentence: inputText,
        predicted: predictedClass,
        probability: probability,
        user_feedback: 0,
      };

      axiosInstance
        .post("/feedback", feedbackData)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  };

  const handleSubmit = () => {
    console.log("Submit button clicked.");
    if (inputText.trim() !== '') {
      const newEntry = {
        text: inputText,
        prediction: "This is a sample prediction.",
        isThumbsUpClicked: false,
        isThumbsDownClicked: false,
      };
      setEnteredTexts([...enteredTexts, newEntry]);
      setInputText('');
      setShowAdditionalHeaders(false);

      axiosInstance
        .post("/salient", { sentence: inputText })
        .then((response) => {
          const responseData = response.data;
          console.log("Response Data:", responseData);
          setPredictedClass(responseData.predicted_class);
          setProbability(responseData.probabilities);
          setPflag(responseData.pflag);
          setCensoredText(responseData.censored_text);
          setOutputData(responseData);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className='h-screen flex flex-col justify-center'>
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
              <p className='text-2xl font-bold text-gray-500 pt-4'>
                An intelligent system capable of identifying salient sentences within a given conversation
              </p>
              <div className='flex justify-center items-center'>
                <p className='text-4xl font-bold py-2'>
                  Let's Get Started!
                </p>
              </div>
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
                  <button
                    className={`text-white rounded-full w-8 h-8 mr-2 ${entry.isThumbsUpClicked ? 'bg-green-500' : ''}`}
                    onClick={() => handleThumbsUpClick(index)}
                    disabled={entry.isThumbsUpClicked || entry.isThumbsDownClicked}
                  >
                    {entry.isThumbsDownClicked ? null : <span role='img' aria-label='thumbs-up'>{entry.isThumbsUpClicked ? '✅' : '👍'}</span>}
                  </button>
                  <button
                    className={`text-white rounded-full w-8 h-8 ${entry.isThumbsDownClicked ? 'bg-red-500' : ''}`}
                    onClick={() => handleThumbsDownClick(index)}
                    disabled={entry.isThumbsUpClicked || entry.isThumbsDownClicked}
                  >
                    {entry.isThumbsUpClicked ? null : <span role='img' aria-label='thumbs-down'>{entry.isThumbsDownClicked ? '❌' : '👎'}</span>}
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

      <div className='text-center mt-4 mx-auto'>
        <div className='max-w-[800px] mx-auto'>
          <div className='rounded-md p-4'>
            {outputData.map((output, index) => (
              <div key={index} className={`mb-4 ${index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'} rounded-md flex flex-col`}>
                <span className='text-lg p-2 flex-grow' style={{ overflowWrap: 'break-word' }}>
                  Censored Text: {output.censored_text}
                </span>
                <span className='text-lg p-2'>
                  Pflag: {output.pflag}
                </span>
                <span className='text-lg p-2'>
                  Predicted Class: {output.predicted_class}
                </span>
                <span className='text-lg p-2'>
                  Probabilities: {output.probabilities}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
