'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'react-toastify'; // Import toast for notifications

export const BattleArena = ({ coin1, coin2 }: { coin1: string, coin2: string }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletError, setWalletError] = useState('');
  const [coin1Votes, setCoin1Votes] = useState(0);
  const [coin2Votes, setCoin2Votes] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false); // State for success dialog
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const validateWallet = (wallet: string) => {
    const walletRegex = /^[a-zA-Z0-9]{44}$/;
    return walletRegex.test(wallet);
  };

  const handleVote = (coin: string) => {
    setSelectedCoin(coin);
    setShowDialog(true);
  };

  const handleDialogSubmit = async () => {
    if (!validateWallet(walletAddress)) {
      setWalletError('Invalid wallet address');
      return;
    }

    try {
      console.log('Submitting vote:', walletAddress, selectedCoin);
      const response = await fetch('/api/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallet: walletAddress, coin: selectedCoin, table: 'votes', isConfirmed: false }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Vote submitted successfully.');
        setSuccessMessage('Your vote has been successfully submitted!\n Please wait for the confirmation to see your vote.');
        setSuccessOpen(true); // Open success dialog
      } else {
        console.error('Error response:', result);
        if (result.error === 'Already voted') {
          toast.error('You already voted.');
          setSuccessMessage('You have already voted.');
        } else {
          toast.error('Error submitting vote.');
          setSuccessMessage('Error submitting vote.');
        }
        setSuccessOpen(true); // Open success dialog with error message
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
      toast.error('Error submitting vote.');
      setSuccessMessage('Error submitting vote.');
      setSuccessOpen(true); // Open success dialog with error message
    }

    setWalletError('');
    setShowDialog(false);
  };

  const fetchVotes = useCallback(async () => {
    try {
      const response = await fetch('/api/route');
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      setCoin1Votes(data[coin1] || 0);
      setCoin2Votes(data[coin2] || 0);
    } catch (error) {
      console.error('Error fetching votes:', error);
    }
  }, [coin1, coin2]);

  useEffect(() => {
    fetchVotes();
  }, [fetchVotes]);

  return (
    <div className='border-2 border-white p-16 rounded-xl'>
      <div className="-mt-16">
        <h1 className='text-white text-center'>Battle between {coin1} and {coin2}</h1>
      </div>
      <div className="flex justify-around mt-8">
        <div className="text-center">
          <Image src={`/${coin1.toLowerCase()}.png`} alt={coin1} className="w-16 h-16 mx-auto" width={64} height={64} />
          <button onClick={() => handleVote(coin1)} className="mt-2 bg-purple-700 text-white px-4 py-2 rounded mb-4 mx-2">Vote</button>
          <p className="text-white">Votes: {coin1Votes}</p> {/* Display coin1 votes */}
        </div>
        <div className="text-center">
          <Image src={`/${coin2.toLowerCase()}.png`} alt={coin2} className="w-16 h-16 mx-auto" width={64} height={64} />
          <button onClick={() => handleVote(coin2)} className="mt-2 bg-purple-700 text-white px-4 py-2 rounded mb-4 mx-2">Vote</button>
          <p className="text-white">Votes: {coin2Votes}</p> {/* Display coin2 votes */}
        </div>
      </div>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-purple-900 text-white">
          <DialogHeader>
            <DialogTitle className="font-pixel text-center text-lg">Enter Wallet Address</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <p className="text-gray-400 -mt-4 text-xs text-center">To vote you should have at least 1M$SPG.</p> {/* Information about $SPG */}
            <input
              type="text"
              placeholder="Solana Wallet Address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="p-2 rounded bg-gray-800 border border-gray-600"
              required
            />
            {walletError && <p className="text-red-500">{walletError}</p>} {/* Display wallet error */}
            <button onClick={() => handleDialogSubmit()} className="bg-green-500 px-4 py-2 rounded font-pixel text-white hover:bg-green-400 transition">
              Vote
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="bg-purple-900 text-white">
          <DialogHeader>
            <DialogTitle className="font-pixel text-xl">Success</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <p>{successMessage}</p>
            <button onClick={() => setSuccessOpen(false)} className="bg-green-500 px-4 py-2 rounded font-pixel text-white hover:bg-green-400 transition">
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
