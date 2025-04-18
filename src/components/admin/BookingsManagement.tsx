
const handleWhatsAppMessage = (booking: Booking) => {
  const confirmationMessage = `Hello ${booking.name}! 🎉\n\n` +
    `Your magical dining experience at Hacha is all set! ✨\n\n` +
    `Booking Details:\n` +
    `Date: ${formatDate(booking.date)}\n` +
    `Time: ${booking.time}\n` +
    `Booking Type: ${booking.booking_type}\n` +
    `Total: ₹${booking.total_amount.toLocaleString()}\n\n` +
    `We can't wait to dazzle you with an unforgettable culinary journey. See you soon! 🍽️💫\n\n` +
    `Warmly,\nThe Hacha Team`;

  // Ensure phone number starts with +91
  const phoneNumber = booking.phone.startsWith('+91') 
    ? booking.phone.replace(/\D/g, '') 
    : `91${booking.phone.replace(/\D/g, '')}`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(confirmationMessage)}`;
  window.open(whatsappUrl, '_blank');
};
