// pages/api/submitWaitlist.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, wallet } = req.body;

    // Insert into Supabase
    const { data, error } = await supabase.from('users').insert([{ email, wallet }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ data });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
