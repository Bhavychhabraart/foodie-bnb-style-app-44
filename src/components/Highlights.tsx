import React from 'react';
import { Award, Clock, Utensils, Wine } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
const highlights = [{
  id: 1,
  title: "Award-Winning Chefs",
  description: "Our team of internationally recognized chefs create unforgettable culinary experiences",
  icon: Award
}, {
  id: 2,
  title: "Farm to Table",
  description: "We source the freshest ingredients directly from local farmers and producers",
  icon: Utensils
}, {
  id: 3,
  title: "Premium Wine Selection",
  description: "Curated collection of fine wines from around the world to complement your meal",
  icon: Wine
}, {
  id: 4,
  title: "Exclusive Dining Hours",
  description: "Open Wednesday to Sunday, 6PM - 11PM. Reservations recommended",
  icon: Clock
}];
const Highlights: React.FC = () => {
  return <div className="py-8 bg-white">
      <div className="container-padding mx-auto">
        <h2 className="text-2xl font-semibold mb-5 text-center">Highlights</h2>
        
        <div className="grid grid-cols-2 gap-4">
          {highlights.map(highlight => <Card key={highlight.id} className="border-none shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-4 flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <highlight.icon className="w-5 h-5 text-airbnb-red" />
                </div>
                <div>
                  <h3 className="font-medium text-base mb-1">{highlight.title}</h3>
                  
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </div>;
};
export default Highlights;