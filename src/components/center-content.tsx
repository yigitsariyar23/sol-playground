import Image from 'next/image'

export function CenterContent() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-8">
      {/* Neon sheep icon (placeholder) */}
      <div className="w-24 h-24 bg-pink-500 rounded-full opacity-75 animate-pulse"></div>
      
      {/* Timer */}
      <div className="text-6xl font-mono text-white">2:01:23 LEFT</div>
      
      {/* Characters and progress bar */}
      <div className="w-full max-w-md flex justify-between items-center">
        <div className="text-red-500 text-right">
          <p>12% down</p>
          <p className="text-2xl font-bold">$BONK</p>
        </div>
        <div className="flex space-x-4">
          <Image src="/placeholder.svg?height=48&width=48" alt="BONK character" width={48} height={48} />
          <Image src="/placeholder.svg?height=48&width=48" alt="WIF character" width={48} height={48} />
        </div>
        <div className="text-green-500">
          <p>5% up</p>
          <p className="text-2xl font-bold">$WIF</p>
        </div>
      </div>
      <div className="w-full max-w-md bg-gray-700 h-4 rounded-full overflow-hidden">
        <div className="bg-red-500 h-full" style={{ width: '30%' }}></div>
      </div>
    </div>
  )
}

