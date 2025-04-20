import React, { useState, useEffect, useRef } from 'react';
import { Check, PartyPopper, Send, Download, User, Calendar, Clock, Phone, Users } from 'lucide-react';
import { motion } from 'framer-motion';
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

const WHATSAPP_NUMBER = "919220829369";

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
  const [showCaretakerAssign, setShowCaretakerAssign] = useState(true);
  const [showConnectWhatsapp, setShowConnectWhatsapp] = useState(false);
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
  
  useEffect(() => {
    if (showCaretakerAssign) {
      setShowConnectWhatsapp(false);
      const timeout = setTimeout(() => {
        setShowCaretakerAssign(false);
        setShowConnectWhatsapp(true);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [showCaretakerAssign]);
  
  const handleWhatsAppShare = () => {
    const message = `Booking Confirmed!\n\n${experienceTitle}\nName: ${customerName}\nPhone: ${contactPhone}\nDate: ${date}\nTime: ${time}\nGuests: ${guests} ${parseInt(guests) === 1 ? 'person' : 'people'}`;
    
    const phoneNumber = "919220829369";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    toast({
      description: "Opening WhatsApp..."
    });
  };

  const handleCaretakerWhatsapp = () => {
    const caretakerName = "Rohit (Your Caretaker)";
    const caretakerNumber = WHATSAPP_NUMBER;
    const message =
      `Hi ${caretakerName},\nMy table reservation is confirmed!\n\nName: ${customerName}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}\nLooking forward to your assistance!`;
    const whatsappUrl = `https://wa.me/${caretakerNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast({ description: "Opening WhatsApp to connect you with your caretaker..." });
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

  const CaretakerAssignAnimation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-[260px] mb-6"
    >
      <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-green-100 shadow-lg">
        <svg className="animate-spin h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-20"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-80"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-green-700 mb-1">Allotting your reservation caretaker...</h2>
      <p className="text-airbnb-gold text-base">Please wait a moment</p>
    </motion.div>
  );

  const CaretakerWhatsappButton = () => (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center my-6"
    >
      <div className="mb-4 flex items-center justify-center">
        <span className="font-medium text-lg text-green-600">Your caretaker is assigned: <span className="font-bold">Rohit</span></span>
      </div>
      <Button
        onClick={handleCaretakerWhatsapp}
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-base font-bold rounded-lg shadow-lg flex items-center gap-2 animate-pulse"
        style={{ minWidth: 220 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 32 32" className="mr-2" aria-hidden="true">
          <rect width="32" height="32" rx="16" fill="#fff"/>
          <path fill="#25D366" d="M16 7A9 9 0 007 16c0 1.484.408 2.938 1.18 4.203l-1.25 4.45a1 1 0 001.227 1.227l4.45-1.25A9.002 9.002 0 1022 7a8.96 8.96 0 00-6-.001zm.003 2.001A6.998 6.998 0 1123 16.002h-.005A6.999 6.999 0 0116.003 9zm-.13 2.037a1 1 0 00-.86.509l-.535.931a1 1 0 00.206 1.236l1.03.846a6.144 6.144 0 002.62 2.027c.063.023.13.034.197.034.067 0 .134-.01.197-.034a6.143 6.143 0 002.62-2.027l1.03-.846a1 1 0 00.206-1.236l-.535-.93a1 1 0 00-.86-.509l-1.234-.004c-.205 0-.4.079-.546.22l-.586.581a1.003 1.003 0 01-1.422 0l-.586-.581a.77.77 0 00-.545-.22l-1.235.003zm.721 2.426c.064.057.14.086.221.086.08 0 .157-.03.22-.086l.586-.58a.754.754 0 01.545-.221l1.234-.003c.082-.001.158.028.221.085l.535.931-.999.82a5.139 5.139 0 01-2.114 1.637 5.137 5.137 0 01-2.114-1.636l-.999-.821.535-.931zm-.595 3.12c.554.478 1.219.835 1.92 1.076a7.244 7.244 0 001.92-1.076l.999.821a3.376 3.376 0 01-1.828 1.603 3.375 3.375 0 01-1.828-1.604zm-.597.125a1 1 0 00-.466 1.022l.088.606c.094.649.573 1.08 1.19 1.08.596 0 1.058-.423 1.19-1.081l.087-.605a1 1 0 00-.466-1.022 5.321 5.321 0 01-.529-.486zm4.072 0a5.2 5.2 0 01-.53.486 1 1 0 00-.466 1.021l.088.605c.133.658.595 1.081 1.191 1.081.617 0 1.095-.43 1.19-1.08l.089-.606a1 1 0 00-.466-1.022z"/>
        </svg>
        Connect on WhatsApp
      </Button>
      <p className="mt-2 text-sm text-green-700 font-medium">
        Chat directly with your caretaker about your reservation!
      </p>
    </motion.div>
  );

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
      {showCaretakerAssign ? (
        <CaretakerAssignAnimation />
      ) : showConnectWhatsapp ? (
        <CaretakerWhatsappButton />
      ) : showThankYou ? renderThankYouMessage() : (
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
