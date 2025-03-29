import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PreviewPage([onNext]) {
  const navigate = useNavigate();
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  console.log("Preview Page");

  useEffect( () => {
    const storedValue = localStorage.getItem('firstVisit');
    if (storedValue === 'false') {
      setIsFirstVisit(false);
      navigate('/login');
    } else {
      localStorage.setItem('firstVisit', 'false');
    }
  }, [isFirstVisit]);

  const handleNext = () => {
    onNext();  // Proceed to the next page or mark as completed
    navigate('/auth/Signup');
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
