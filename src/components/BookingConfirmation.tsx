import React, { useState, useEffect, useRef } from 'react';
import { Check, PartyPopper, Send, Download, User, Calendar, Clock, Phone, Users, MessageCircle, WhatsApp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { QRCodeSVG } from 'qrcode.react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/providers/AuthProvider';

interface BookingConfirmationProps {
  experienceTitle: string;
  date: string;
  time: string;
  guests: string;
  name?: string;
  phone?: string;
  onClose: () => void;
}

const MessageAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = [
    "Taking your reservation to WhatsApp...",
    "To provide you support with bookings...",
    "Opening WhatsApp now..."
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentMessage < messages.length - 1) {
        setCurrentMessage(prev => prev + 1);
      } else {
        onComplete();
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentMessage, onComplete]);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMessage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-airbnb-dark p-6 rounded-lg shadow-xl border border-airbnb-gold/20 max-w-sm w-full mx-4"
        >
          <div className="flex items-center space-x-3 text-white">
            <MessageCircle className="w-6 h-6 text-airbnb-gold animate-pulse" />
            <p className="text-lg">{messages[currentMessage]}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const BookingQRCode = ({ bookingData, size = 200 }: { bookingData: string, size?: number }) => {
  return (
    <QRCodeSVG
      id="booking-qr-code"
      value={bookingData}
      size={size}
      level="H"
      fgColor="#B18E72"
      bgColor="#FFFFFF"
      includeMargin={true}
    />
  );
};

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  experienceTitle,
  date,
  time,
  guests,
  name,
  phone,
  onClose
}) => {
  const [showWhatsAppCard, setShowWhatsAppCard] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrCodeLoaded, setQrCodeLoaded] = useState(false);
  const [showThankYou, setShowThankYou] = useState(true);
  const [showMessageAnimation, setShowMessageAnimation] = useState(false);
  const { toast } = useToast();
  const qrCanvasRef = useRef<HTMLDivElement>(null);
  const { userProfile } = useAuth();
  
  const customerName = name || userProfile?.full_name || "Guest";
  const contactPhone = phone || userProfile?.phone || "";
  
  const bookingDetails = {
    experience: experienceTitle,
    date: date,
    time: time,
    guests: guests,
    name: customerName,
    phone: contactPhone
  };
  
  const bookingDetailsQR = JSON.stringify(bookingDetails);
  
  useEffect(() => {
    if (showQrCode) {
      const timer = setTimeout(() => {
        setQrCodeLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [showQrCode]);
  
  const handleWhatsAppShare = () => {
    setShowMessageAnimation(true);
  };

  const handleAnimationComplete = () => {
    setShowMessageAnimation(false);
    const message = `Booking Confirmed!\n\n${experienceTitle}\nName: ${customerName}\nPhone: ${contactPhone}\nDate: ${date}\nTime: ${time}\nGuests: ${guests} ${parseInt(guests) === 1 ? 'person' : 'people'}`;
    
    const phoneNumber = "919220829369";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    toast({
      description: "Opening WhatsApp..."
    });
  };

  const openWhatsAppCard = () => {
    setShowWhatsAppCard(true);
  };

  const closeWhatsAppCard = () => {
    setShowWhatsAppCard(false);
  };
  
  const downloadQRCode = () => {
    if (!qrCanvasRef.current) return;
    
    try {
      const canvas = document.getElementById('booking-qr-code');
      if (canvas) {
        const svgElement = canvas as unknown as SVGElement;
        const svgData = new XMLSerializer().serializeToString(svgElement);
        
        const img = new Image();
        img.onload = () => {
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = img.width;
          tempCanvas.height = img.height;
          const ctx = tempCanvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
            ctx.drawImage(img, 0, 0);
            
            const downloadLink = document.createElement('a');
            downloadLink.href = tempCanvas.toDataURL('image/png');
            downloadLink.download = `${experienceTitle.replace(/\s+/g, '_')}_booking_qrcode.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            toast({
              description: "QR Code downloaded successfully!"
            });
          }
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
      }
    } catch (error) {
      console.error('Error downloading QR code:', error);
      toast({
        variant: "destructive",
        description: "Couldn't download QR code. Please try again."
      });
    }
  };

  const renderThankYouMessage = () => (
    <div className="text-center p-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-20 h-20 bg-airbnb-gold rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <PartyPopper className="w-10 h-10 text-airbnb-dark" />
      </motion.div>
      
      <h2 className="text-2xl font-bold mb-2 text-white">Reservation Confirmed!</h2>
      
      <p className="text-lg mb-4 text-airbnb-gold/80">
        Thank you for choosing to dine with us
      </p>
      
      <p className="text-sm text-white/60 mb-6">
        We will share the confirmation details on your email shortly
      </p>
      
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 sm:justify-center">
        <Button 
          onClick={() => {
            setShowWhatsAppCard(true);
            setShowThankYou(false);
          }} 
          className="bg-airbnb-gold hover:bg-airbnb-gold/90 text-airbnb-dark"
        >
          <Send className="mr-2 h-4 w-4" />
          Share on WhatsApp
        </Button>
        
        <Button 
          onClick={() => setShowThankYou(false)} 
          className="border border-airbnb-gold/50 hover:bg-airbnb-gold/10 text-white"
          variant="outline"
        >
          View Details
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center bg-airbnb-dark min-h-screen">
      {showMessageAnimation && (
        <MessageAnimation onComplete={handleAnimationComplete} />
      )}
      
      {showThankYou ? renderThankYouMessage() : (
        <>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 bg-airbnb-gold rounded-full flex items-center justify-center mb-6"
          >
            <Check className="w-10 h-10 text-airbnb-dark" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="mb-6">
              <p className="text-lg mb-1 text-airbnb-gold/80">Thank you for your reservation</p>
              <p className="text-sm text-white/60">A confirmation has been sent to your email</p>
            </div>
            
            <div className="bg-airbnb-dark/50 rounded-lg p-4 mb-6 border border-airbnb-gold/20 shadow-lg">
              <h3 className="font-medium mb-2 text-white">{experienceTitle}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-airbnb-gold/80">Name:</div>
                <div className="text-white">{customerName}</div>
                {contactPhone && (
                  <>
                    <div className="text-airbnb-gold/80">Contact:</div>
                    <div className="text-white">{contactPhone}</div>
                  </>
                )}
                <div className="text-airbnb-gold/80">Date:</div>
                <div className="text-white">{date}</div>
                <div className="text-airbnb-gold/80">Time:</div>
                <div className="text-white">{time}</div>
                <div className="text-airbnb-gold/80">Guests:</div>
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
              onClick={() => setShowThankYou(true)} 
              className="border border-airbnb-gold/50 hover:bg-airbnb-gold/10 text-white"
              variant="outline"
            >
              Back to Thank You
            </Button>
            
            <Button 
              onClick={() => setShowQrCode(true)} 
              className="bg-airbnb-gold hover:bg-airbnb-gold/90 text-airbnb-dark"
            >
              View QR Ticket
            </Button>
            
            <Button 
              onClick={openWhatsAppCard} 
              className="bg-airbnb-dark/70 hover:bg-airbnb-dark/80 text-white border border-airbnb-gold/20"
            >
              <Send className="mr-2 h-4 w-4" />
              Send on WhatsApp
            </Button>
          </div>

          <Dialog open={showQrCode} onOpenChange={setShowQrCode}>
            <DialogContent className="sm:max-w-md">
              <Card className="bg-airbnb-dark border-airbnb-gold/20">
                <CardHeader>
                  <CardTitle className="text-center text-white">Your Booking QR Ticket</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="p-4 bg-white rounded-lg shadow-xl" ref={qrCanvasRef}>
                    {showQrCode && <BookingQRCode bookingData={bookingDetailsQR} />}
                  </div>
                  <div className="mt-4 text-center space-y-3">
                    <p className="text-sm text-white/60 mb-1">Scan this code at the restaurant</p>
                    <p className="font-medium text-white">{experienceTitle}</p>
                    
                    <div className="bg-airbnb-dark/70 rounded-lg p-3 border border-airbnb-gold/20">
                      <div className="flex items-center justify-center mb-2">
                        <User className="h-4 w-4 text-airbnb-gold mr-1" />
                        <p className="text-sm text-white">{customerName}</p>
                      </div>
                      
                      {contactPhone && (
                        <div className="flex items-center justify-center mb-2">
                          <Phone className="h-4 w-4 text-airbnb-gold mr-1" />
                          <p className="text-sm text-white">{contactPhone}</p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-center mb-2">
                        <Calendar className="h-4 w-4 text-airbnb-gold mr-1" />
                        <p className="text-sm text-white">{date}</p>
                      </div>
                      
                      <div className="flex items-center justify-center mb-2">
                        <Clock className="h-4 w-4 text-airbnb-gold mr-1" />
                        <p className="text-sm text-white">{time}</p>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <Users className="h-4 w-4 text-airbnb-gold mr-1" />
                        <p className="text-sm text-white">{guests} {parseInt(guests) === 1 ? 'person' : 'people'}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setShowQrCode(false)} className="text-white border-airbnb-gold/50">
                    Close
                  </Button>
                  <Button onClick={downloadQRCode} className="bg-airbnb-gold hover:bg-airbnb-gold/90 text-airbnb-dark">
                    <Download className="mr-2 h-4 w-4" />
                    Download QR
                  </Button>
                </CardFooter>
              </Card>
            </DialogContent>
          </Dialog>

          <Dialog open={showWhatsAppCard} onOpenChange={setShowWhatsAppCard}>
            <DialogContent className="sm:max-w-md">
              <Card className="bg-airbnb-dark border-airbnb-gold/20">
                <CardHeader>
                  <CardTitle className="text-center text-white">Share on WhatsApp</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-white">Send your booking details to WhatsApp</p>
                    <div className="bg-airbnb-dark/50 p-3 rounded-md border border-airbnb-gold/20">
                      <p className="font-medium text-white">{experienceTitle}</p>
                      <div className="grid grid-cols-2 gap-1 text-sm mt-2">
                        <div className="text-airbnb-gold/80">Name:</div>
                        <div className="text-white">{customerName}</div>
                        {contactPhone && (
                          <>
                            <div className="text-airbnb-gold/80">Contact:</div>
                            <div className="text-white">{contactPhone}</div>
                          </>
                        )}
                        <div className="text-airbnb-gold/80">Date:</div>
                        <div className="text-white">{date}</div>
                        <div className="text-airbnb-gold/80">Time:</div>
                        <div className="text-white">{time}</div>
                        <div className="text-airbnb-gold/80">Guests:</div>
                        <div className="text-white">{guests} {parseInt(guests) === 1 ? 'person' : 'people'}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={closeWhatsAppCard} className="text-white border-airbnb-gold/50">
                    Cancel
                  </Button>
                  <Button className="bg-airbnb-gold hover:bg-airbnb-gold/90 text-airbnb-dark" onClick={handleWhatsAppShare}>
                    <Send className="mr-2 h-4 w-4" />
                    Send on WhatsApp
                  </Button>
                </CardFooter>
              </Card>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default BookingConfirmation;
