'use client';

import { useEffect, useState, useCallback, memo } from 'react';
import { TokenData } from '@/types/token';
import { fetchTokens } from '../utils/fetchTokens'; // Adjust the path if necessary

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Token IDs we want to track
const TOKEN_IDS = [
  'bitcoin',
  'ethereum',
  'solana',
  'bonk',
  'dogwifhat',
  'myro',
  'book-of-meme',
  'popcat',
  'dogecoin',
  'pepe',
  'floki',
  'shiba-inu'
];

// Memoized token item component
const TokenItem = memo(({ token }: { token: TokenData }) => (
  <span className="text-white inline-flex items-center mx-12">
    ${token.symbol}
    <span 
      className={`ml-1 ${
        token.price_change_percentage_24h >= 0 
          ? 'text-green-500' 
          : 'text-red-500'
      }`}
    >
      {token.price_change_percentage_24h >= 0 ? '↑' : '↓'}
      {Math.abs(token.price_change_percentage_24h).toFixed(1)}%
    </span>
  </span>
));

TokenItem.displayName = 'TokenItem';

export const TokenTicker = () => {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTokens().then(setTokens).catch(setError);
    const interval = setInterval(() => {
      fetchTokens().then(setTokens).catch(setError);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const tickerContent = (
    <>
      {tokens.map((token) => (
        <TokenItem key={token.id} token={token} />
      ))}
    </>
  );

  if (error) {
    console.warn('Using fallback data due to error:', error);
  }

  return (
    <div className="ticker-wrap">
      <div className="ticker">
        <div className="ticker-content">
          {tickerContent}
        </div>
        <div className="ticker-content">
          {tickerContent}
        </div>
      </div>
    </div>
  );
};
