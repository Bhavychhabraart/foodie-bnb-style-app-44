
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface Venue {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  status: string;
}

interface UserProfile {
  avatar_url: string;
  created_at: string;
  email: string;
  full_name: string;
  id: string;
  is_admin: boolean;
  is_super_admin: boolean;
  updated_at: string;
  phone?: string;
  current_venue_id?: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  userProfile?: UserProfile | null;
  currentVenue: Venue | null;
  userVenues: Venue[];
  setCurrentVenueById: (venueId: string | null) => Promise<void>;
  setCurrentVenueBySlug: (slug: string | null) => Promise<void>;
  refreshUserVenues: () => Promise<void>;
  refreshCurrentVenue: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  isAdmin: false,
  isSuperAdmin: false,
  userProfile: null,
  currentVenue: null,
  userVenues: [],
  setCurrentVenueById: async () => {},
  setCurrentVenueBySlug: async () => {},
  refreshUserVenues: async () => {},
  refreshCurrentVenue: async () => {},
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
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentVenue, setCurrentVenue] = useState<Venue | null>(null);
  const [userVenues, setUserVenues] = useState<Venue[]>([]);

  const refreshUserProfile = async (userId: string) => {
    if (!userId) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin, is_super_admin, full_name, email, phone, avatar_url, created_at, updated_at, id, current_venue_id')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error checking user profile:', error);
        setIsAdmin(false);
        setIsSuperAdmin(false);
        return;
      }
      
      setIsAdmin(data?.is_admin || false);
      setIsSuperAdmin(data?.is_super_admin || false);
      setUserProfile(data as UserProfile);
      
      // If user has a current venue, fetch it
      if (data?.current_venue_id) {
        await refreshCurrentVenue();
      }
      
      // Fetch all venues owned by the user
      await refreshUserVenues();
    } catch (error) {
      console.error('Exception checking user profile:', error);
      setIsAdmin(false);
      setIsSuperAdmin(false);
    }
  };
  
  const refreshCurrentVenue = async () => {
    if (!userProfile?.current_venue_id) {
      setCurrentVenue(null);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('venues')
        .select('*')
        .eq('id', userProfile.current_venue_id)
        .single();
      
      if (error) {
        console.error('Error fetching current venue:', error);
        setCurrentVenue(null);
        return;
      }
      
      setCurrentVenue(data);
    } catch (error) {
      console.error('Exception fetching current venue:', error);
      setCurrentVenue(null);
    }
  };
  
  const refreshUserVenues = async () => {
    if (!user?.id) {
      setUserVenues([]);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('venues')
        .select('*')
        .eq('owner_id', user.id);
      
      if (error) {
        console.error('Error fetching user venues:', error);
        setUserVenues([]);
        return;
      }
      
      setUserVenues(data || []);
    } catch (error) {
      console.error('Exception fetching user venues:', error);
      setUserVenues([]);
    }
  };
  
  const setCurrentVenueById = async (venueId: string | null) => {
    if (!user?.id) return;
    
    try {
      // Update the user's current_venue_id
      await supabase
        .from('profiles')
        .update({ current_venue_id: venueId })
        .eq('id', user.id);
      
      // Update local state
      if (userProfile) {
        setUserProfile({
          ...userProfile,
          current_venue_id: venueId
        });
      }
      
      // Refresh the current venue
      await refreshCurrentVenue();
    } catch (error) {
      console.error('Error setting current venue:', error);
    }
  };
  
  const setCurrentVenueBySlug = async (slug: string | null) => {
    if (!user?.id || !slug) {
      return setCurrentVenueById(null);
    }
    
    try {
      // Find venue by slug
      const { data, error } = await supabase
        .from('venues')
        .select('id')
        .eq('slug', slug)
        .eq('owner_id', user.id)
        .single();
      
      if (error || !data) {
        console.error('Error finding venue by slug:', error);
        return;
      }
      
      // Set current venue by ID
      await setCurrentVenueById(data.id);
    } catch (error) {
      console.error('Exception setting current venue by slug:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check user profile when user changes
        if (session?.user) {
          await refreshUserProfile(session.user.id);
        } else {
          setIsAdmin(false);
          setIsSuperAdmin(false);
          setUserProfile(null);
          setCurrentVenue(null);
          setUserVenues([]);
        }
        
        setIsLoading(false);
      }
    );

    // Check for the current session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Check user profile for current session
      if (session?.user) {
        await refreshUserProfile(session.user.id);
      }
      
      setIsLoading(false);
    });

    // Clean up subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isLoading, 
      isAdmin, 
      isSuperAdmin,
      userProfile, 
      currentVenue,
      userVenues,
      setCurrentVenueById,
      setCurrentVenueBySlug,
      refreshUserVenues,
      refreshCurrentVenue
    }}>
      {children}
    </AuthContext.Provider>
  );
};
