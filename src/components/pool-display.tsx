'use client';

import Image from 'next/image';

export const PoolDisplay = () => {
  return (
    <div className="text-center my-8">
      <div className="flex justify-center gap-4 mb-4">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="w-12 h-12 rounded-full animate-bounce" 
               style={{ animationDelay: `${i * 200}ms` }}>
                <Image src="coin.svg" alt='Coin svg' width={50} height={50}></Image>
          </div>
        ))}
      </div>
      {/* <div className="font-pixel text-2xl text-white">
        POOL AMOUNT: {amount} SOL
      </div>
      <div className="font-pixel text-sm text-gray-400 mt-2">
        WINNER MEMECOIN PLAYERS COLLECT PRIZES BY THEIR SIZE OF POOL
      </div> */}
    </div>
  );
};
