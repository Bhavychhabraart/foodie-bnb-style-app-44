
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Calendar, Users, MessageSquare, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const BookingRequest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  
  const handleSubmit = () => {
    toast({
      title: 'Booking request submitted',
      description: 'The host will respond to your request shortly.',
    });
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="container-padding border-b border-gray-200">
        <div className="py-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-4"
            onClick={() => navigate('/detail')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-medium">Request to book</h1>
        </div>
      </div>
      
      <div className="container-padding py-6 border-b border-gray-200 bg-white">
        <div className="flex gap-4">
          <img 
            src="public/lovable-uploads/895f39d4-3d63-4455-8bf4-cbc017f47516.png" 
            alt="Room" 
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div>
            <h2 className="font-medium">Connect with your heart in this magical place</h2>
            <p className="text-sm text-airbnb-light">Room in villa</p>
            <div className="flex items-center text-sm mt-1">
              <Star className="h-4 w-4 fill-current text-airbnb-dark" />
              <span className="ml-1">4.86(468)</span>
              <span className="mx-1">·</span>
              <span className="text-airbnb-dark">Superhost</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-padding py-6 border-b border-gray-200 bg-white">
        <div className="flex items-center mb-2">
          <Calendar className="h-6 w-6 text-airbnb-dark mr-4" />
          <h2 className="text-lg font-medium">Free cancellation before 18 Jun.</h2>
        </div>
        <p className="text-airbnb-light">Get a full refund if you change your mind.</p>
      </div>
      
      <div className="container-padding py-6 border-b border-gray-200 bg-white">
        <h2 className="text-xl font-medium mb-4">Your trip</h2>
        
        <div className="flex justify-between mb-4 items-center">
          <div>
            <h3 className="font-medium">Dates</h3>
            <p className="text-airbnb-dark">23–28 Jun</p>
          </div>
          <button className="text-airbnb-dark underline font-medium">Edit</button>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-airbnb-dark mr-2" />
            <div>
              <h3 className="font-medium">Guests</h3>
              <p className="text-airbnb-dark">1 guest</p>
            </div>
          </div>
          <button className="text-airbnb-dark underline font-medium">Edit</button>
        </div>
      </div>
      
      <div className="container-padding py-6 border-b border-gray-200 bg-white">
        <h2 className="text-xl font-medium mb-4">Your total</h2>
        
        <div className="flex justify-between mb-3">
          <span className="underline">₹7,039.72 x 5 nights</span>
          <span>₹35,198.60</span>
        </div>
        
        <div className="flex justify-between font-medium pt-4 border-t border-gray-200">
          <span>Total (INR)</span>
          <span>₹35,198.60</span>
        </div>
        
        <button className="text-airbnb-dark underline font-medium mt-4 block">Price breakdown</button>
      </div>
      
      <div className="container-padding py-6 bg-white">
        <div className="flex items-center mb-4">
          <MessageSquare className="h-6 w-6 text-airbnb-dark mr-4" />
          <h2 className="text-xl font-medium">Write a message to the host</h2>
        </div>
        <p className="text-airbnb-light mb-4">Before you can continue, let Joel know a little about your trip and why their place is a good fit.</p>
        <Textarea 
          placeholder="Hi Joel, we're looking forward to..." 
          className="min-h-[120px] mb-4" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      
      <div className="container-padding py-6 bg-white border-t border-gray-200">
        <div className="flex items-center mb-4">
          <CreditCard className="h-6 w-6 text-airbnb-dark mr-4" />
          <h2 className="text-xl font-medium">Payment method</h2>
        </div>
        <Button 
          variant="outline" 
          className="w-full py-6 justify-start border border-gray-300 rounded-xl mb-4"
        >
          Add payment method
        </Button>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <Button 
          className="w-full airbnb-button" 
          onClick={handleSubmit}
        >
          Request to book
        </Button>
      </div>
    </div>
  );
};

export default BookingRequest;
