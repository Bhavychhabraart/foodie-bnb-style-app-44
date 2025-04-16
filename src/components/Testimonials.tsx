
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

const testimonials = [{
  id: 1,
  name: "Sarah Johnson",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  date: "March 2025",
  rating: 5,
  text: "Absolutely incredible dining experience! The truffle risotto was divine, and the service was impeccable. The ambiance makes it perfect for special occasions."
}, {
  id: 2,
  name: "Michael Chen",
  avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  date: "February 2025",
  rating: 4,
  text: "Great food and atmosphere. The beef tenderloin was cooked to perfection. Only giving 4 stars because we had to wait a bit for our table despite having a reservation."
}, {
  id: 3,
  name: "Emma Roberts",
  avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  date: "January 2025",
  rating: 5,
  text: "Our anniversary dinner was spectacular! The tasting menu with wine pairings was worth every penny. The staff made us feel so special."
}];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Testimonials: React.FC = () => {
  return (
    <div className="section-padding bg-gradient-to-b from-airbnb-cream/5 to-airbnb-cream/10 dark:from-airbnb-darkbrown/80 dark:to-airbnb-darkbrown">
      <div className="container-padding mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="text-airbnb-gold text-sm tracking-wider uppercase">Testimonials</span>
          <h2 className="text-3xl font-semibold mt-2 mb-3 text-airbnb-darkbrown dark:text-airbnb-cream">
            What Our Guests Say
          </h2>
          <div className="w-24 h-0.5 bg-airbnb-gold/60 mx-auto"></div>
        </motion.div>
        
        <Carousel className="w-full">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map(testimonial => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div variants={item} transition={{ duration: 0.3 }}>
                    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                      <CardContent className="p-6 relative h-full">
                        <Quote className="absolute top-4 right-4 h-10 w-10 text-airbnb-gold/10 rotate-180" />
                        
                        <div className="flex items-center mb-4">
                          <div className="relative">
                            <Avatar className="h-14 w-14 ring-2 ring-airbnb-gold/20 ring-offset-2 ring-offset-background">
                              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                              <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span className="absolute -bottom-1 -right-1 bg-airbnb-gold text-white text-xs font-medium h-5 w-5 flex items-center justify-center rounded-full">"</span>
                          </div>
                          
                          <div className="ml-4">
                            <h3 className="font-medium text-airbnb-darkbrown dark:text-white">{testimonial.name}</h3>
                            <p className="text-sm text-airbnb-light/70 dark:text-airbnb-light/40">{testimonial.date}</p>
                          </div>
                        </div>
                        
                        <div className="flex mb-3">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star 
                              key={star} 
                              className={`h-4 w-4 ${star <= testimonial.rating ? 'fill-current text-airbnb-gold' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          <p className="text-airbnb-darkbrown/90 dark:text-zinc-100 relative z-10 italic leading-relaxed">
                            "{testimonial.text}"
                          </p>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </motion.div>
          <CarouselDots className="mt-6" />
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonials;
