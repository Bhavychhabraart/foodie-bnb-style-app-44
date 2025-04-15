
import React from 'react';
import { Award, Clock, Utensils, Wine } from 'lucide-react';

const highlights = [
  {
    id: 1,
    title: "Award-Winning Chefs",
    description: "Our team of internationally recognized chefs create unforgettable culinary experiences",
    icon: Award
  },
  {
    id: 2,
    title: "Farm to Table",
    description: "We source the freshest ingredients directly from local farmers and producers",
    icon: Utensils
  },
  {
    id: 3,
    title: "Premium Wine Selection",
    description: "Curated collection of fine wines from around the world to complement your meal",
    icon: Wine
  },
  {
    id: 4,
    title: "Exclusive Dining Hours",
    description: "Open Wednesday to Sunday, 6PM - 11PM. Reservations recommended",
    icon: Clock
  }
];

const Highlights: React.FC = () => {
  return (
    <div className="section-padding bg-gray-50">
      <div className="container-padding mx-auto">
        <h2 className="text-2xl font-semibold mb-8 text-center">Highlights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight) => (
            <div key={highlight.id} className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <highlight.icon className="w-6 h-6 text-airbnb-red" />
              </div>
              <h3 className="font-medium text-lg mb-2">{highlight.title}</h3>
              <p className="text-airbnb-light text-sm">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Highlights;
