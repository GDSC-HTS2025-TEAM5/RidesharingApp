import React from "react";

const Input = ({ type = "text", placeholder, value, onChange, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border border-gray-300 rounded p-2 w-full text-right placeholder:text-right ${className}`}
    />
  );
};

export default Input;
