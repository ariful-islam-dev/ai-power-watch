import React from "react";

const Button = ({ btnStyle="", onClick=() => {}, children }) => {
  return (
    <div className={`${btnStyle} `}>
      <button onClick={onClick} className={`px-4 py-2 font-bold text-white bg-teal-500 rounded hover:bg-teal-700  `}>
        {children}
      </button>
    </div>
  );
};

export default Button;
