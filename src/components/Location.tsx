
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Location: React.FC = () => {
  return (
    <div id="location" className="section-padding bg-airbnb-gray">
      <div className="container-padding mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Location & Contact</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 h-80 lg:h-auto">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095908316!2d-73.9840387842868!3d40.74844904375838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b30eac9f%3A0xaca8b55cc5c5910e!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1659528556306!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: '12px' }} 
              allowFullScreen 
              loading="lazy" 
              title="Restaurant location"
            ></iframe>
          </div>
          
          <div className="lg:col-span-2 flex flex-col space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <h3 className="font-medium text-lg mb-4">Restaurant Info</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-airbnb-red mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-airbnb-light">350 Fifth Avenue, 21st Floor</p>
                    <p className="text-airbnb-light">New York, NY 10118</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-airbnb-red mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-airbnb-light">+1 (212) 555-1234</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-airbnb-red mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-airbnb-light">reservations@finedine.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-airbnb-red mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Hours</p>
                    <p className="text-airbnb-light">Monday - Thursday: 5:00 PM - 10:00 PM</p>
                    <p className="text-airbnb-light">Friday - Saturday: 5:00 PM - 11:00 PM</p>
                    <p className="text-airbnb-light">Sunday: 5:00 PM - 9:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <h3 className="font-medium text-lg mb-4">Getting Here</h3>
              <p className="text-airbnb-light mb-3">
                We're conveniently located near the Empire State Building. The closest subway stations are 34th St-Herald Sq (B, D, F, M, N, Q, R, W) and 33rd St (4, 6).
              </p>
              <p className="text-airbnb-light">
                Limited street parking is available, or use nearby parking garages on 33rd and 34th Streets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
