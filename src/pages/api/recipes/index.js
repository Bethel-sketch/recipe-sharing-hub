// src/pages/api/recipes/index.js
import { supabase } from '../../../lib/supabaseClient'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error('Supabase GET error:', error)
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json(data)
  }

  if (req.method === 'POST') {
    const { title, ingredients, instructions, image_url, author } = req.body

    const { data, error } = await supabase
      .from('recipes')
      .insert({ title, ingredients, instructions, image_url, author })

    if (error) {
      console.error('Supabase INSERT error:', error)
      return res.status(500).json({ error: error.message })
    }

    return res.status(201).json(data[0])
  }

  // only GET and POST allowed
  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
