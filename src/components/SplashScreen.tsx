import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const SplashScreen: React.FC<{
  onFinish: () => void;
}> = ({
  onFinish
}) => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // User already logged in, proceed to main app
        setTimeout(() => onFinish(), 1500);
      } else {
        // Show login form after logo animation
        setTimeout(() => setShowForm(true), 1500);
      }
    });
  }, [onFinish]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone) {
      toast({
        title: "Missing information",
        description: "Please provide both your name and phone number",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Normalize phone number - ensure it has country code for India
      let normalizedPhone = phone;
      if (!phone.startsWith('+')) {
        if (phone.startsWith('0')) {
          normalizedPhone = `+91${phone.substring(1)}`;
        } else if (phone.length === 10) {
          normalizedPhone = `+91${phone}`;
        } else {
          normalizedPhone = `+${phone}`;
        }
      }
      
      // Generate a random 6-digit password
      const password = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Create a valid email using a cleaned version of the phone number
      // Remove all non-alphanumeric characters
      const cleanedPhone = normalizedPhone.replace(/[^0-9]/g, '');
      const emailAddress = `user_${cleanedPhone}@hacha.guest`;
      
      // First check if user exists by this email
      const { data: userSignIn, error: signInError } = await supabase.auth.signInWithPassword({
        email: emailAddress,
        password: password,
      }).catch(() => ({ data: null, error: { message: "Login failed" } }));
      
      if (userSignIn?.user) {
        // User exists and password matches, we're good to go
        toast({
          title: "Welcome back!",
          description: "Login successful",
        });
        
        // Update user's profile if their name has changed
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ 
            full_name: name 
          })
          .eq('id', userSignIn.user.id);
          
        if (updateError) {
          console.error('Error updating profile:', updateError);
        }
        
        onFinish();
        return;
      }
      
      // Create new user
      const { error: signUpError, data } = await supabase.auth.signUp({
        email: emailAddress,
        password: password,
        options: {
          data: {
            full_name: name
          }
        }
      });
      
      if (signUpError) throw signUpError;
      
      // Update profile with phone number
      if (data?.user) {
        // SQL update that matches the structure of the profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            full_name: name,
            phone: normalizedPhone
          })
          .eq('id', data.user.id);
          
        if (profileError) {
          console.error('Error updating profile with phone:', profileError);
          // Proceed anyway, as this is just additional data
        }
      }
      
      toast({
        title: "Welcome to Hacha!",
        description: "Login successful",
      });
      
      onFinish();
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-airbnb-gold dark:bg-airbnb-darkbrown flex flex-col items-center justify-center" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <img 
          src="/lovable-uploads/6a7081ed-4360-446d-88ca-eed6d851e169.png" 
          alt="Ha Cha Logo" 
          className="max-w-[250px] mb-4" 
        />
        
        <motion.p 
          className="text-white text-lg" 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Exquisite Restaurant Experience
        </motion.p>
        
        {showForm && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 w-full max-w-xs"
          >
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-white/90 border-none text-black placeholder:text-gray-500"
                  />
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="Phone Number (e.g. 9XXXXXXXXX)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 bg-white/90 border-none text-black placeholder:text-gray-500"
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-airbnb-red hover:bg-airbnb-red/90 text-white" 
                disabled={loading}
              >
                {loading ? "Logging in..." : "Continue"}
              </Button>
              
              <p className="text-xs text-center text-white/80 mt-2">
                By continuing, you agree to our Terms and Privacy Policy
              </p>
            </form>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
