// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ftuoqdqnsavtnnqyfvbf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0dW9xZHFuc2F2dG5ucXlmdmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MTEyMTcsImV4cCI6MjA2MDM4NzIxN30.7bx-KGAb7pPIXmHz9y3zMDgvehZ7knuoQ7ZjGsDkuKI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
