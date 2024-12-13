'use client';

import Image from 'next/image';

export const PoolDisplay = () => {
  return (
    <div className="text-center my-4 md:my-8">
      <div className="flex justify-center gap-2 md:gap-4 mb-2 md:mb-4">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="w-8 h-8 md:w-12 md:h-12 rounded-full animate-bounce" 
               style={{ animationDelay: `${i * 200}ms` }}>
                <Image src="coin.svg" alt='Coin svg' width={50} height={50} className="w-full h-full"></Image>
          </div>
        ))}
      </div>
    </div>
  );
};
