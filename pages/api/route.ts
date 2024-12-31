import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const rateLimit = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 25, // Increase the max requests
  requests: new Map<string, { count: number; timestamp: number }>(),
};

function isRateLimited(ip: string): boolean {
  const currentTime = Date.now();
  const requestInfo = rateLimit.requests.get(ip);

  if (requestInfo) {
    if (currentTime - requestInfo.timestamp < rateLimit.windowMs) {
      if (requestInfo.count >= rateLimit.maxRequests) {
        return true;
      } else {
        requestInfo.count += 1;
        rateLimit.requests.set(ip, requestInfo);
      }
    } else {
      rateLimit.requests.set(ip, { count: 1, timestamp: currentTime });
    }
  } else {
    rateLimit.requests.set(ip, { count: 1, timestamp: currentTime });
  }

  return false;
}

export default async function handler(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip');

  if (ip && isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests, please try again later.' },
      { status: 429 }
    );
  }

  if (request.method === 'POST') {
    try {
      const { email, wallet, coin, source } = await request.json();
      let tableName;
      let data, error;

      switch (source) {
        case 'users':
          tableName = 'users';
          ({ data, error } = await supabase
            .from(tableName)
            .insert([{ email, wallet }])
            .single());
          break;
        case 'votes':
        default:
          tableName = 'votes';
          ({ data, error } = await supabase
            .from(tableName)
            .insert([{ wallet, coin, isConfirmed: false }])
            .single());
          break;
      }

      if (error && error.code === '23505') {
        return NextResponse.json(
          { error: source === 'users' ? 'Already added to the waitlist' : 'Already voted' },
          { status: 409 }
        );
      } else if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ data });
    } catch (error) {
      console.error('Internal Server Error:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else if (request.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('votes')
        .select('coin, isConfirmed');

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      // Aggregate results in JavaScript
      const votes = data
        .filter((vote) => vote.isConfirmed)
        .reduce((acc: Record<string, number>, vote) => {
          acc[vote.coin] = (acc[vote.coin] || 0) + 1;
          return acc;
        }, {});

      return NextResponse.json(votes);
    } catch (error) {
      console.error('Internal Server Error:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return NextResponse.json(
      { error: 'Method Not Allowed' },
      { status: 405 }
    );
  }
}
