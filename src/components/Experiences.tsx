
import React from 'react';
import ExperienceCard from './ExperienceCard';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { ChevronRight } from 'lucide-react';

interface ExperiencesProps {
  category?: string;
}

// Define a consistent interface for all experience objects
interface Experience {
  id: number;
  imageUrl: string;
  title: string;
  host: string;
  price: string;
  rating?: number;
  reviews?: number;
  isSoldOut?: boolean;
}

const experiencesByCategory: Record<string, Experience[]> = {
  menu: [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Fine Dine Restaurant Experience",
      host: "Chef Marcus",
      price: "₹2,500 per person",
      rating: 4.92,
      reviews: 286,
      isSoldOut: false
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Farm to Table Dinner",
      host: "Maria",
      price: "₹3,200 per person",
      rating: 4.78,
      reviews: 124,
      isSoldOut: false
    }
  ],
  experiences: [
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Train for Gladiator II glory",
      host: "Lucius",
      price: "₹7,039 per night",
      isSoldOut: true
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Connect with your heart in this magical place",
      host: "Joel",
      price: "₹35,198 for 5 nights",
      rating: 4.86,
      reviews: 468,
      isSoldOut: false
    }
  ],
  offers: [
    {
      id: 5,
      imageUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "25% Off Weekend Brunch",
      host: "Fine Dine",
      price: "Valid until May 31",
      rating: 4.96,
      reviews: 352,
      isSoldOut: false
    },
    {
      id: 6,
      imageUrl: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Chef's Special Tasting Menu",
      host: "Chef Alessandro",
      price: "₹6,000 per person",
      rating: 4.91,
      reviews: 208,
      isSoldOut: false
    }
  ],
  home: [
    {
      id: 7,
      imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Farm to Table Dinner",
      host: "May 25, 2025",
      price: "₹3,200 per person",
      rating: 4.92,
      reviews: 48,
    },
    {
      id: 8,
      imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Wine Tasting Evening",
      host: "June 3, 2025",
      price: "₹1,800 per person",
      rating: 4.85,
      reviews: 32,
    },
    {
      id: 9,
      imageUrl: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80",
      title: "Pasta Making Class",
      host: "June 12, 2025",
      price: "₹2,500 per person",
      rating: 4.78,
      reviews: 28,
    }
  ]
};

const Experiences: React.FC<ExperiencesProps> = ({ category = 'home' }) => {
  const experiencesToShow = experiencesByCategory[category] || experiencesByCategory.home;
  
  return (
    <div className="section-padding">
      <div className="container-padding mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-2xl">
            {category === 'experiences' ? 'Past Experiences' : 'Experiences'}
          </h2>
          <button className="flex items-center text-airbnb-red hover:underline text-xs text-left">
            <span className="mr-1">View all</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {experiencesToShow.map(experience => (
              <CarouselItem key={experience.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <ExperienceCard
                  imageUrl={experience.imageUrl}
                  title={experience.title}
                  host={experience.host}
                  price={experience.price}
                  rating={experience.rating}
                  reviews={experience.reviews}
                  isSoldOut={experience.isSoldOut}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="mt-4" />
        </Carousel>
      </div>
    </div>
  );
};

export default Experiences;
