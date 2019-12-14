import React from 'react';

const RoundedIcon = ({ buttonStyle, handleClick, children, param }) => {
  return (
    <button
      className={`btn rounded-full ${buttonStyle} text-transparent text-black py-2 px-4 border-2 hover:bg-transparent uppercase transition-2`}
      onClick={e => handleClick(e, param)}
    >
      {children}
    </button>
  );
};

export default RoundedIcon;
