// src/pages/api/recipes/count.js
console.log('🔑 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('🔑 Supabase Key starts with:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 10))

import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // We only need the count, so use head:true and count:'exact'
  const { count, error } = await supabase
    .from('recipes')
    .select('*', { count: 'exact', head: true });

  if (error) {
    return res.status(500).json({ error });
  }

  return res.status(200).json({ count });
}
