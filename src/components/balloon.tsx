'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'react-toastify'; // Import toast for notifications
import Image from 'next/image';

export const Balloon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [wallet, setWallet] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false); // State for confirmation dialog
  const [walletError, setWalletError] = useState(''); // State for wallet error
  const [successOpen, setSuccessOpen] = useState(false); // State for success dialog

  const validateWallet = (wallet: string) => {
    const walletRegex = /^[a-zA-Z0-9]{44}$/;
    return walletRegex.test(wallet);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateWallet(wallet)) {
      setWalletError('Invalid wallet address');
      return;
    }

    setWalletError(''); // Clear any previous error
    setConfirmOpen(true); // Open confirmation dialog
  };

  const handleConfirm = async () => {
    setConfirmOpen(false); // Close confirmation dialog

    const response = await fetch('/api/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, wallet, source: 'balloon' }), // Add source field
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Successfully added to users:', result.data);
      toast.success('Successfully added to the baloon!'); // Show success notification
      setIsOpen(false); // Close dialog after submission
      setSuccessOpen(true); // Open success dialog
    } else {
      console.error('Error adding to users:', result.error);
      toast.error('Error adding to the baloon.'); // Show error notification
    }
  };

  return (
    <>
      <Image
                src="/balloon.png"
                alt="balloon"
                width={200}
                height={200}
                className="absolute -my-64 mx-14 right-1/4 animate-bounce w-auto h-[100px] cursor-pointer"
                priority
                onClick={() => setIsOpen(true)}
              />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-purple-900 text-white">
          <DialogHeader>
            <DialogTitle className="font-pixel text-xl">BALLOOON</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded bg-gray-800 border border-gray-600"
              required
            />
            <input
              type="text"
              placeholder="Solana Wallet Address"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="p-2 rounded bg-gray-800 border border-gray-600"
              required
            />
            {walletError && <p className="text-red-500">{walletError}</p>} {/* Display wallet error */}
            <button type="submit" className="bg-green-500 px-4 py-2 rounded font-pixel text-white hover:bg-green-400 transition">
              Submit
            </button>
          </form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="bg-purple-900 text-white">
          <DialogHeader>
            <DialogTitle className="font-pixel text-xl">Confirm Submission</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <p>Are you sure you want to join the waitlist with the provided information?</p>
            <button onClick={handleConfirm} className="bg-green-500 px-4 py-2 rounded font-pixel text-white hover:bg-green-400 transition">
              Confirm
            </button>
            <button onClick={() => setConfirmOpen(false)} className="bg-red-500 px-4 py-2 rounded font-pixel text-white hover:bg-red-400 transition">
              Cancel
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
            <p>You are successfully added to the waitlist!</p>
            <button onClick={() => setSuccessOpen(false)} className="bg-green-500 px-4 py-2 rounded font-pixel text-white hover:bg-green-400 transition">
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
