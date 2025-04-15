
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingRequest = () => {
  const navigate = useNavigate();
  
  return (
    <div className="pb-24">
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
      
      <div className="container-padding py-6 border-b border-gray-200">
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
      
      <div className="container-padding py-6 border-b border-gray-200">
        <div className="flex items-center mb-2">
          <Calendar className="h-6 w-6 text-airbnb-dark mr-4" />
          <h2 className="text-lg font-medium">Free cancellation before 18 Jun.</h2>
        </div>
        <p className="text-airbnb-light">Get a full refund if you change your mind.</p>
      </div>
      
      <div className="container-padding py-6 border-b border-gray-200">
        <h2 className="text-xl font-medium mb-4">Your trip</h2>
        
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="font-medium">Dates</h3>
            <p className="text-airbnb-dark">23–28 Jun</p>
          </div>
          <button className="text-airbnb-dark underline font-medium">Edit</button>
        </div>
        
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">Guests</h3>
            <p className="text-airbnb-dark">1 guest</p>
          </div>
          <button className="text-airbnb-dark underline font-medium">Edit</button>
        </div>
      </div>
      
      <div className="container-padding py-6 border-b border-gray-200">
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
      
      <div className="container-padding py-6">
        <h2 className="text-xl font-medium mb-4">Write a message to the host</h2>
        <p className="text-airbnb-light">Before you can continue, let Joel know a little about your trip and why their place is a good fit.</p>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button className="w-full airbnb-button">
          Request to book
        </Button>
      </div>
    </div>
  );
};

export default BookingRequest;
