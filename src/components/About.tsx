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
              About Fine Dine
              <span className="absolute -bottom-2 left-0 w-1/3 h-0.5 bg-airbnb-gold"></span>
            </h2>
            
            <p className="text-airbnb-darkbrown/90 dark:text-airbnb-beige mb-6 leading-relaxed">
              Fine Dine is an exquisite culinary destination nestled in the heart of Manhattan. 
              Our restaurant brings together the finest ingredients, masterful techniques, and 
              elegant ambiance to create an unforgettable dining experience.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-8 bg-zinc-950">
              <motion.div whileHover={{
              y: -5
            }} transition={{
              type: "spring",
              stiffness: 300
            }} className="flex items-start space-x-3 p-4 dark:bg-airbnb-darkbrown/40 backdrop-blur-sm rounded-xl border border-white/30 dark:border-white/5 hover:shadow-md transition-all bg-zinc-900">
                <Award className="h-6 w-6 text-airbnb-gold mt-0.5" />
                <div>
                  <h3 className="font-medium text-airbnb-darkbrown dark:text-airbnb-cream">Award Winning</h3>
                  <p className="text-airbnb-darkbrown/70 dark:text-airbnb-beige/80 text-sm">Michelin Star 2022-2024</p>
                </div>
              </motion.div>
              
              <motion.div whileHover={{
              y: -5
            }} transition={{
              type: "spring",
              stiffness: 300
            }} className="flex items-start space-x-3 p-4 dark:bg-airbnb-darkbrown/40 backdrop-blur-sm rounded-xl border border-white/30 dark:border-white/5 hover:shadow-md transition-all bg-zinc-900">
                <Utensils className="h-6 w-6 text-airbnb-gold mt-0.5" />
                <div>
                  <h3 className="font-medium text-airbnb-darkbrown dark:text-airbnb-cream">Cuisine</h3>
                  <p className="text-airbnb-darkbrown/70 dark:text-airbnb-beige/80 text-sm">Contemporary American</p>
                </div>
              </motion.div>
              
              <motion.div whileHover={{
              y: -5
            }} transition={{
              type: "spring",
              stiffness: 300
            }} className="flex items-start space-x-3 p-4 dark:bg-airbnb-darkbrown/40 backdrop-blur-sm rounded-xl border border-white/30 dark:border-white/5 hover:shadow-md transition-all bg-zinc-800">
                <Clock className="h-6 w-6 text-airbnb-gold mt-0.5" />
                <div>
                  <h3 className="font-medium text-airbnb-darkbrown dark:text-airbnb-cream">Hours</h3>
                  <p className="text-airbnb-darkbrown/70 dark:text-airbnb-beige/80 text-sm">5:00 PM - 11:00 PM</p>
                </div>
              </motion.div>
              
              <motion.div whileHover={{
              y: -5
            }} transition={{
              type: "spring",
              stiffness: 300
            }} className="flex items-start space-x-3 p-4 dark:bg-airbnb-darkbrown/40 backdrop-blur-sm rounded-xl border border-white/30 dark:border-white/5 hover:shadow-md transition-all bg-zinc-800">
                <Sparkles className="h-6 w-6 text-airbnb-gold mt-0.5" />
                <div>
                  <h3 className="font-medium text-airbnb-darkbrown dark:text-airbnb-cream">Special</h3>
                  <p className="text-airbnb-darkbrown/70 dark:text-airbnb-beige/80 text-sm">Seasonal Tasting Menu</p>
                </div>
              </motion.div>
            </div>
            
            <motion.button className="mt-8 flex items-center text-airbnb-gold border border-airbnb-gold/30 px-6 py-3 rounded-full hover:bg-airbnb-gold/10 transition-colors group" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} transition={{
            type: "spring",
            stiffness: 400
          }}>
              <span className="mr-2 group-hover:mr-4 transition-all">Learn more about us</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
          
          <motion.div className="h-64 md:h-auto relative rounded-xl overflow-hidden shadow-xl" initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2,
          ease: "easeOut"
        }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-airbnb-gold/20 to-transparent z-10 mix-blend-overlay"></div>
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" alt="Chef preparing food" className="w-full h-full object-cover transition-transform duration-10000 hover:scale-110" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white/90 text-sm italic">Our executive chef preparing seasonal specialties</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>;
};
export default About;