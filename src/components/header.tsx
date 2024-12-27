import { FaqMenu } from '@/components/faq-menu'
import { JoinWaitlist } from './join-waitlist'

export function Header() {
  return (
    <div className="relative w-full">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 md:top-12 text-center">
        <h1 className="font-pixel sm:text-2xl md:text-4xl xl:text-5xl text-white">SOLPLAYGROUND</h1>
        <p className="font-pixel sm:text-base md:text-base xl:text-xl text-gray-300">THE BATTLEGROUND OF MEMECOINS!</p>
        <p className="font-pixel sm: md:text-xs xl:text-sm text-gray-400">
          COMPETE, WIN AND MULTIPLY YOUR GAINS<br />
          WHILE SHAPING THE FUTURE OF $SPG
        </p>
      </div>
      <div className="flex justify-between items-center">
        <FaqMenu />
        <JoinWaitlist />
      </div>
    </div>
  )
}

