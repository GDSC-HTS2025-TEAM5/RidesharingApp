import React from "react";

const Button = ({ children, className, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center w-auto px-4 py-2 
        font-bold rounded-md transition duration-200 
        ${className} hover:brightness-90 active:scale-95`}
    >
      {children}
    </button>
  );
};

export default Button;