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
        className="bg-green-500 h-6 rounded-l-full"
        style={{ width: `${coin1Percentage}%` }}
      >
        <span className="text-white ml-2">{`${coin1} ${coin1Percentage}%`}</span>
      </div>
      <div
        className="bg-red-500 h-6 rounded-r-full"
        style={{ width: `${coin2Percentage}%` }}
      >
        <span className="text-white ml-2 absolute right-0 mr-2">{`${coin2} ${coin2Percentage}%`}</span>
      </div>
    </div>
  );
};

export default StatusBar;