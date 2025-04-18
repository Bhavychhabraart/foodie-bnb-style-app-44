
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from 'lucide-react';

const SliqueHero = () => {
  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1500673922987-e212871fec22"
          alt="Slique Venue"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-airbnb-dark" />
      </div>
      
      <div className="relative z-10 h-full container mx-auto px-4 flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Welcome to <span className="text-airbnb-gold">Slique</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
          Experience modern luxury dining in an atmosphere of understated elegance
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="bg-airbnb-gold hover:bg-airbnb-gold/90 text-black">
            <Calendar className="mr-2 h-5 w-5" />
            Reserve Now
          </Button>
          <Button size="lg" variant="outline" className="border-airbnb-gold text-airbnb-gold hover:bg-airbnb-gold/10">
            View Menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SliqueHero;
