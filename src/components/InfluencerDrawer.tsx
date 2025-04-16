
import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Instagram, Check } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface InfluencerDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const InfluencerDrawer: React.FC<InfluencerDrawerProps> = ({ open, onOpenChange }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [followers, setFollowers] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone || !instagram || !followers) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Validate followers is a number
    const followersCount = parseInt(followers);
    if (isNaN(followersCount)) {
      toast({
        title: "Invalid follower count",
        description: "Please enter a valid number of followers.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save the collaboration request to Supabase
      const { error } = await supabase
        .from('instagram_collaborations')
        .insert({
          name,
          email,
          phone,
          instagram_handle: instagram,
          followers_count: followersCount,
          message: message || null,
          status: 'pending'
        });

      if (error) throw error;

      setIsSuccess(true);
      
      toast({
        title: "Request submitted!",
        description: "Your Instagram collaboration request has been submitted for review. We'll get back to you soon!",
      });

      // Reset form after 3 seconds and close drawer
      setTimeout(() => {
        resetForm();
        onOpenChange(false);
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting collaboration request:', error);
      toast({
        title: "Something went wrong",
        description: "We couldn't submit your request. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setInstagram('');
    setFollowers('');
    setMessage('');
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    setIsSuccess(false);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] bg-[#121212] border-airbnb-gold/20">
        <div className="max-h-[90vh] overflow-y-auto pb-safe">
          <div className="flex flex-col h-full bg-[#121212] text-white">
            <div className="flex items-center p-4 border-b border-airbnb-gold/20">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 text-white"
                onClick={handleClose}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-xl font-semibold">Instagram Collaboration</h2>
            </div>

            <ScrollArea className="flex-1">
              <div className="px-6 py-6">
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                      <Check className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Request Submitted!</h3>
                    <p className="text-center text-white/80 mb-6">
                      We've received your collaboration request and will review it shortly.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center mb-6">
                      <Instagram className="h-6 w-6 text-airbnb-gold mr-3" />
                      <div>
                        <DrawerTitle className="text-xl text-white">Partner with Us</DrawerTitle>
                        <DrawerDescription className="text-white/70">
                          Submit your details for Instagram collaborations
                        </DrawerDescription>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <Label htmlFor="name" className="text-white">Full Name</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-1.5 border-airbnb-gold/20 bg-[#1E1E1E] text-white"
                          placeholder="Your full name"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1.5 border-airbnb-gold/20 bg-[#1E1E1E] text-white"
                          placeholder="your@email.com"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-white">Phone Number</Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="mt-1.5 border-airbnb-gold/20 bg-[#1E1E1E] text-white"
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="instagram" className="text-white">Instagram Handle</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-[13px] text-white/50">@</span>
                          <Input
                            id="instagram"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            className="mt-1.5 pl-8 border-airbnb-gold/20 bg-[#1E1E1E] text-white"
                            placeholder="your_handle"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="followers" className="text-white">Follower Count</Label>
                        <Input
                          id="followers"
                          value={followers}
                          onChange={(e) => setFollowers(e.target.value)}
                          className="mt-1.5 border-airbnb-gold/20 bg-[#1E1E1E] text-white"
                          placeholder="e.g. 10000"
                          type="number"
                          min="100"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-white">Tell Us About Your Content (Optional)</Label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="mt-1.5 h-24 border-airbnb-gold/20 bg-[#1E1E1E] text-white"
                          placeholder="Share details about your content style, audience demographics, and why you'd like to collaborate with us..."
                        />
                      </div>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          className="w-full bg-airbnb-gold hover:bg-airbnb-gold/90 text-black"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit Request"}
                        </Button>
                      </div>

                      <p className="text-sm text-center text-white/60 mt-3">
                        We review all collaboration requests and will get back to you within 2-3 business days.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default InfluencerDrawer;
