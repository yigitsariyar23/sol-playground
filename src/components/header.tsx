import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <div className="flex justify-between items-start w-full">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: 'monospace' }}>
          SOLPLAYGROUND
        </h1>
        <p className="text-gray-200 text-sm">The Battleground of Memecoins!</p>
        <p className="text-gray-200 text-xs">Compete, win, and multiply your gains while shaping the future of $SPG.</p>
      </div>
      <Button className="bg-red-700 hover:bg-red-800 text-white px-6 text-sm">
        Join Waitlist Join ARENA
      </Button>
    </div>
  )
}

