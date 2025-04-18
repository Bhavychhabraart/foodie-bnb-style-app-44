
import React from 'react';
import { Calendar, Clock, User, Users, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingStepsProps {
  currentStep: number;
}

export const BookingSteps: React.FC<BookingStepsProps> = ({ currentStep }) => {
  const steps = [
    { icon: Calendar, label: "Date & Time" },
    { icon: User, label: "Contact Details" },
    { icon: Users, label: "Group & Table" },
  ];

  return (
    <div className="flex items-center w-full mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center">
            <div className={cn(
              "rounded-full w-10 h-10 flex items-center justify-center",
              currentStep === index + 1 
                ? "bg-airbnb-gold" 
                : currentStep > index + 1 
                  ? "bg-airbnb-gold/40" 
                  : "bg-airbnb-gold/20"
            )}>
              <step.icon className={cn(
                "h-5 w-5",
                currentStep === index + 1 
                  ? "text-airbnb-dark" 
                  : "text-airbnb-gold"
              )} />
            </div>
            <div className="text-xs text-airbnb-gold/60 mt-1 absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              {step.label}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={cn(
              "h-0.5 flex-1 mx-2",
              currentStep > index + 1 ? "bg-airbnb-gold" : "bg-airbnb-gold/20"
            )} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

