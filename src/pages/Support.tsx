
import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState('support');
  
  // WhatsApp functionality
  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number
    const phoneNumber = "+12125551234";
    const message = "Hello, I would like to inquire about Fine Dine restaurant.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="section-padding bg-soft-gray">
          <div className="container-padding mx-auto">
            <h1 className="text-3xl font-semibold mb-8">Support & Venue Information</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Contact Card */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-airbnb-red" />
                    Contact Us
                  </CardTitle>
                  <CardDescription>Reach out to our friendly team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-airbnb-red mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-airbnb-light">+1 (212) 555-1234</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-5 w-5 text-airbnb-red mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-airbnb-light">support@finedine.com</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleWhatsAppClick} 
                    className="w-full bg-green-500 hover:bg-green-600"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp Us
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Location & Hours Card */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-airbnb-red" />
                    Location & Hours
                  </CardTitle>
                  <CardDescription>Find us and visit us</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-airbnb-red mt-1" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-airbnb-light">350 Fifth Avenue, 21st Floor</p>
                      <p className="text-airbnb-light">New York, NY 10118</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-airbnb-red mt-1" />
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-airbnb-light">Monday - Thursday: 5:00 PM - 10:00 PM</p>
                      <p className="text-airbnb-light">Friday - Saturday: 5:00 PM - 11:00 PM</p>
                      <p className="text-airbnb-light">Sunday: 5:00 PM - 9:00 PM</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => window.open('https://maps.google.com/?q=350+Fifth+Avenue+New+York+NY', '_blank')}
                    variant="outline" 
                    className="w-full"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    View on Map
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* FAQ Section */}
            <div className="bg-white rounded-xl p-6 shadow-md mb-10">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Do you accept reservations?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we accept reservations up to 30 days in advance. We recommend booking in advance, especially for weekends and holidays. You can make a reservation through our app or by calling us directly at +1 (212) 555-1234.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>What is your cancellation policy?</AccordionTrigger>
                  <AccordionContent>
                    Cancellations made at least 24 hours before your reservation time will not incur any charges. Late cancellations (less than 24 hours notice) or no-shows may incur a fee of $25 per person.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Do you accommodate dietary restrictions?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we're happy to accommodate various dietary restrictions including vegetarian, vegan, gluten-free, and allergies. Please inform us of any restrictions when making your reservation or speak with your server upon arrival.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Is there parking available?</AccordionTrigger>
                  <AccordionContent>
                    We don't have a dedicated parking lot, but there is street parking available in the area and several parking garages within a one-block radius. The closest parking garages are located on 33rd and 34th Streets.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>Do you have a dress code?</AccordionTrigger>
                  <AccordionContent>
                    We have a smart casual dress code. We ask that guests refrain from wearing athletic wear, beachwear, or overly casual attire such as shorts and flip-flops. Jackets are not required but are always appreciated.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            {/* Map Section */}
            <div className="h-80 rounded-xl overflow-hidden shadow-md">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095908316!2d-73.9840387842868!3d40.74844904375838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b30eac9f%3A0xaca8b55cc5c5910e!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1659528556306!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                title="Restaurant location"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <div className="h-16 md:hidden"></div> {/* Space for bottom nav on mobile */}
      <div className="md:hidden">
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default Support;
