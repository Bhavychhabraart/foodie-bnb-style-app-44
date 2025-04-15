
import React from 'react';
import ExperienceCard from './ExperienceCard';

interface ExperiencesProps {
  category: string;
}

// Define a consistent interface for all experience objects
interface Experience {
  imageUrl: string;
  title: string;
  host: string;
  price: string;
  rating?: number;
  reviews?: number;
  isSoldOut?: boolean;
}

const Experiences: React.FC<ExperiencesProps> = ({ category }) => {
  const experiencesByCategory: Record<string, Experience[]> = {
    menu: [
      {
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        title: "Fine Dine Restaurant Experience",
        host: "Chef Marcus",
        price: "₹2,500 per person",
        rating: 4.92,
        reviews: 286,
        isSoldOut: false
      },
      {
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
        imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        title: "Train for Gladiator II glory",
        host: "Lucius",
        price: "₹7,039 per night",
        isSoldOut: true
      },
      {
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
        imageUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        title: "25% Off Weekend Brunch",
        host: "Fine Dine",
        price: "Valid until May 31",
        rating: 4.96,
        reviews: 352,
        isSoldOut: false
      },
      {
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
        imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        title: "Welcome to Fine Dine",
        host: "Your culinary journey starts here",
        price: "Book your table now",
        rating: 4.88,
        reviews: 176,
        isSoldOut: false
      }
    ]
  };

  // Default to showing all experiences if category doesn't match or is not found
  const experiencesToShow = experiencesByCategory[category as keyof typeof experiencesByCategory] || 
    Object.values(experiencesByCategory).flat();

  return (
    <div className="container-padding mx-auto pb-20">
      {category === 'experiences' && (
        <h2 className="text-2xl font-semibold mb-4">Past experiences</h2>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiencesToShow.map((experience, index) => (
          <ExperienceCard
            key={index}
            imageUrl={experience.imageUrl}
            title={experience.title}
            host={experience.host}
            price={experience.price}
            rating={experience.rating}
            reviews={experience.reviews}
            isSoldOut={experience.isSoldOut}
          />
        ))}
      </div>
    </div>
  );
};

export default Experiences;
