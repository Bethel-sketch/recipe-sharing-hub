// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// these two *MUST* match what you set in .env.local (without the PUBLIC prefix)
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
