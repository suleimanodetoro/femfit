import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';

// Placeholder for Supabase configuration - to be replaced with real values later
// For development, we'll use dummy values and mock functions
const supabaseUrl = 'https://example.supabase.co';
const supabaseAnonKey = 'your-anon-key';

// We'll create this later when you have actual Supabase credentials
// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     storage: AsyncStorage,
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false,
//   },
// });

// Mock authentication helpers for development
export const signUp = async (email: string, password: string) => {
  console.log('Mock signUp called with:', email);
  // Return mock data for development
  return { 
    data: { user: { id: 'mock-user-id', email } }, 
    error: null 
  };
};

export const signIn = async (email: string, password: string) => {
  console.log('Mock signIn called with:', email);
  // Return mock data for development
  return { 
    data: { user: { id: 'mock-user-id', email } }, 
    error: null 
  };
};

export const signOut = async () => {
  console.log('Mock signOut called');
  return { error: null };
};

export const getCurrentUser = async () => {
  console.log('Mock getCurrentUser called');
  return { 
    user: { id: 'mock-user-id', email: 'mock@example.com' }, 
    error: null 
  };
};