
import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-airbnb-dark text-white py-10 mt-10">
      <div className="container-padding mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Fine Dine</h3>
            <p className="text-gray-300 text-sm mb-4">
              Exquisite restaurant experience in the heart of Manhattan, 
              offering world-class cuisine and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-airbnb-red transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-airbnb-red transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-airbnb-red transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Menu</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Reservations</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">Monday - Friday: 5pm - 11pm</li>
              <li className="text-gray-300 text-sm">Saturday: 4pm - 12am</li>
              <li className="text-gray-300 text-sm">Sunday: 4pm - 10pm</li>
              <li className="text-gray-300 text-sm">Happy Hour: 5pm - 7pm</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-gray-300 text-sm space-y-2">
              <p>123 Restaurant Lane</p>
              <p>Manhattan, New York</p>
              <p>Phone: (212) 555-1234</p>
              <p>Email: info@finedine.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Fine Dine Restaurant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
