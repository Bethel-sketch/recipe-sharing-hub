// src/pages/api/recipes/[id].js
import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ success: true });
  }

  // If someone tries a non-DELETE method:
  res.setHeader('Allow', ['DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
