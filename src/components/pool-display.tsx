'use client';

import { useState } from 'react';
import { Copy } from 'lucide-react';

export const PoolDisplay = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText('4e4cQca5mRtyQnBz4T3SNjA69SmmuA5Bg786YNkUpump');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-center my-4 md:my-8">
      <div className="flex justify-center items-center gap-2 md:gap-4 mb-2 md:mb-4">
        <button 
          onClick={copyToClipboard} 
          className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center"
        >
          $SPG CA: <Copy size={24} className="ml-2" />
        </button>
      </div>
      {copied && <div className="text-green-500 mt-2">Copied to clipboard!</div>}
    </div>
  );
};
