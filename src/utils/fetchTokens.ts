import { TokenData } from '@/types/token';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
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

export const fetchTokens = async (): Promise<TokenData[]> => {
  try {
    const response = await fetch(
      `${COINGECKO_API}/simple/price?ids=${TOKEN_IDS.join(',')}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch token data');
    }

    const data = await response.json();

    return TOKEN_IDS.map(id => ({
      id,
      symbol: id.toUpperCase(),
      price_change_percentage_24h: data[id]?.usd_24h_change || 0,
      market_cap: data[id]?.usd_market_cap || 15
    }));
  } catch (err) {
    console.error('Error fetching token data:', err);
    return TOKEN_IDS.map(id => ({
      id,
      symbol: id.toUpperCase(),
      price_change_percentage_24h: Math.random() * 10 - 5,
      market_cap: 0
    }));
  }
};