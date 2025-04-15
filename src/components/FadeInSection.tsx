
import React, { useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ 
  children, 
  className = "",
  delay = 0,
  direction = 'up'
}) => {
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

  const getDirectionVariants = (): Variants => {
    switch (direction) {
      case 'up':
        return {
          hidden: { y: 50, opacity: 0 },
          visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
              duration: 0.6, 
              ease: "easeOut",
              delay: delay
            }
          }
        };
      case 'down':
        return {
          hidden: { y: -50, opacity: 0 },
          visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
              duration: 0.6, 
              ease: "easeOut",
              delay: delay
            }
          }
        };
      case 'left':
        return {
          hidden: { x: 50, opacity: 0 },
          visible: { 
            x: 0, 
            opacity: 1,
            transition: { 
              duration: 0.6, 
              ease: "easeOut",
              delay: delay
            }
          }
        };
      case 'right':
        return {
          hidden: { x: -50, opacity: 0 },
          visible: { 
            x: 0, 
            opacity: 1,
            transition: { 
              duration: 0.6, 
              ease: "easeOut",
              delay: delay
            }
          }
        };
      case 'none':
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { 
              duration: 0.6, 
              ease: "easeOut",
              delay: delay
            }
          }
        };
      default:
        return {
          hidden: { y: 50, opacity: 0 },
          visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
              duration: 0.6, 
              ease: "easeOut",
              delay: delay
            }
          }
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={getDirectionVariants()}
      initial="hidden"
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
