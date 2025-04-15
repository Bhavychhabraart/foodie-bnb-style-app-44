
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  text: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "March 2024",
    rating: 5,
    text: "Absolutely incredible dining experience! The truffle risotto was divine, and the service was impeccable. The ambiance makes it perfect for special occasions. Will definitely be back!"
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    date: "February 2024",
    rating: 4,
    text: "Great food and atmosphere. The beef tenderloin was cooked to perfection. Only giving 4 stars because we had to wait a bit for our table despite having a reservation. Still highly recommend."
  },
  {
    id: 3,
    name: "Emma Roberts",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    date: "January 2024",
    rating: 5,
    text: "Our anniversary dinner was spectacular! The tasting menu with wine pairings was worth every penny. The staff made us feel so special, and the chef even came out to wish us happy anniversary."
  },
  {
    id: 4,
    name: "David Williams",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    date: "December 2023",
    rating: 5,
    text: "One of the best dining experiences I've had in Manhattan. The dark chocolate soufflé is a must-try! Beautiful decor and great location. Make sure to request a window table for the best views."
  }
];

const Reviews: React.FC = () => {
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  return (
    <div id="reviews" className="section-padding">
      <div className="container-padding mx-auto">
        <div className="flex items-start justify-between flex-wrap mb-6">
          <h2 className="text-2xl font-semibold">Guest Reviews</h2>
          <div className="flex items-center mt-2 sm:mt-0">
            <div className="flex mr-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`h-4 w-4 ${star <= Math.round(averageRating) ? 'fill-current text-airbnb-red' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="font-medium">{averageRating.toFixed(1)}</span>
            <span className="mx-1 text-airbnb-light">·</span>
            <span className="text-airbnb-light">{reviews.length} reviews</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="p-6 border border-gray-100 rounded-xl">
              <div className="flex justify-between mb-4">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{review.name}</h3>
                    <p className="text-sm text-airbnb-light">{review.date}</p>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-4 w-4 ${star <= review.rating ? 'fill-current text-airbnb-red' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-airbnb-dark">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
