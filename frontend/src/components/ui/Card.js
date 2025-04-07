import React from "react";

const Card = ({ children, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white shadow-md rounded-lg p-4 border border-gray-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;