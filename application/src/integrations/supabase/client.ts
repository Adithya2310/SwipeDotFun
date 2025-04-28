
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jnkdxqkzzxigavpcnwge.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impua2R4cWt6enhpZ2F2cGNud2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NTkwMjgsImV4cCI6MjA2MTQzNTAyOH0.M085-DRAMKBdM35MGCbSEbTAn2C8nwzgWLc4-juJ8PM";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
