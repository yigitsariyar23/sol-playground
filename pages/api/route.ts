import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

const rateLimit = {
  windowMs: 180 * 1000, // 3 minute
  maxRequests: 3,
  requests: new Map<string, { count: number, timestamp: number }>()
}

function isRateLimited(ip: string): boolean {
  const currentTime = Date.now()
  const requestInfo = rateLimit.requests.get(ip)

  if (requestInfo) {
    if (currentTime - requestInfo.timestamp < rateLimit.windowMs) {
      if (requestInfo.count >= rateLimit.maxRequests) {
        return true
      } else {
        requestInfo.count += 1
        rateLimit.requests.set(ip, requestInfo)
      }
    } else {
      rateLimit.requests.set(ip, { count: 1, timestamp: currentTime })
    }
  } else {
    rateLimit.requests.set(ip, { count: 1, timestamp: currentTime })
  }

  return false
}

export default async function handler(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip')

  if (ip && isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests, please try again later.' },
      { status: 429 }
    )
  }

  if (request.method === 'POST') {
    try {
      const { email, wallet } = await request.json()
      
      const { data, error } = await supabase
        .from('users')
        .insert([{ email, wallet }])
        
      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        )
      }
      
      return NextResponse.json({ data })
    } catch {
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      )
    }
  } else {
    return NextResponse.json(
      { error: 'Method Not Allowed' },
      { status: 405 }
    )
  }
}