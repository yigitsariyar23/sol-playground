'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const JoinWaitlist = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [wallet, setWallet] = useState('');

  const validateWallet = (wallet: string) => {
    // Simple validation for wallet address (you can replace this with more complex validation)
    const walletRegex = /^[a-zA-Z0-9]{44}$/;
    return walletRegex.test(wallet);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateWallet(wallet)) {
      console.error('Invalid wallet address');
      return;
    }

    console.log('Email:', email);
    console.log('Wallet:', wallet);

    // Send data to the API route
    const response = await fetch('/api/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, wallet }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Successfully added to users:', result.data);
      setIsOpen(false); // Close dialog after submission
    } else {
      console.error('Error adding to users:', result.error);
    }

    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="bg-purple-700 px-4 py-2 rounded font-pixel text-white hover:bg-purple-600 transition">
        JOIN WAITLIST
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-purple-900 text-white">
          <DialogHeader>
            <DialogTitle className="font-pixel text-xl">Join the Waitlist</DialogTitle>
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
            <button type="submit" className="bg-green-500 px-4 py-2 rounded font-pixel text-white hover:bg-green-400 transition">
              Submit
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
