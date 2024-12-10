'use client';

interface Token {
  name: string;
  percentageChange: number;
  direction: 'up' | 'down';
}

const defaultTokens: Token[] = [
  {
    name: 'BONK',
    percentageChange: 15.5,
    direction: 'up'
  },
  {
    name: 'WIF',
    percentageChange: 8.2,
    direction: 'up'
  },
  {
    name: 'MYRO',
    percentageChange: 12.3,
    direction: 'up'
  }
];

export const BattleArena = ({ tokens = defaultTokens }: { tokens?: Token[] }) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="flex justify-around items-center">
        {tokens.map((token, index) => (
          <div key={index} className="text-center">
            <div className="font-pixel text-2xl text-white mb-2">${token.name}</div>
            <div className={`font-pixel text-xl ${token.direction === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {token.percentageChange}% {token.direction.toUpperCase()}!
            </div>
            <div className="w-16 h-16 bg-gray-800 rounded-full mt-2">
              {/* Character sprite would go here */}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-purple-900/50"></div>
      </div>
    </div>
  );
};
