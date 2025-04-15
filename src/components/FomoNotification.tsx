
import React, { useEffect, useState } from 'react';
import { User, X } from 'lucide-react';

interface FomoNotificationProps {
  isVisible: boolean;
}

const FomoNotification: React.FC<FomoNotificationProps> = ({ isVisible }) => {
  const [show, setShow] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<{ name: string; message: string } | null>(null);

  const fomoMessages = [
    { name: "Priya", message: "just booked this experience 5 minutes ago" },
    { name: "Raj", message: "is looking at this experience right now" },
    { name: "Maya", message: "booked this for a group of 4 today" },
    { name: "Aryan", message: "and 8 others booked this week" },
    { name: "Ananya", message: "reserved for this weekend" }
  ];

  useEffect(() => {
    if (isVisible) {
      // Show first notification after 3 seconds
      const timer1 = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * fomoMessages.length);
        setCurrentMessage(fomoMessages[randomIndex]);
        setShow(true);
      }, 3000);

      // Hide after 8 seconds (5 seconds after showing)
      const timer2 = setTimeout(() => {
        setShow(false);
      }, 8000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setShow(false);
    }
  }, [isVisible]);

  if (!show || !currentMessage) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-6 md:bottom-6 md:w-72">
      <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200 animate-fade-in-up">
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setShow(false)}
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="flex items-center">
          <div className="bg-airbnb-red/10 p-2 rounded-full mr-3">
            <User className="h-5 w-5 text-airbnb-red" />
          </div>
          <div>
            <p className="font-medium text-sm">{currentMessage.name}</p>
            <p className="text-xs text-gray-600">{currentMessage.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FomoNotification;
