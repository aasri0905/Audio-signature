import React, { useState, useEffect } from "react";
import "../App.css";
import sendIcon from "../assets/icons/arrow.png";
import mute from "../assets/icons/mute.png";
import Unmute from "../assets/icons/unmute.png";
import Reset from "../assets/icons/reset.png";
import SpeechRecognition  from "react-speech-recognition";
import { useSpeechRecognition } from "react-speech-recognition";

export default function InputField() {
  const [inputValue, setInputValue] = useState(""); // State to track input value
  const { transcript,listening, resetTranscript } = useSpeechRecognition(); // Get transcript from SpeechRecognition
    useEffect(()=>{
        SpeechRecognition.startListening({ continuous: true });
    },[])
  useEffect(() => {
    // Update input value when transcript changes
    setInputValue(transcript);
  }, [transcript]);

  // Function to handle input value change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your submit action here with the inputValue
    console.log("Submitted: " + inputValue);
    resetTranscript(); // Reset transcript after submission
  };

  // Calculate the number of rows based on the number of newline characters
  const calculateRowCount = () => {
    return inputValue.split("\n").length;
  };

  return (
    <div className="prompt-form">
    <form onSubmit={handleSubmit}>
      <textarea
        className="inputfield"
        value={inputValue}
        onChange={handleInputChange}
        rows={calculateRowCount()}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.shiftKey === false) {
            e.preventDefault(); // Prevent default behavior of Enter (submitting the form)
            handleSubmit(e); // Call the submit function
          }
        }}
      />
      <button type="submit" className="submit-button">
        <img src={sendIcon} alt="Send" />
      </button>
      <div>
       
       
      </div>
    </form>
     <button
     className="submit-button"
       onClick={() => {
         if(listening){
             SpeechRecognition.stopListening();
         }
         else{
     SpeechRecognition.startListening({ continuous: true });
         }
       }}
     >
       {listening
       ?
       <img src={mute} alt="mute" />
       :
       <img src={Unmute} alt="unmute" />
       }
     </button>
     <button
     className="submit-button"
       onClick={() => {
         resetTranscript();
       }}
     >
       <img src={Reset} alt="Reset" />
     </button>
     </div>
  );
}
