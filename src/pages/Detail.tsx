
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share, Heart, Star, Medal, House, Map } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Detail = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div className="pb-16">
      <div className="relative h-[50vh]">
        <img 
          src="public/lovable-uploads/895f39d4-3d63-4455-8bf4-cbc017f47516.png" 
          alt="Room view" 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute top-4 left-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="absolute top-4 right-4 flex space-x-3">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white"
          >
            <Share className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-airbnb-red text-airbnb-red' : ''}`} />
          </Button>
        </div>
        
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm">
          1/35
        </div>
      </div>
      
      <div className="container-padding">
        <h1 className="text-2xl font-semibold mt-4">Connect with your heart in this magical place</h1>
        <p className="text-airbnb-dark mt-1">Room in Santa Cruz de Tenerife, Spain</p>
        <p className="text-airbnb-dark mt-1">2 queen beds · Shared bathroom</p>
        
        <div className="flex items-center mt-2">
          <Star className="h-4 w-4 fill-current text-airbnb-dark" />
          <span className="ml-1 font-medium">4.86</span>
          <span className="mx-1">·</span>
          <span className="underline">468 reviews</span>
        </div>
        
        <div className="detail-section">
          <div className="detail-host">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Host" 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium">Hosted by Joel</h3>
              <p className="text-airbnb-light text-sm">Superhost · 6 years hosting</p>
            </div>
          </div>
        </div>
        
        <div className="detail-section">
          <div className="detail-amenity">
            <House className="w-6 h-6 text-airbnb-dark" />
            <div>
              <h3 className="font-medium">Room in a villa</h3>
              <p className="text-airbnb-light text-sm mt-1">Your own room in a home, plus access to shared spaces.</p>
            </div>
          </div>
          
          <div className="detail-amenity">
            <Medal className="w-6 h-6 text-airbnb-dark" />
            <div>
              <h3 className="font-medium">Joel is a Superhost</h3>
              <p className="text-airbnb-light text-sm mt-1">Superhosts are experienced, highly rated hosts.</p>
            </div>
          </div>
          
          <div className="detail-amenity">
            <Map className="w-6 h-6 text-airbnb-dark" />
            <div>
              <h3 className="font-medium">10-min drive to Teide National Park</h3>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-semibold">₹35,198</span>
              <span className="text-airbnb-dark"> for 5 nights</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-current text-airbnb-dark" />
              <span className="ml-1">4.86 · 468 reviews</span>
            </div>
          </div>
          
          <Button className="w-full airbnb-button mt-4">
            Reserve
          </Button>
          
          <p className="text-center text-sm text-airbnb-light mt-2">You won't be charged yet</p>
          
          <div className="mt-4 border-t border-b border-gray-200 py-4">
            <div className="flex justify-between mb-2">
              <span className="underline">₹7,039.72 x 5 nights</span>
              <span>₹35,198.60</span>
            </div>
            <div className="flex justify-between font-semibold pt-4 border-t border-gray-200">
              <span>Total (INR)</span>
              <span>₹35,198.60</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button className="w-full airbnb-button">
          Reserve
        </Button>
      </div>
    </div>
  );
};

export default Detail;
