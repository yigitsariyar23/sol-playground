import { TokenData } from '@/types/token';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const TOKEN_IDS = [
  'bitcoin',
  'ethereum',
  'solana',
  'bonk',
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
    const response = await fetch(`${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${TOKEN_IDS.join(',')}&order=market_cap_desc&per_page=${TOKEN_IDS.length}&page=1&sparkline=false`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch token data');
    }

    const data = await response.json();

    return TOKEN_IDS.map(id => {
      const tokenData = data.find((token: { id: string; }) => token.id === id);
      console.log(tokenData)
      return {
        id,
        symbol: tokenData?.symbol || id.toUpperCase(),
        price_change_percentage_24h: tokenData?.price_change_percentage_24h || 0,
        market_cap: tokenData?.market_cap || 15
      };
    });
  } catch (err) {
    console.error('Error fetching token data:', err);
    return TOKEN_IDS.map(id => ({
      id,
      symbol: id.toUpperCase(),
      price_change_percentage_24h: 0,
      market_cap: 15
    }));
  }
};