
import React, { useEffect } from 'react';
import { Award, Clock, Sparkles, Utensils } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const featureVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      id="about" 
      className="section-padding"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="container-padding mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={containerVariants}>
            <motion.h2 
              className="text-2xl font-semibold mb-4"
              variants={itemVariants}
            >
              About Fine Dine
            </motion.h2>
            
            <motion.p 
              className="text-airbnb-light mb-4"
              variants={itemVariants}
            >
              Fine Dine is an exquisite culinary destination nestled in the heart of Manhattan. 
              Our restaurant brings together the finest ingredients, masterful techniques, and 
              elegant ambiance to create an unforgettable dining experience.
            </motion.p>
            
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="flex items-start space-x-3"
                variants={featureVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <Award className="h-5 w-5 text-airbnb-red mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm">Award Winning</h3>
                  <p className="text-airbnb-light text-sm">Michelin Star 2022-2024</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-3"
                variants={featureVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <Utensils className="h-5 w-5 text-airbnb-red mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm">Cuisine</h3>
                  <p className="text-airbnb-light text-sm">Contemporary American</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-3"
                variants={featureVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <Clock className="h-5 w-5 text-airbnb-red mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm">Hours</h3>
                  <p className="text-airbnb-light text-sm">5:00 PM - 11:00 PM</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-3"
                variants={featureVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <Sparkles className="h-5 w-5 text-airbnb-red mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm">Special</h3>
                  <p className="text-airbnb-light text-sm">Seasonal Tasting Menu</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="h-64 md:h-auto overflow-hidden rounded-xl"
            variants={itemVariants}
          >
            <motion.img 
              src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" 
              alt="Chef preparing food" 
              className="w-full h-full object-cover rounded-xl" 
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
