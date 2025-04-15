
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 pt-12 pb-8">
      <div className="container-padding mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Fine Dine</h3>
            <p className="text-airbnb-light text-sm mb-4">
              An exquisite dining experience in the heart of Manhattan, featuring seasonal ingredients and expert craftsmanship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-airbnb-light hover:text-airbnb-red transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-airbnb-light hover:text-airbnb-red transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-airbnb-light hover:text-airbnb-red transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="text-airbnb-light hover:text-airbnb-red transition-colors">About</a></li>
              <li><a href="#menu" className="text-airbnb-light hover:text-airbnb-red transition-colors">Menu</a></li>
              <li><a href="#photos" className="text-airbnb-light hover:text-airbnb-red transition-colors">Photos</a></li>
              <li><a href="#reviews" className="text-airbnb-light hover:text-airbnb-red transition-colors">Reviews</a></li>
              <li><a href="#location" className="text-airbnb-light hover:text-airbnb-red transition-colors">Location</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Info</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-airbnb-light hover:text-airbnb-red transition-colors">Private Events</a></li>
              <li><a href="#" className="text-airbnb-light hover:text-airbnb-red transition-colors">Gift Cards</a></li>
              <li><a href="#" className="text-airbnb-light hover:text-airbnb-red transition-colors">Careers</a></li>
              <li><a href="#" className="text-airbnb-light hover:text-airbnb-red transition-colors">Press</a></li>
              <li><a href="#" className="text-airbnb-light hover:text-airbnb-red transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Policies</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-airbnb-light hover:text-airbnb-red transition-colors">Reservation Policy</a></li>
              <li><a href="#" className="text-airbnb-light hover:text-airbnb-red transition-colors">Cancellation Policy</a></li>
              <li><a href="#" className="text-airbnb-light hover:text-airbnb-red transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-airbnb-light hover:text-airbnb-red transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-airbnb-light text-sm">
            © {new Date().getFullYear()} Fine Dine Restaurant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
