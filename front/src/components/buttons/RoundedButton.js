import React from 'react';

const RoundedButton = ({ buttonStyle, text, handleClick }) => {
  return (
    <button
      onClick={e => handleClick(e)}
      className={`btn rounded-full ${buttonStyle} text-transparent text-black py-2 px-4 border-2 hover:bg-transparent uppercase transition-2`}
      style={{ letterSpacing: 2 }}
    >
      {text}
    </button>
  );
};

export default RoundedButton;
