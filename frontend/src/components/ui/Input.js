import React, { forwardRef } from "react";

const Input = forwardRef(({ type = "text", placeholder, value, onChange, className }, ref) => {
  return (
    <input
      ref={ref} 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border border-gray-300 rounded p-2 w-full text-right placeholder:text-right ${className}`}
    />
  );
});

export default Input;
