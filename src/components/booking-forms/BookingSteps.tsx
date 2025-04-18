
import React from 'react';
import { Calendar, User, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingStepsProps {
  currentStep: number;
}

export const BookingSteps: React.FC<BookingStepsProps> = ({ currentStep }) => {
  const steps = [
    { icon: Calendar, label: "Date & Time" },
    { icon: User, label: "Contact Details" },
    { icon: MapPin, label: "Group & Table" },
  ];

  return (
    <div className="flex items-center justify-between relative w-full mb-4">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center justify-center relative z-10">
            <div className={cn(
              "rounded-full w-12 h-12 flex items-center justify-center",
              currentStep === index + 1 
                ? "bg-airbnb-gold" 
                : currentStep > index + 1 
                  ? "bg-airbnb-gold/70" 
                  : "bg-airbnb-gold/20"
            )}>
              <step.icon className={cn(
                "h-6 w-6",
                currentStep === index + 1 || currentStep > index + 1
                  ? "text-black" 
                  : "text-airbnb-gold/60"
              )} />
            </div>
            <div className={cn(
              "text-xs mt-2",
              currentStep === index + 1 
                ? "text-white font-medium" 
                : currentStep > index + 1 
                  ? "text-airbnb-gold/80" 
                  : "text-airbnb-gold/40"
            )}>
              {step.label}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={cn(
              "h-0.5 flex-1",
              currentStep > index + 1 ? "bg-airbnb-gold" : "bg-airbnb-gold/20"
            )} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
