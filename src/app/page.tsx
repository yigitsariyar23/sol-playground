'use client';

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CountdownTimer } from '@/components/countdown-timer'
import { PoolDisplay } from '@/components/pool-display'
import { TokenTicker } from '@/components/token-ticker'
import { FaqMenu } from '@/components/faq-menu'
import { JoinWaitlist } from '@/components/join-waitlist';
import Image from 'next/image';
import { fetchTokens } from '../utils/fetchTokens'; // Adjust the path if necessary

interface MenuItem {
  id: string
  title: string
  content: string
}

export default function Home() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [mounted, setMounted] = useState(false);
  const [bonkMarketCap, setBonkMarketCap] = useState<number | null>(null);
  const [flokiMarketCap, setFlokiMarketCap] = useState<number | null>(null);

  useEffect(() => {
    setMenuItems([
      { 
        id: 'what-is', 
        title: 'What is SolPlayGround', 
        content: 'Welcome to SolPlayGround, the ultimate battleground for memecoins! \n\nHere, your favorite tokens are no longer just investments; they are warriors competing for glory in our dynamic arenas. Built on Solana\'s blazing-fast blockchain, SolPlayGround combines the thrill of competition, the power of community, and the opportunity to win big rewards.\nWhether you\'re a die-hard memecoin fan or new to the frenzy, this is your chance to show the world the true power of your meme. Ready to compete, win, and lead your token to victory? This is your playground.' 
      },
      { 
        id: 'how-to', 
        title: 'How to Play?', 
        content: 'Getting started on SolPlayGround is as easy as 1-2-3:\n 1. Pick Your Arena: Choose from our categories like Mini (100k-300k market cap), Midi (300k-500k), or Mega (500k-1M).\n • Got a favorite token? Time to send it into battle! ⚔️\n 2. Stake and Enter: Connect your wallet, stake your token, and secure your place in the competition.\n 3. Watch the Battle: During the match, tokens will compete based on market cap growth. Follow live updates and cheer for your champion!\n 4. Claim Your Rewards: When the timer hits zero, the token with the highest growth wins, and its supporters take home the prize pool.\nReady to test your token\'s might? Join the arena today!' 
      },
      { 
        id: 'token', 
        title: '$SPG', 
        content: 'What is $SPG?\n$SPG is the beating heart of SolPlayGround and the cornerstone of everything we\'re building. Designed to be much more than just another token, $SPG is here to redefine the memecoin landscape and reward our most loyal supporters.\n\nWhy $SPG?\n1- Your Key to Rewards:\n$SPG holders will enjoy exclusive rewards and bonuses, adding extra value to every battle in the arena. Whether it\'s through staking or participating, $SPG amplifies your wins.\n2- Future-Ready Utility:\nBefore the arenas even launch, $SPG will be your ticket to shaping the platform\'s future. From powering competitions to enhancing rewards, this token is built to grow with SolPlayGround and beyond.\n3- A Global Playground Token:\nWe\'re building $SPG to be the go-to token across all networks. Wherever we bring a Playground, $SPG will be the currency of choice, uniting all ecosystems under one powerful memecoin.\n4- Unlimited Potential:\nWith the goal of becoming the most utility-packed memecoin in the market, $SPG will serve as the ultimate reward token for players and supporters alike. Expect surprise $SPG drops as you play, and watch your wallet grow!\n\nWhy Should You Care?\n$SPG isn\'t just another token—it\'s your chance to be part of something groundbreaking. This is the start of a journey to create the next millionaires of the crypto world. Join us early, hold $SPG, and grow with the Playground as we expand to every corner of the blockchain ecosystem.\nWhat\'s Next?\nThe $SPG launch is just around the corner. Early supporters will have a unique opportunity to be part of this story from the beginning, unlocking exclusive benefits and cementing their place in the memecoin revolution.\nThe next big thing starts here.' 
      },
      { 
        id: 'faq', 
        title: 'F.A.Q.', 
        content: 'Q: How do I participate in a competition?\nA: Simple! Connect your wallet, deposit some SOL, choose your favorite memecoin, and pay SOL for it in the appropriate arena. Let the battle begin!\nQ: How are winners determined?\nA: The token with the highest market cap growth during the competition period wins.\nQ: Is my stake safe?\nA: Absolutely! All transactions and rewards are trustlessly managed by smart contracts on the Solana blockchain.\nQ: What rewards can I expect?\nA: If your token wins, you\'ll share the prize pool with other supporters. Plus, soon you\'ll also earn $SPG!\nQ: When is $SPG launching?\nA: It\'s coming soon! Follow us on Twitter and join our Discord/Telegram to stay updated.' 
      },
    ])
    setMounted(true);

    const fetchMarketCaps = async () => {
      try {
        const tokens = await fetchTokens();
        const bonkToken = tokens.find(token => token.id === 'bonk');
        const flokiToken = tokens.find(token => token.id === 'floki');

        if (bonkToken) {
          setBonkMarketCap(bonkToken.price_change_percentage_24h ?? null);
        }
        if (flokiToken) {
          setFlokiMarketCap(flokiToken.price_change_percentage_24h ?? null);
        }
      } catch (error) {
        console.error('Error fetching market cap data:', error);
      }
    };

    fetchMarketCaps();
  }, [])

  if (!mounted) {
    return null;
  }

  const flokiAnimationDelay = flokiMarketCap > bonkMarketCap ? 200 : 400;
  const bonkAnimationDelay = bonkMarketCap > flokiMarketCap ? 200 : 400;

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-purple-950 to-black">
      {/* Spotlight Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-grow p-6">
          {/* Header with buttons */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-4">
              <FaqMenu />
            </div>
            <JoinWaitlist/>
          </div>

          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="font-pixel text-5xl md:text-7xl text-white mb-4">SOLPLAYGROUND</h1>
            <p className="font-pixel text-lg text-gray-300">THE BATTLEGROUND OF MEMECOINS!</p>
            <p className="font-pixel text-sm text-gray-400">
              COMPETE, WIN AND MULTIPLY YOUR GAINS<br />
              WHILE SHAPING THE FUTURE OF $SPG
            </p>
          </div>

          {/* Main content */}
          <div className="flex flex-col items-center justify-center flex-grow">
            <CountdownTimer />
            <div className="">
              <PoolDisplay amount={0}/>
            </div>
            <div className="mt-48 relative w-full max-w-screen-xl mx-auto">
              <div className="relative">
                <Image
                  src="/battle-arena.svg"
                  alt="battle-arena"
                  width={600}
                  height={600}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2"
                  priority
                />
                <div>
                  <span className="absolute left-1/2 transform translate-x-1/2 -translate-y-1/2 top-1/2 text-white text-lg translate-x-48 -translate-y-48">
                    $BONK
                  </span>
                  <span className='absolute left-1/2 transform translate-x-1/2 -translate-y-1/2 top-1/2 text-white text-lg translate-x-64 -translate-y-32'
                  style={{color: bonkMarketCap  < 0 ? 'red' : 'green' }}>
                    {bonkMarketCap !== null ? `%${bonkMarketCap.toLocaleString()}` : 'NULL'}
                  </span>
                  <Image
                    src="/right-char.svg"
                    alt="right-char"
                    width={150}
                    height={270}
                    className="absolute bottom-0 mx-12 left-1/2 -translate-x-1/2 animate-idle"
                    style={{ animationDelay: `${bonkAnimationDelay}ms` }}
                    priority
                  />
                </div>
                <div>
                  <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 text-white text-lg -translate-x-64 -translate-y-48">
                    $FLOKI
                  </span>
                  <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 text-white text-lg -translate-x-80 -translate-y-32 " 
                  style={{color: flokiMarketCap  < 0 ? 'red' : 'green' }}>
                    {flokiMarketCap !== null ? `%${flokiMarketCap.toLocaleString()}` : 'NULL'}
                  </span>
                  <Image
                    src="/left-char.svg"
                    alt="left-char"
                    width={150}
                    height={270}
                    className="absolute bottom-0 -mx-48 left-1/2 -translate-x-1/2 animate-idle"
                    style={{ animationDelay: `${flokiAnimationDelay}ms` }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Token Ticker - Fixed at bottom */}
        <div className="w-full">
          <TokenTicker />
        </div>
      </div>

      {/* Modals */}
      {menuItems.map((item) => (
        <Dialog key={item.id} open={activeModal === item.id} onOpenChange={(isOpen) => setActiveModal(isOpen ? item.id : null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{item.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4 text-sm">
              {item.content.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </main>
  );
}
