import React from 'react';
import { Award, Clock, Sparkles, Utensils, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
const About: React.FC = () => {
  return <div id="about" className="section-padding bg-gradient-to-b from-airbnb-cream/10 to-airbnb-cream/5 dark:from-airbnb-darkbrown/50 dark:to-airbnb-darkbrown/30">
      <div className="container-padding mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          ease: "easeOut"
        }}>
            <h2 className="text-3xl font-semibold mb-6 text-airbnb-darkbrown dark:text-airbnb-cream relative inline-block">
              About Hacha
              <span className="absolute -bottom-2 left-0 w-1/3 h-0.5 bg-airbnb-gold"></span>
            </h2>
            
            <p className="text-airbnb-darkbrown/90 dark:text-airbnb-beige mb-6 leading-relaxed"> HACHA, the ultimate BYOB destination where aesthetics meet wild parties and culinary excellence!</p>
            
            
            
            
          </motion.div>
          
          
        </div>
      </div>
    </div>;
};
export default About;