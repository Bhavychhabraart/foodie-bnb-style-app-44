
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface UserProfile {
  avatar_url: string;
  created_at: string;
  email: string;
  full_name: string;
  id: string;
  is_admin: boolean;
  updated_at: string;
  phone?: string; // Added phone as optional field
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  userProfile?: UserProfile | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  isAdmin: false,
  userProfile: null,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const checkAdminStatus = async (userId: string) => {
    if (!userId) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin, full_name, email, phone') // Added phone to the selection
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        return;
      }
      
      setIsAdmin(data?.is_admin || false);
      setUserProfile(data as UserProfile);
    } catch (error) {
      console.error('Exception checking admin status:', error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check admin status when user changes
        if (session?.user) {
          await checkAdminStatus(session.user.id);
        } else {
          setIsAdmin(false);
          setUserProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Check for the current session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Check admin status for current session
      if (session?.user) {
        await checkAdminStatus(session.user.id);
      }
      
      setIsLoading(false);
    });

    // Clean up subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, isLoading, isAdmin, userProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
