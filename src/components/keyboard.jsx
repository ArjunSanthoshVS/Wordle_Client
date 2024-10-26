import React from 'react';

const Keyboard = ({ onKeyPress, onEnter, onDelete }) => {
  const firstRow = 'QWERTYUIOP';
  const secondRow = 'ASDFGHJKL';
  const thirdRow = 'ZXCVBNM';

  return (
    <div className="flex flex-col items-center mt-4 space-y-2">
      {/* First row */}
      <div className="flex space-x-1">
        {firstRow.split('').map((letter) => (
          <button
            key={letter}
            onClick={() => onKeyPress(letter)}
            className="w-10 h-10 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Second row */}
      <div className="flex space-x-1">
        {secondRow.split('').map((letter) => (
          <button
            key={letter}
            onClick={() => onKeyPress(letter)}
            className="w-10 h-10 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Third row with Enter and Backspace */}
      <div className="flex space-x-1">
        <button onClick={onEnter} className="w-20 h-10 bg-gray-700 text-white rounded">
          Enter
        </button>
        {thirdRow.split('').map((letter) => (
          <button
            key={letter}
            onClick={() => onKeyPress(letter)}
            className="w-10 h-10 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            {letter}
          </button>
        ))}
        <button onClick={onDelete} className="w-20 h-10 bg-gray-700 text-white rounded">
          <img src="/images/backspace.png" alt="Enter key" className="h-full w-full p-2 object-contain" />
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
