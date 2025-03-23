import React from 'react';
import { useNavigate } from 'react-router-dom';

function PreviewPage2({ onNext }) {
  const navigate = useNavigate();

  const handleFinish = () => {
    onNext();  // Mark the preview as complete
    navigate('/auth/Signup'); // Redirect to the signup page
  };

  return (
    <div>
      <h1>Get Started!</h1>
      <p>This is the second part of the preview.</p>
      <button onClick={handleFinish}>Finish Preview</button>
    </div>
  );
}

export default PreviewPage2;
