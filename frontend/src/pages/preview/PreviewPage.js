import React from 'react';
import { useNavigate } from 'react-router-dom';

function PreviewPage({ onNext }) {
  const navigate = useNavigate();

  const handleNext = () => {
    onNext();  // Proceed to the next page or mark as completed
    navigate('/auth/Signup'); // Redirect to the next preview page
  };

  return (
    <div>
      <h1>Welcome to our App!</h1>
      <p>This is an introductory preview of the app.</p>
      <button onClick={handleNext}>Continue</button>
    </div>
  );
}

export default PreviewPage;
