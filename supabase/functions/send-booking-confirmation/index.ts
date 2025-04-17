
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingConfirmationRequest {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  experienceTitle: string;
  tableNumber?: string;
  specialRequests?: string;
  addOns?: string[];
  phone?: string; // Add phone field
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      name, 
      email, 
      date, 
      time, 
      guests, 
      experienceTitle, 
      tableNumber,
      specialRequests,
      addOns = [],
      phone = '' // Add phone field with default empty string
    }: BookingConfirmationRequest = await req.json();

    console.log(`Sending booking confirmation to ${email} for ${experienceTitle}`);

    // Generate HTML content for add-ons if present
    let addOnsHtml = '';
    if (addOns.length > 0) {
      addOnsHtml = `
        <p style="margin-top: 8px; margin-bottom: 0;">Add-ons:</p>
        <ul style="margin-top: 4px; padding-left: 20px;">
          ${addOns.map(addon => `<li>${addon}</li>`).join('')}
        </ul>
      `;
    }

    // Generate special requests section if provided
    let specialRequestsHtml = '';
    if (specialRequests) {
      specialRequestsHtml = `
        <p style="margin-top: 8px;"><strong>Special Requests:</strong> ${specialRequests}</p>
      `;
    }

    // Generate table number section if provided
    let tableNumberHtml = '';
    if (tableNumber) {
      tableNumberHtml = `
        <p><strong>Table:</strong> ${tableNumber}</p>
      `;
    }

    // Generate phone section if provided
    let phoneHtml = '';
    if (phone) {
      phoneHtml = `
        <p style="margin-bottom: 5px;"><strong>Contact:</strong> ${phone}</p>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "Lovable Restaurant <booking@lovablerestaurant.com>",
      to: [email],
      subject: `Your Reservation Confirmation - ${experienceTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background-color: #F5F5F5; padding: 20px; border-radius: 10px;">
            <h1 style="color: #E31C5F; margin-top: 0;">Booking Confirmation</h1>
            <p>Dear ${name},</p>
            <p>Thank you for your reservation. We're excited to welcome you!</p>
            
            <div style="background-color: white; border-radius: 8px; padding: 15px; margin: 20px 0; border-left: 4px solid #E31C5F;">
              <h2 style="margin-top: 0; color: #333; font-size: 18px;">${experienceTitle}</h2>
              <p style="margin-bottom: 5px;"><strong>Name:</strong> ${name}</p>
              ${phoneHtml}
              <p style="margin-bottom: 5px;"><strong>Date:</strong> ${date}</p>
              <p style="margin-bottom: 5px;"><strong>Time:</strong> ${time}</p>
              <p style="margin-bottom: 5px;"><strong>Guests:</strong> ${guests}</p>
              ${tableNumberHtml}
              ${specialRequestsHtml}
              ${addOnsHtml}
            </div>
            
            <p>If you need to make any changes to your reservation, please contact us directly.</p>
            <p>We look forward to serving you!</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777;">
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
