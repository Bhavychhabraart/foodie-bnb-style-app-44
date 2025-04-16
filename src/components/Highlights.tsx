
import React from 'react';
import { Award, Clock, Utensils, Wine } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { motion } from 'framer-motion';

const highlights = [
  {
    id: 1,
    title: "Award-Winning Chefs",
    description: "Our culinary team has been recognized with prestigious awards for their innovative approach.",
    icon: Award
  }, 
  {
    id: 2,
    title: "Farm to Table",
    description: "We source the freshest ingredients from local farms for an authentic dining experience.",
    icon: Utensils
  }, 
  {
    id: 3,
    title: "Premium Wine Selection",
    description: "Our sommelier curates a world-class collection of wines from the finest vineyards.",
    icon: Wine
  }, 
  {
    id: 4,
    title: "Exclusive Dining Hours",
    description: "We offer special dining hours for intimate gatherings and private celebrations.",
    icon: Clock
  }
];

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

const Highlights: React.FC = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-airbnb-cream/10 to-airbnb-cream/5 dark:from-airbnb-darkbrown dark:to-airbnb-darkbrown/80">
      <div className="container-padding mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="text-airbnb-gold text-sm tracking-wider uppercase">Why Choose Us</span>
          <h2 className="text-3xl font-semibold mt-2 mb-3 text-airbnb-darkbrown dark:text-airbnb-cream">
            Our Highlights
          </h2>
          <div className="w-24 h-0.5 bg-airbnb-gold/60 mx-auto"></div>
        </motion.div>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4" as={motion.div} variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {highlights.map(highlight => (
              <CarouselItem key={highlight.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div variants={item} transition={{ duration: 0.3 }}>
                  <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white/80 dark:bg-airbnb-darkbrown/90 backdrop-blur-sm group">
                    <CardContent className="p-8 flex flex-col items-center text-center relative">
                      <div className="absolute -right-12 -top-12 w-40 h-40 bg-airbnb-gold/5 rounded-full group-hover:scale-100 scale-75 transition-transform duration-500"></div>
                      
                      <motion.div 
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-airbnb-gold/30 to-airbnb-gold/10 flex items-center justify-center mb-5 relative z-10 group-hover:scale-110 transition-transform"
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
                      >
                        <highlight.icon className="w-8 h-8 text-airbnb-gold" />
                      </motion.div>
                      
                      <h3 className="font-medium text-lg mb-3 text-airbnb-darkbrown dark:text-airbnb-beige group-hover:text-airbnb-gold transition-colors">
                        {highlight.title}
                      </h3>
                      
                      <p className="text-airbnb-darkbrown/80 dark:text-airbnb-beige/80 text-sm">
                        {highlight.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="mt-6" />
        </Carousel>
      </div>
    </div>
  );
};

export default Highlights;
