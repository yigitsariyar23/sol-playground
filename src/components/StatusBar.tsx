import React from 'react';

interface StatusBarProps {
  coin1: string;
  coin2: string;
  coin1Percentage: number;
  coin2Percentage: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ coin1, coin2, coin1Percentage, coin2Percentage }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-6 flex relative">
      <div
        className="bg-green-500 h-6 rounded-l-full relative flex items-center"
        style={{ width: `${coin1Percentage}%` }}
      >
        <div className="text-white ml-2 translate-y-3 absolute left-0 flex flex-col items-start">
          <span>{coin1}</span>
          <span>{`${coin1Percentage.toFixed(2)}%`}</span>
        </div>
      </div>
      <div
        className="bg-red-500 h-6 rounded-r-full relative flex items-center"
        style={{ width: `${coin2Percentage}%` }}
      >
        <div className="text-white mr-2 translate-y-3 absolute right-0 flex flex-col items-end">
          <span>{coin2}</span>
          <span>{`${coin2Percentage.toFixed(2)}%`}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;