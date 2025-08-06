import React, { useState, useEffect } from 'react';

const VoiceInput = ({ onTranscribe }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recog = new SpeechRecognition();
    recog.continuous = false;
    recog.lang = 'ta-IN'; 
    recog.interimResults = false;

    recog.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      onTranscribe(text);
    };

    recog.onend = () => {
      setIsListening(false);
    };

    setRecognition(recog);
  }, [onTranscribe]);

  const handleStart = () => {
    if (recognition) {
      setTranscript('');
      setIsListening(true);
      recognition.start();
    }
  };

  return (
    <div className="mt-3">
      <button type="button" onClick={handleStart} className="btn btn-outline-secondary">
        🎙 Record Voice
      </button>
      {transcript && (
        <div className="mt-2 alert alert-info">
          <strong>Transcript:</strong> {transcript}
        </div>
      )}
    </div>
  );
};

export default VoiceInput;
