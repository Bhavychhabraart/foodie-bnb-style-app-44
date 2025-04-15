import React from 'react';
import { Award, Clock, Sparkles, Utensils } from 'lucide-react';
const About: React.FC = () => {
  return <div id="about" className="section-padding">
      <div className="container-padding mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">About Fine Dine</h2>
            <p className="text-airbnb-light mb-4">
              Fine Dine is an exquisite culinary destination nestled in the heart of Manhattan. 
              Our restaurant brings together the finest ingredients, masterful techniques, and 
              elegant ambiance to create an unforgettable dining experience.
            </p>
            
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Award className="h-5 w-5 text-airbnb-red mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm">Award Winning</h3>
                  <p className="text-airbnb-light text-sm">Michelin Star 2022-2024</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Utensils className="h-5 w-5 text-airbnb-red mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm">Cuisine</h3>
                  <p className="text-airbnb-light text-sm">Contemporary American</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-airbnb-red mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm">Hours</h3>
                  <p className="text-airbnb-light text-sm">5:00 PM - 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Sparkles className="h-5 w-5 text-airbnb-red mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm">Special</h3>
                  <p className="text-airbnb-light text-sm">Seasonal Tasting Menu</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-64 md:h-auto">
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" alt="Chef preparing food" className="w-full h-full object-cover rounded-xl" />
          </div>
        </div>
      </div>
    </div>;
};
export default About;