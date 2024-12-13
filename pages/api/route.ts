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

export default async function handler(request: NextRequest) {
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