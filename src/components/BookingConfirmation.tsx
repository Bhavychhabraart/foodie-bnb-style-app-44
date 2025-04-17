import React, { useState } from 'react';
import { Check, PartyPopper, Send, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { QRCodeSVG } from 'qrcode.react';

interface BookingConfirmationProps {
  experienceTitle: string;
  date: string;
  time: string;
  guests: string;
  onClose: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  experienceTitle,
  date,
  time,
  guests,
  onClose
}) => {
  const [showWhatsAppCard, setShowWhatsAppCard] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  
  const bookingDetails = {
    experience: experienceTitle,
    date: date,
    time: time,
    guests: guests
  };
  
  const bookingDetailsQR = JSON.stringify(bookingDetails);
  
  const handleWhatsAppShare = () => {
    const message = `Booking Confirmed!\n\n${experienceTitle}\nDate: ${date}\nTime: ${time}\nGuests: ${guests} ${parseInt(guests) === 1 ? 'person' : 'people'}`;
    
    const phoneNumber = "919220829369";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const openWhatsAppCard = () => {
    setShowWhatsAppCard(true);
  };

  const closeWhatsAppCard = () => {
    setShowWhatsAppCard(false);
  };
  
  const downloadQRCode = () => {
    const canvas = document.getElementById('booking-qr-code') as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `${experienceTitle.replace(/\s+/g, '_')}_booking_qrcode.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6"
      >
        <Check className="w-10 h-10 text-white" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
        
        <div className="mb-6">
          <p className="text-lg mb-1">Thank you for your reservation</p>
          <p className="text-sm text-gray-500">A confirmation has been sent to your email</p>
        </div>
        
        <div className="bg-zinc-900 rounded-lg p-4 mb-6 border border-airbnb-gold/20 shadow-lg">
          <h3 className="font-medium mb-2 text-white">{experienceTitle}</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-400">Date:</div>
            <div className="text-white">{date}</div>
            <div className="text-gray-400">Time:</div>
            <div className="text-white">{time}</div>
            <div className="text-gray-400">Guests:</div>
            <div className="text-white">{guests} {parseInt(guests) === 1 ? 'person' : 'people'}</div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              position: "absolute",
              top: "40%",
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              backgroundColor: ['#FFD700', '#FF6347', '#00CED1', '#9370DB', '#3CB371'][
                Math.floor(Math.random() * 5)
              ],
              transform: 'rotate(0deg)',
              opacity: 1,
            }}
            animate={{
              top: `${Math.random() * 50 + 100}%`,
              rotate: `${Math.random() * 360}deg`,
              opacity: 0,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              ease: "easeOut",
              delay: Math.random() * 0.5,
            }}
          />
        ))}
      </motion.div>
      
      <div className="flex flex-col gap-3 mt-4 w-full sm:flex-row sm:justify-center">
        <Button 
          onClick={() => setShowQrCode(true)} 
          className="bg-airbnb-gold hover:bg-airbnb-gold/90 text-white"
        >
          View QR Ticket
        </Button>
        
        <Button 
          onClick={openWhatsAppCard} 
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Send className="mr-2 h-4 w-4" />
          Send on WhatsApp
        </Button>
        
        <Button 
          onClick={onClose} 
          className="bg-airbnb-red hover:bg-airbnb-red/90 text-white"
        >
          Done
        </Button>
      </div>

      <Dialog open={showQrCode} onOpenChange={setShowQrCode}>
        <DialogContent className="sm:max-w-md">
          <Card className="bg-zinc-900 border-airbnb-gold/20">
            <CardHeader>
              <CardTitle className="text-center text-white">Your Booking QR Ticket</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="p-4 bg-white rounded-lg shadow-xl">
                <QRCodeSVG
                  id="booking-qr-code"
                  value={bookingDetailsQR}
                  size={200}
                  level="H"
                  fgColor="#8B5CF6"
                  bgColor="#FFFFFF"
                  includeMargin={true}
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-400 mb-1">Scan this code at the restaurant</p>
                <p className="font-medium text-white">{experienceTitle}</p>
                <p className="text-sm mt-2 text-gray-300">
                  {date} • {time} • {guests} {parseInt(guests) === 1 ? 'person' : 'people'}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowQrCode(false)} className="text-white border-airbnb-gold/50">
                Close
              </Button>
              <Button onClick={downloadQRCode} className="bg-airbnb-gold hover:bg-airbnb-gold/90 text-white">
                <Download className="mr-2 h-4 w-4" />
                Download QR
              </Button>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>

      <Dialog open={showWhatsAppCard} onOpenChange={setShowWhatsAppCard}>
        <DialogContent className="sm:max-w-md">
          <Card className="bg-zinc-900 border-airbnb-gold/20">
            <CardHeader>
              <CardTitle className="text-center text-white">Share on WhatsApp</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-white">Send your booking details to WhatsApp</p>
                <div className="bg-zinc-800 p-3 rounded-md">
                  <p className="font-medium text-white">{experienceTitle}</p>
                  <div className="grid grid-cols-2 gap-1 text-sm mt-2">
                    <div className="text-gray-400">Date:</div>
                    <div className="text-white">{date}</div>
                    <div className="text-gray-400">Time:</div>
                    <div className="text-white">{time}</div>
                    <div className="text-gray-400">Guests:</div>
                    <div className="text-white">{guests} {parseInt(guests) === 1 ? 'person' : 'people'}</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={closeWhatsAppCard} className="text-white border-airbnb-gold/50">
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleWhatsAppShare}>
                <Send className="mr-2 h-4 w-4" />
                Send on WhatsApp
              </Button>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingConfirmation;
