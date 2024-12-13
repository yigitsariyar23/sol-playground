'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const JoinWaitlist = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [wallet, setWallet] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Email:', email);
    console.log('Wallet:', wallet);

    // Add to Supabase database
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, wallet }]);

    if (error) {
      console.error('Error adding to users:', error);
    } else {
      console.log('Successfully added to users:', data);
    }

    setIsOpen(false); // Close dialog after submission
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
