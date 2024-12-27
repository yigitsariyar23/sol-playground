'use client';

import { useState } from 'react';
import Image from 'next/image';


export const BattleArena = ({ coin1, coin2 }: { coin1: string, coin2: string }) => {
  const [votes, setVotes] = useState({ [coin1]: 0, [coin2]: 0 });
  const [showDialog, setShowDialog] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const handleVote = (coin: string) => {
    setShowDialog(true);
  };

  const handleDialogSubmit = () => {
    setShowDialog(false);
    // Add logic to verify wallet address and $SPG balance
    alert('To vote you should have at least 4000$SPG.');
    // If verification passes, update votes
    // setVotes(prevVotes => ({ ...prevVotes, [coin]: prevVotes[coin] + 1 }));
  };

  return (
    <div className='border-2 border-white p-16 rounded-xl'>
      <div className="-mt-16">
        <h1 className='text-white text-center'>Battle between {coin1} and {coin2}</h1>
      </div>
      <div className="flex justify-around mt-8">
        <div className="text-center">
          <Image src={`/${coin1}.svg`} alt={coin1} className="w-16 h-16 mx-auto" width={64} height={64} />
          <button onClick={() => handleVote(coin1)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded mb-4 mx-2">Vote</button>
          <p className="text-white mt-2">Votes: {votes[coin1]}</p>
        </div>
        <div className="text-center">
          <Image src={`/${coin2}.svg`} alt={coin2} className="w-16 h-16 mx-auto" width={64} height={64} />
          <button onClick={() => handleVote(coin2)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded mb-4 mx-2">Vote</button>
          <p className="text-white mt-2">Votes: {votes[coin2]}</p>
        </div>
      </div>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded">
            <h2 className="text-black mb-4">Enter Wallet Address</h2>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="border p-2 w-full mb-4"
            />
            <button onClick={handleDialogSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};
