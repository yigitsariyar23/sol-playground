import Image from 'next/image'

export function PoolSize() {
  return (
    <div className="text-right">
      <Image src="/placeholder.svg?height=50&width=50" alt="Coin icon" width={50} height={50} />
      <p className="text-white">Pool Size : 100 SOL</p>
      <p className="text-xs text-gray-300">Winner Memecoin Players<br />collect pool by their size of<br />pool.</p>
    </div>
  )
}

