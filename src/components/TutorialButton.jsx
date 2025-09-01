import React from 'react';

const TutorialButton = ({ onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed top-4 right-4 z-20 p-3 bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-500 hover:to-blue-500 text-white rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300 backdrop-blur-sm border border-white/10 ${className}`}
      title="Show Tutorial"
    >
      <div className="text-xl">💡</div>
    </button>
  );
};

export default TutorialButton;
