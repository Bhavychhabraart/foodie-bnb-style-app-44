
import { supabase } from "@/integrations/supabase/client";

/**
 * Checks if the current authenticated user is an admin
 * @returns boolean indicating if user is an admin
 */
export const checkIfAdmin = async (): Promise<boolean> => {
  try {
    // Get the current user session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return false;
    }

    // Check if the user is in the admin_users table
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', session.user.id)
      .single();
      
    if (error || !data) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

/**
 * Gets the currently authenticated user's profile
 * @returns The user profile or null if not authenticated
 */
export const getCurrentUserProfile = async () => {
  try {
    // Get the current user session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return null;
    }

    // Get the user's profile
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
      
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

/**
 * Updates the current user's profile
 * @param profileData The profile data to update
 * @returns boolean indicating if update was successful
 */
export const updateUserProfile = async (profileData: {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
}): Promise<boolean> => {
  try {
    // Get the current user session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return false;
    }

    // Update the profile
    const { error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', session.user.id);
      
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};
