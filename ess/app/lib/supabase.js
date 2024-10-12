import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jpaayebgsiepvpkydjbh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwYWF5ZWJnc2llcHZwa3lkamJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2NjMyNzMsImV4cCI6MjA0NDIzOTI3M30.4DMr1__RqP70gN12OgWvr_p3xvUhDBS96k9AkRJReJQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
