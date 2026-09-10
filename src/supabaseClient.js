import { createClient } from '@supabase/supabase-js';

// Leer variables de entorno (Vite)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://tu-proyecto.supabase.co'
);

if (isSupabaseConfigured) {
  console.log('⚡ Supabase configurado y listo en:', supabaseUrl);
} else {
  console.warn('⚠️ Supabase no configurado aún o faltan llaves en .env');
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
