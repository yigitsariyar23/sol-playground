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
import StatusBar from '../components/StatusBar';

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
  const [coin1] = useState('FLOKI');
  const [coin2] = useState('BONK');
  const [coin1MarketCapChange] = useState(0);
  const [coin2MarketCapChange] = useState(0);

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

  const totalChange = Math.abs(coin1MarketCapChange) + Math.abs(coin2MarketCapChange);
  const coin1Percentage = totalChange ? (Math.abs(coin1MarketCapChange) / totalChange) * 100 : 50;
  const coin2Percentage = totalChange ? (Math.abs(coin2MarketCapChange) / totalChange) * 100 : 50;

  const flokiAnimationDelay = (flokiMarketCap ?? 0) > (bonkMarketCap ?? 0) ? 200 : 400;
  const bonkAnimationDelay = (bonkMarketCap ?? 0) > (flokiMarketCap ?? 0) ? 200 : 400;

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-purple-950 to-black">
      {/* Spotlight Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-purple-500/20 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-purple-500/20 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-grow p-2 md:p-4">
          {/* Header with buttons */}
          <div className="flex justify-between items-center mb-4 md:mb-8">
            <div className="flex gap-2 md:gap-4">
              <FaqMenu />
            </div>
            <JoinWaitlist/>
          </div>

          {/* Title Section */}
          <div className="text-center mb-4 md:mb-8">
            <h1 className="font-pixel text-2xl sm:text-2xl md:text-5xl lg:text-7xl text-white mb-2 md:mb-4">SOLPLAYGROUND</h1>
            <p className="font-pixel text-sm sm:text-base md:text-lg text-gray-300">THE BATTLEGROUND OF MEMECOINS!</p>
            <p className="font-pixel text-xs sm:text-sm text-gray-400">
              COMPETE, WIN AND MULTIPLY YOUR GAINS<br />
              WHILE SHAPING THE FUTURE OF $SPG
            </p>
          </div>

          {/* Main content */}
          <div className="flex flex-col -translate-y-4 md:-translate-y-8 items-center justify-center flex-grow">
            <CountdownTimer />
            <div className="-translate-y-4 md:-translate-y-8">
              <PoolDisplay/>
            </div>
            
            <div className='-translate-y-12 sm: -translate-y-6 md: -translate-y-12 '>
              <h1 className='text-white'>Battle between {coin1} and {coin2}</h1>
              <StatusBar
                coin1={coin1}
                coin2={coin2}
                coin1Percentage={coin1Percentage}
                coin2Percentage={coin2Percentage}
              />
              {/* Other components and content */}
            </div>
            <div className="mt-16 sm: mt-48 md:mt-48 relative w-full -translate-y-4 md:-translate-y-8 max-w-screen-xl mx-auto">
              <div className="relative">
                <Image
                  src="/battle-arena.svg"
                  alt="battle-arena"
                  width={600}
                  height={600}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px]"
                  priority
                />
                <div className="relative">
                  {/* Character positions */}
                  <div className='translate-x-24 sm: translate-x-12 md:translate-x-48 -translate-y-24 sm: -translate-y-40 md:-translate-y-48'>
                    <span className='absolute left-1/2 transform translate-x-1/2 -translate-y-1/2 top-1/2 text-white text-sm sm:text-base md:text-lg translate-x-12 translate-y-8'
                    style={{color: (coin2MarketCapChange ?? 0)  < 0 ? 'red' : 'green' }}>
                      {coin2MarketCapChange !== null ? `%${coin2MarketCapChange.toLocaleString()}` : 'NULL'}
                    </span>
                  </div>
                  <Image
                    src="/right-char.svg"
                    alt="right-char"
                    width={150}
                    height={270}
                    className="absolute bottom-0 mx-6 md:mx-12 left-1/2 -translate-x-1/2 animate-idle w-[75px] md:w-[150px]"
                    style={{ animationDelay: `${bonkAnimationDelay}ms` }}
                    priority
                  />
                  <div className='-translate-x-24 md:-translate-x-48 -translate-y-24 sm: -translate-y-40 md:-translate-y-48'>
                    <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 text-white text-sm sm:text-base md:text-lg -translate-x-24 translate-y-8" 
                    style={{color: (flokiMarketCap ?? 0)  < 0 ? 'red' : 'green' }}>
                      {flokiMarketCap !== null ? `%${flokiMarketCap.toLocaleString()}` : 'NULL'}
                    </span>
                  </div>
                  <Image
                    src="/left-char.svg"
                    alt="left-char"
                    width={150}
                    height={270}
                    className="absolute bottom-0 -mx-24 md:-mx-48 left-1/2 -translate-x-1/2 animate-idle w-[75px] md:w-[150px]"
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
