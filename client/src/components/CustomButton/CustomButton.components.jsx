import React from "react";

const CustomButton = ({ text, children, onClick, id, value, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      id={id}
      value={value}
      className={className}
    >
      {children} {text}
    </button>
  );
};
export default CustomButton;
