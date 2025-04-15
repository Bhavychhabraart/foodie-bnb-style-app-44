
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tag, Calendar, PercentIcon, ShoppingBag } from 'lucide-react';

const offers = [
  {
    id: 1,
    title: "Weekend Special",
    description: "25% off on all desserts every weekend",
    validUntil: "May 31, 2025",
    icon: PercentIcon,
    color: "bg-soft-orange"
  },
  {
    id: 2,
    title: "Seasonal Menu",
    description: "Try our limited spring specialties",
    validUntil: "June 15, 2025",
    icon: Calendar,
    color: "bg-soft-purple"
  },
  {
    id: 3,
    title: "Family Package",
    description: "Special menu for 4 with complimentary dessert",
    validUntil: "Ongoing",
    icon: ShoppingBag,
    color: "bg-soft-blue"
  },
  {
    id: 4,
    title: "Chef's Recommendation",
    description: "10% off on chef's special dishes",
    validUntil: "April 30, 2025",
    icon: Tag,
    color: "bg-soft-green"
  }
];

const OngoingOffers: React.FC = () => {
  return (
    <div className="py-8 bg-gray-50">
      <div className="container-padding mx-auto">
        <h2 className="text-2xl font-semibold mb-5 text-center">Ongoing Offers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offers.map(offer => (
            <Card key={offer.id} className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <CardContent className="p-4 flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-full ${offer.color} flex items-center justify-center flex-shrink-0`}>
                  <offer.icon className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">{offer.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{offer.description}</p>
                  <p className="text-xs text-gray-500">Valid until: {offer.validUntil}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OngoingOffers;
