'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface FaqItem {
  id: string;
  title: string;
  content: string;
}

const faqItems: FaqItem[] = [
  {
    id: 'what-is',
    title: 'What is SolPlayGround',
    content: 'Welcome to SolPlayGround, the ultimate battleground for memecoins! \n\nHere, your favorite tokens are no longer just investments; they are warriors competing for glory in our dynamic arenas. Built on Solana\'s blazing-fast blockchain, SolPlayGround combines the thrill of competition, the power of community, and the opportunity to win big rewards.\n\nWhether you\'re a die-hard memecoin fan or new to the frenzy, this is your chance to show the world the true power of your meme. Ready to compete, win, and lead your token to victory? This is your playground.'
  },
  {
    id: 'how-to',
    title: 'How to Play',
    content: 'Getting started on SolPlayGround is as easy as 1-2-3:\n\n1. Pick Your Arena: Choose from our categories like Mini (100k-300k market cap), Midi (300k-500k), or Mega (500k-1M).\n• Got a favorite token? Time to send it into battle! ⚔️\n\n2. Stake and Enter: Connect your wallet, stake your token, and secure your place in the competition.\n\n3. Watch the Battle: During the match, tokens will compete based on market cap growth. Follow live updates and cheer for your champion!\n\n4. Claim Your Rewards: When the timer hits zero, the token with the highest growth wins, and its supporters take home the prize pool.\n\nReady to test your token\'s might? Join the arena today!'
  },
  {
    id: 'spg',
    title: '$SPG',
    content: 'What is $SPG?\n$SPG is the beating heart of SolPlayGround and the cornerstone of everything we’re building. Designed to be much more than just another token, $SPG is here to redefine the memecoin landscape and reward our most loyal supporters.\n-----------------------------------\nWhy $SPG?\n1. Your Key to Rewards:\n$SPG holders will enjoy exclusive rewards and bonuses, adding extra value to every battle in the arena. Whether it’s through staking or participating, $SPG amplifies your wins.\n\n2. Future-Ready Utility:\nBefore the arenas even launch, $SPG will be your ticket to shaping the platform’s future. From powering competitions to enhancing rewards, this token is built to grow with SolPlayGround and beyond.\n\n3. A Global Playground Token:\nWe’re building $SPG to be the go-to token across all networks. Wherever we bring a Playground, $SPG will be the currency of choice, uniting all ecosystems under one powerful memecoin.\n\n4. Unlimited Potential:\nWith the goal of becoming the most utility-packed memecoin in the market, $SPG will serve as the ultimate reward token for players and supporters alike. Expect surprise $SPG drops as you play, and watch your wallet grow!\n-----------------------------------\nWhy Should You Care?\n$SPG isn’t just another token—it’s your chance to be part of something groundbreaking. This is the start of a journey to create the next millionaires of the crypto world. Join us early, hold $SPG, and grow with the Playground as we expand to every corner of the blockchain ecosystem.\n-----------------------------------\nWhat’s Next?\nThe $SPG launch is just around the corner. Early supporters will have a unique opportunity to be part of this story from the beginning, unlocking exclusive benefits and cementing their place in the memecoin revolution.\n\nThe next big thing starts here.'
  },
  {
    id: 'more',
    title: 'More',
    content: `General Questions\n
Q: What makes SolPlayground unique?\nA: We're the first platform to turn memecoin trading into a competitive sport, with real-time battles and rewards!\n\n
Q: Is it safe to participate?\nA: Absolutely! Our smart contracts are thoroughly audited, and all competitions are trustlessly executed on the Solana blockchain.\n\n
Q: What networks do you support?\nA: Currently, we're focused on Solana, but we plan to expand to other networks in the future.\n
-----------------------------------\n
Gameplay & Mechanics\n
Q: How long do battles last?\nA: Battles can range from quick 1-hour sprints to epic 24-hour marathons.\n\n
Q: How are winners determined?\nA: Winners are determined by the highest percentage increase in market cap during the battle period.\n\n
Q: Can I participate in multiple battles?\nA: Yes! You can join as many battles as you want across different arenas.\n
-----------------------------------\n
Rewards & Tokenomics\n
Q: How are rewards distributed?\nA: Rewards are automatically distributed to winners based on their stake size in the winning token.\n\n
Q: What percentage of the pool do winners get?\nA: The reward structure varies by arena, but typically ranges from 50% to 80% of the total pool.\n\n
Q: Are there any participation rewards?\nA: Yes! Even if your token doesn't win, you'll earn $SPG tokens for participating.\n
-----------------------------------\n
Technical & Support\n
Q: What wallets are supported?\nA: We support all major Solana wallets including Phantom, Solflare, and Backpack.\n\n
Q: How do I track my battles?\nA: Your dashboard shows all your active battles, past performance, and pending rewards.\n\n
Q: What if I need help?\nA: Our support team is available 24/7 through Discord and Telegram.\n
-----------------------------------\n
Future Plans\n
Q: What's next for SolPlayground?\nA: We're working on multi-chain support, advanced battle modes, and exclusive $SPG holder features.\n\n
Q: Will there be governance?\nA: Yes! $SPG holders will be able to vote on platform upgrades and new features.\n\n
Q: Any plans for partnerships?\nA: We're actively working with major projects in the Solana ecosystem - stay tuned for announcements!`
  }
];

export const FaqMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <>
      {/* FAQ Button */}
      <div className="relative">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-purple-700 px-2 md:px-4 py-1 md:py-2 rounded font-pixel text-[10px] sm:text-xs md:text-base text-white hover:bg-purple-600 transition"
        >
          FAQ
        </button>

        {/* FAQ Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 md:w-64 bg-purple-900 rounded-lg shadow-lg overflow-hidden z-50">
            {faqItems.map((item, index) => (
              <div key={item.id}>
                <button
                  onClick={() => {
                    setActiveModal(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 sm:px-6 py-2 sm:py-3 text-left text-white hover:bg-purple-700 transition font-pixel text-[10px] sm:text-xs md:text-sm"
                >
                  {item.title}
                </button>
                {index < faqItems.length - 1 && (
                  <div className="h-0.5 bg-purple-500 mx-4" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {faqItems.map((item) => (
        <Dialog key={item.id} open={activeModal === item.id} onOpenChange={() => setActiveModal(null)}>
          <DialogContent className="bg-purple-900 text-white max-h-[90vh] md:max-h-[80vh] overflow-y-auto w-[95vw] md:w-full">
            <DialogHeader className="top-0 z-10 pb-4 border-b border-purple-500">
              <DialogTitle className="font-pixel text-sm sm:text-base md:text-xl">
                {item.title}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4 sm:py-6 px-3 sm:px-4 space-y-3 sm:space-y-4 text-[10px] sm:text-xs md:text-sm font-pixel">
              {item.content.split('\n').map((line, i) => (
                <p key={i} className={`leading-relaxed ${line.startsWith('---') ? 'border-t-2 border-purple-500 my-8 pt-8' : ''}`}>
                  {!line.startsWith('---') && line}
                </p>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
};
