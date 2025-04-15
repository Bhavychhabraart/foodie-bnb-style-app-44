
import React from 'react';
import EventCard from './EventCard';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { ChevronRight } from 'lucide-react';

interface EventsProps {
  category?: string;
}

// Define a consistent interface for all event objects
interface Event {
  id: number;
  imageUrl: string;
  title: string;
  host: string;
  price: string;
  rating?: number;
  reviews?: number;
  isSoldOut?: boolean;
  venue?: string;
  time?: string;
}

const eventsByCategory: Record<string, Event[]> = {
  menu: [{
    id: 1,
    imageUrl: "/lovable-uploads/caafafc9-9a89-4fff-9df5-dc55abecc5f5.png",
    title: "Soulful Sufi Night",
    host: "16th April",
    price: "Complimentary Dessert for Couples",
    rating: 4.92,
    reviews: 286,
    isSoldOut: false,
    venue: "Sector 52, Gurgaon",
    time: "05 PM Wed"
  }, {
    id: 2,
    imageUrl: "/lovable-uploads/929e6452-100b-4173-9f21-062e3e25d238.png",
    title: "Thursday Gin & Groove",
    host: "17th April",
    price: "Free drinks for the ladies",
    rating: 4.78,
    reviews: 124,
    isSoldOut: false,
    venue: "Sector 52, Gurgaon",
    time: "05 PM"
  }],
  experiences: [{
    id: 3,
    imageUrl: "/lovable-uploads/63b7aa0e-bd60-4379-aee7-3936cc89fff5.png",
    title: "Back to 90s Night",
    host: "18th April, Friday",
    price: "7:30 PM onwards",
    isSoldOut: false,
    venue: "Sector 49, Gurgaon",
    time: "7:30 PM"
  }, {
    id: 4,
    imageUrl: "/lovable-uploads/1b747850-74bd-4752-93b7-eeeab113b43a.png",
    title: "Corporate Night",
    host: "14th April, Monday",
    price: "7:30 PM - 4:00 AM",
    rating: 4.86,
    reviews: 468,
    isSoldOut: false,
    venue: "Sector 49, Gurgaon"
  }],
  offers: [{
    id: 5,
    imageUrl: "/lovable-uploads/1f8b3900-b741-4507-9b2f-47953f00f3bd.png",
    title: "Bollywood Night",
    host: "20th April, Sunday",
    price: "7:30 PM",
    rating: 4.96,
    reviews: 352,
    isSoldOut: false,
    venue: "Sector 49, Gurgaon"
  }, {
    id: 6,
    imageUrl: "/lovable-uploads/2876d9eb-45d5-4fb9-bac5-14a5d8624765.png",
    title: "Back to 90s",
    host: "18th April, Friday",
    price: "7:30 PM onwards",
    rating: 4.91,
    reviews: 208,
    isSoldOut: false,
    venue: "Sector 49, Gurgaon"
  }],
  home: [{
    id: 7,
    imageUrl: "/lovable-uploads/caafafc9-9a89-4fff-9df5-dc55abecc5f5.png",
    title: "Soulful Sufi Night",
    host: "16th April",
    price: "Complimentary Dessert for Couples",
    rating: 4.92,
    reviews: 48,
    time: "05 PM Wed",
    venue: "Sector 52, Gurgaon"
  }, {
    id: 8,
    imageUrl: "/lovable-uploads/929e6452-100b-4173-9f21-062e3e25d238.png",
    title: "Thursday Gin & Groove",
    host: "17th April",
    price: "Free drinks for the ladies",
    rating: 4.85,
    reviews: 32,
    time: "05 PM",
    venue: "Sector 52, Gurgaon"
  }, {
    id: 9,
    imageUrl: "/lovable-uploads/1f8b3900-b741-4507-9b2f-47953f00f3bd.png",
    title: "Bollywood Night",
    host: "20th April, Sunday",
    price: "7:30 PM",
    rating: 4.78,
    reviews: 28,
    venue: "Sector 49, Gurgaon"
  }]
};

const Events: React.FC<EventsProps> = ({
  category = 'home'
}) => {
  const eventsToShow = eventsByCategory[category] || eventsByCategory.home;
  
  return (
    <div className="section-padding bg-zinc-900">
      <div className="container-padding mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-2xl">
            {category === 'experiences' ? 'Past Events' : 'Events'}
          </h2>
          <button className="flex items-center text-amber-500 hover:underline text-xs text-left">
            <span className="mr-1">View all</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {eventsToShow.map(event => (
              <CarouselItem key={event.id} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
                <EventCard 
                  imageUrl={event.imageUrl} 
                  title={event.title} 
                  host={event.host} 
                  price={event.price} 
                  rating={event.rating} 
                  reviews={event.reviews} 
                  isSoldOut={event.isSoldOut}
                  venue={event.venue}
                  time={event.time} 
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

export default Events;
