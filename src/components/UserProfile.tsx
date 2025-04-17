
import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { User, Phone, Mail, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface UserProfileProps {
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const { profile, isAdmin } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Sign Out Failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out",
      });
      onClose();
    }
  };

  // Get initials for avatar fallback
  const getInitials = () => {
    if (!profile?.full_name) return "G";
    
    return profile.full_name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  if (!profile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>You're not logged in</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full border rounded-lg shadow-lg">
      <CardHeader className="text-center pb-2">
        <div className="flex justify-center mb-2">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.avatar_url || ""} alt={profile.full_name || "User"} />
            <AvatarFallback className="bg-airbnb-gold text-white text-xl">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-xl">{profile.full_name}</CardTitle>
        {isAdmin && (
          <div className="flex justify-center mt-1">
            <span className="bg-airbnb-gold text-white text-xs px-2 py-1 rounded-full flex items-center">
              <Shield className="h-3 w-3 mr-1" /> Admin
            </span>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4 pt-2">
        <Separator />
        
        <div className="space-y-3">
          {profile.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-airbnb-gold" />
              <span className="text-sm">{profile.phone}</span>
            </div>
          )}
          
          {profile.email && profile.email.indexOf('@hacha.guest') === -1 && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-airbnb-gold" />
              <span className="text-sm">{profile.email}</span>
            </div>
          )}
          
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2 text-airbnb-gold" />
            <span className="text-sm">Member since {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="outline" 
          onClick={handleSignOut} 
          className="w-full border border-airbnb-red text-airbnb-red hover:bg-airbnb-red hover:text-white"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
