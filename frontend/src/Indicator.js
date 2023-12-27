import React from 'react';

const Indicator = ({ rate }) => {
  const color = rate < 40 ? 'bg-green-400' : 'bg-red-500';
  
  return (
    <div className={`w-10 h-10 rounded-full ${color} shadow-md transition-color duration-1000`}></div>
  );
};

export default Indicator;
