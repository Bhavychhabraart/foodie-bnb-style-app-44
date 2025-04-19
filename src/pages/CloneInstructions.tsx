
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Copy, Check, ExternalLink, ChevronLeft, PaintBrush } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CloneInstructions = () => {
  const [copied, setCopied] = useState<{[key: string]: boolean}>({});

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(prev => ({ ...prev, [id]: true }));
    
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
    
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Link to="/" className="flex items-center text-sm mb-6 hover:underline">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Home
      </Link>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Hacha Restaurant Clone Guide</h1>
        <p className="text-xl text-muted-foreground">Step-by-step instructions to clone and set up this project</p>
      </div>
      
      <Tabs defaultValue="setup" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="setup">Initial Setup</TabsTrigger>
          <TabsTrigger value="supabase">Supabase Setup</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
        </TabsList>
        
        <TabsContent value="setup">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">1. Clone the Repository</h2>
              
              <div className="space-y-6">
                <div className="rounded-md bg-muted p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Clone command</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard("git clone [YOUR_REPOSITORY_URL]", "clone")}
                      className="h-8"
                    >
                      {copied["clone"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <pre className="text-sm bg-secondary/50 p-3 rounded overflow-x-auto">
                    git clone [YOUR_REPOSITORY_URL]
                  </pre>
                </div>
                
                <div className="rounded-md bg-muted p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Navigate to project folder</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard("cd hacha", "navigate")}
                      className="h-8"
                    >
                      {copied["navigate"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <pre className="text-sm bg-secondary/50 p-3 rounded overflow-x-auto">
                    cd hacha
                  </pre>
                </div>
                
                <div className="rounded-md bg-muted p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Install dependencies</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard("npm install", "install")}
                      className="h-8"
                    >
                      {copied["install"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <pre className="text-sm bg-secondary/50 p-3 rounded overflow-x-auto">
                    npm install
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="supabase">
          <Card>
            <CardContent className="pt-6 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">2. Create a Supabase Project</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      1
                    </div>
                    <div>
                      <p>Sign up or log in to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                        Supabase <ExternalLink className="ml-1 w-3 h-3" />
                      </a></p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      2
                    </div>
                    <div>
                      <p>Click on "New Project"</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      3
                    </div>
                    <div>
                      <p>Enter a name for your project (e.g., "your-restaurant-name")</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      4
                    </div>
                    <div>
                      <p>Set a secure database password (keep this safe!)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      5
                    </div>
                    <div>
                      <p>Choose a region closest to your users</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      6
                    </div>
                    <div>
                      <p>Click "Create new project" and wait for it to initialize</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h2 className="text-2xl font-bold mb-4">3. Run the Database Migrations</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      1
                    </div>
                    <div className="flex-grow">
                      <p className="mb-2">Go to the SQL Editor in your Supabase dashboard</p>
                      <img src="https://lovable.dev/placeholder.svg" alt="SQL Editor screenshot" className="rounded-md border" />
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      2
                    </div>
                    <div className="flex-grow">
                      <p className="mb-2">Create and run the following SQL migrations (you can do this in multiple queries):</p>
                      
                      <div className="rounded-md bg-muted p-4 mt-2">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm font-medium">Tables Migration</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => copyToClipboard(`-- Create tables for About Section, Testimonials, and Highlights
CREATE TABLE public.about_section (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    avatar_url TEXT,
    date TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE public.highlights (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create update_modified_column function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security (RLS)
ALTER TABLE public.about_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.highlights ENABLE ROW LEVEL SECURITY;`, "tables")}
                            className="h-8"
                          >
                            {copied["tables"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                        <pre className="text-xs bg-secondary/50 p-3 rounded overflow-x-auto max-h-64 overflow-y-auto">
{`-- Create tables for About Section, Testimonials, and Highlights
CREATE TABLE public.about_section (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    avatar_url TEXT,
    date TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE public.highlights (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create update_modified_column function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security (RLS)
ALTER TABLE public.about_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.highlights ENABLE ROW LEVEL SECURITY;`}
                        </pre>
                      </div>
                      
                      <div className="rounded-md bg-muted p-4 mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm font-medium">Security Policies</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => copyToClipboard(`-- Create policies for public read access
CREATE POLICY "Allow public read access for about section" ON public.about_section
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access for testimonials" ON public.testimonials
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access for highlights" ON public.highlights
    FOR SELECT USING (true);

-- Create policies for admin write access
CREATE POLICY "Allow admin write access for about section" ON public.about_section
    FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true));

CREATE POLICY "Allow admin write access for testimonials" ON public.testimonials
    FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true));

CREATE POLICY "Allow admin write access for highlights" ON public.highlights
    FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true));

-- Add updated_at triggers for all tables
CREATE TRIGGER set_timestamp_about_section
    BEFORE UPDATE ON public.about_section
    FOR EACH ROW
    EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER set_timestamp_testimonials
    BEFORE UPDATE ON public.testimonials
    FOR EACH ROW
    EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER set_timestamp_highlights
    BEFORE UPDATE ON public.highlights
    FOR EACH ROW
    EXECUTE FUNCTION public.update_modified_column();`, "policies")}
                            className="h-8"
                          >
                            {copied["policies"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                        <pre className="text-xs bg-secondary/50 p-3 rounded overflow-x-auto max-h-64 overflow-y-auto">
{`-- Create policies for public read access
CREATE POLICY "Allow public read access for about section" ON public.about_section
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access for testimonials" ON public.testimonials
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access for highlights" ON public.highlights
    FOR SELECT USING (true);

-- Create policies for admin write access
CREATE POLICY "Allow admin write access for about section" ON public.about_section
    FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true));

CREATE POLICY "Allow admin write access for testimonials" ON public.testimonials
    FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true));

CREATE POLICY "Allow admin write access for highlights" ON public.highlights
    FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true));

-- Add updated_at triggers for all tables
CREATE TRIGGER set_timestamp_about_section
    BEFORE UPDATE ON public.about_section
    FOR EACH ROW
    EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER set_timestamp_testimonials
    BEFORE UPDATE ON public.testimonials
    FOR EACH ROW
    EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER set_timestamp_highlights
    BEFORE UPDATE ON public.highlights
    FOR EACH ROW
    EXECUTE FUNCTION public.update_modified_column();`}
                        </pre>
                      </div>
                      
                      <div className="rounded-md bg-muted p-4 mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm font-medium">Create Events & Offers Tables</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => copyToClipboard(`-- Create events table
CREATE TABLE public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    host TEXT NOT NULL,
    venue TEXT NOT NULL,
    price TEXT NOT NULL,
    rating NUMERIC NOT NULL DEFAULT 4.8,
    reviews INTEGER NOT NULL DEFAULT 0,
    is_sold_out BOOLEAN NOT NULL DEFAULT false,
    featured BOOLEAN NOT NULL DEFAULT false,
    capacity TEXT,
    category TEXT NOT NULL DEFAULT 'home',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create offers table
CREATE TABLE public.offers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    valid_until TEXT NOT NULL,
    coupon_code TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create chefs_specials table
CREATE TABLE public.chefs_specials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    chef TEXT NOT NULL,
    price TEXT NOT NULL,
    rating NUMERIC NOT NULL DEFAULT 4.5,
    is_popular BOOLEAN NOT NULL DEFAULT false,
    is_new BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chefs_specials ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access for events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow public read access for offers" ON public.offers FOR SELECT USING (true);
CREATE POLICY "Allow public read access for chefs_specials" ON public.chefs_specials FOR SELECT USING (true);

-- Create policies for admin write access
CREATE POLICY "Allow admin write access for events" ON public.events
    FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true));
CREATE POLICY "Allow admin write access for offers" ON public.offers
    FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true));
CREATE POLICY "Allow admin write access for chefs_specials" ON public.chefs_specials
    FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true));

-- Add updated_at triggers
CREATE TRIGGER set_timestamp_events
    BEFORE UPDATE ON public.events
    FOR EACH ROW
    EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER set_timestamp_offers
    BEFORE UPDATE ON public.offers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER set_timestamp_chefs_specials
    BEFORE UPDATE ON public.chefs_specials
    FOR EACH ROW
    EXECUTE FUNCTION public.update_modified_column();`, "events_tables")}
                            className="h-8"
                          >
                            {copied["events_tables"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                        <pre className="text-xs bg-secondary/50 p-3 rounded overflow-x-auto max-h-64 overflow-y-auto">
{`-- Create events table
CREATE TABLE public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    host TEXT NOT NULL,
    venue TEXT NOT NULL,
    price TEXT NOT NULL,
    rating NUMERIC NOT NULL DEFAULT 4.8,
    reviews INTEGER NOT NULL DEFAULT 0,
    is_sold_out BOOLEAN NOT NULL DEFAULT false,
    featured BOOLEAN NOT NULL DEFAULT false,
    capacity TEXT,
    category TEXT NOT NULL DEFAULT 'home',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create offers table
CREATE TABLE public.offers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    valid_until TEXT NOT NULL,
    coupon_code TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create chefs_specials table
CREATE TABLE public.chefs_specials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    chef TEXT NOT NULL,
    price TEXT NOT NULL,
    rating NUMERIC NOT NULL DEFAULT 4.5,
    is_popular BOOLEAN NOT NULL DEFAULT false,
    is_new BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chefs_specials ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access for events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow public read access for offers" ON public.offers FOR SELECT USING (true);
CREATE POLICY "Allow public read access for chefs_specials" ON public.chefs_specials FOR SELECT USING (true);

-- Create policies for admin write access
CREATE POLICY "Allow admin write access for events" ON public.events
    FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true));
CREATE POLICY "Allow admin write access for offers" ON public.offers
    FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true));
CREATE POLICY "Allow admin write access for chefs_specials" ON public.chefs_specials
    FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true));

-- Add updated_at triggers
CREATE TRIGGER set_timestamp_events
    BEFORE UPDATE ON public.events
    FOR EACH ROW
    EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER set_timestamp_offers
    BEFORE UPDATE ON public.offers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER set_timestamp_chefs_specials
    BEFORE UPDATE ON public.chefs_specials
    FOR EACH ROW
    EXECUTE FUNCTION public.update_modified_column();`}
                        </pre>
                      </div>
                      
                      <div className="rounded-md bg-muted p-4 mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm font-medium">Sample Data</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => copyToClipboard(`-- Insert sample data for your restaurant
-- Change these values to match your restaurant!

-- Insert sample highlights
INSERT INTO public.highlights (title, description, icon) VALUES
    ('Award-Winning Food', 'Our culinary team has been recognized with prestigious awards for their innovative approach.', 'Award'),
    ('Fresh Ingredients', 'We source the freshest ingredients from local farms for an authentic dining experience.', 'Utensils'),
    ('Unique Atmosphere', 'Experience our one-of-a-kind ambiance that combines comfort and style.', 'Clock');

-- Insert about section
INSERT INTO public.about_section (title, description) VALUES
    ('About Your Restaurant', 'Your restaurant description goes here. Tell your story and what makes your restaurant special!');

-- Insert sample testimonials
INSERT INTO public.testimonials (name, date, rating, text) VALUES
    ('John Smith', 'March 2025', 5, 'Absolutely incredible dining experience! The food was divine, and the service was impeccable.'),
    ('Jane Doe', 'February 2025', 4, 'Great food and atmosphere. Everything was cooked to perfection.'),
    ('Alex Johnson', 'January 2025', 5, 'Our anniversary dinner was spectacular! The tasting menu with wine pairings was worth every penny.');
    
-- Insert sample events
INSERT INTO public.events (title, description, date, time, host, venue, price, category) VALUES
    ('Weekend Brunch Special', 'Join us for a delightful weekend brunch with exclusive menu items', 'Every Weekend', '10:00 AM - 2:00 PM', 'Restaurant Staff', 'Main Dining Area', '$25 per person', 'home'),
    ('Wine Tasting Event', 'Explore our curated selection of fine wines paired with appetizers', 'Last Friday of Month', '7:00 PM - 9:00 PM', 'Sommelier Sarah', 'Wine Cellar', '$40 per person', 'experiences'),
    ('Chef''s Table Experience', 'Exclusive dining experience with our head chef preparing a custom menu', 'By Reservation', '6:30 PM', 'Head Chef Michael', 'Private Dining Room', '$95 per person', 'experiences');

-- Insert sample offers
INSERT INTO public.offers (title, description, valid_until, coupon_code) VALUES
    ('Happy Hour Special', '50% off all appetizers and $5 house drinks', 'Monday-Friday, 4-6 PM', 'HAPPY50'),
    ('Birthday Promotion', 'Free dessert on your birthday when you dine with us', 'Valid with ID on birthday', 'BDAYDESSERT'),
    ('Weekday Lunch Deal', '15% off all lunch entrees', 'Monday-Thursday, 11 AM - 2 PM', 'LUNCH15');

-- Insert sample chef's specials
INSERT INTO public.chefs_specials (title, description, chef, price, is_popular, is_new) VALUES
    ('Signature Dish', 'Our famous signature dish with a special twist', 'Executive Chef', '$28', true, false),
    ('Seasonal Creation', 'Made with the freshest seasonal ingredients', 'Sous Chef', '$24', false, true),
    ('Chef''s Recommendation', 'The chef''s personal favorite creation', 'Head Chef', '$32', true, false);`, "sample-data")}
                            className="h-8"
                          >
                            {copied["sample-data"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                        <pre className="text-xs bg-secondary/50 p-3 rounded overflow-x-auto max-h-64 overflow-y-auto">
{`-- Insert sample data for your restaurant
-- Change these values to match your restaurant!

-- Insert sample highlights
INSERT INTO public.highlights (title, description, icon) VALUES
    ('Award-Winning Food', 'Our culinary team has been recognized with prestigious awards for their innovative approach.', 'Award'),
    ('Fresh Ingredients', 'We source the freshest ingredients from local farms for an authentic dining experience.', 'Utensils'),
    ('Unique Atmosphere', 'Experience our one-of-a-kind ambiance that combines comfort and style.', 'Clock');

-- Insert about section
INSERT INTO public.about_section (title, description) VALUES
    ('About Your Restaurant', 'Your restaurant description goes here. Tell your story and what makes your restaurant special!');

-- Insert sample testimonials
INSERT INTO public.testimonials (name, date, rating, text) VALUES
    ('John Smith', 'March 2025', 5, 'Absolutely incredible dining experience! The food was divine, and the service was impeccable.'),
    ('Jane Doe', 'February 2025', 4, 'Great food and atmosphere. Everything was cooked to perfection.'),
    ('Alex Johnson', 'January 2025', 5, 'Our anniversary dinner was spectacular! The tasting menu with wine pairings was worth every penny.');
    
-- Insert sample events
INSERT INTO public.events (title, description, date, time, host, venue, price, category) VALUES
    ('Weekend Brunch Special', 'Join us for a delightful weekend brunch with exclusive menu items', 'Every Weekend', '10:00 AM - 2:00 PM', 'Restaurant Staff', 'Main Dining Area', '$25 per person', 'home'),
    ('Wine Tasting Event', 'Explore our curated selection of fine wines paired with appetizers', 'Last Friday of Month', '7:00 PM - 9:00 PM', 'Sommelier Sarah', 'Wine Cellar', '$40 per person', 'experiences'),
    ('Chef''s Table Experience', 'Exclusive dining experience with our head chef preparing a custom menu', 'By Reservation', '6:30 PM', 'Head Chef Michael', 'Private Dining Room', '$95 per person', 'experiences');

-- Insert sample offers
INSERT INTO public.offers (title, description, valid_until, coupon_code) VALUES
    ('Happy Hour Special', '50% off all appetizers and $5 house drinks', 'Monday-Friday, 4-6 PM', 'HAPPY50'),
    ('Birthday Promotion', 'Free dessert on your birthday when you dine with us', 'Valid with ID on birthday', 'BDAYDESSERT'),
    ('Weekday Lunch Deal', '15% off all lunch entrees', 'Monday-Thursday, 11 AM - 2 PM', 'LUNCH15');

-- Insert sample chef's specials
INSERT INTO public.chefs_specials (title, description, chef, price, is_popular, is_new) VALUES
    ('Signature Dish', 'Our famous signature dish with a special twist', 'Executive Chef', '$28', true, false),
    ('Seasonal Creation', 'Made with the freshest seasonal ingredients', 'Sous Chef', '$24', false, true),
    ('Chef''s Recommendation', 'The chef''s personal favorite creation', 'Head Chef', '$32', true, false);`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h2 className="text-2xl font-bold mb-4">4. Set Up Authentication</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      1
                    </div>
                    <div>
                      <p>In your Supabase dashboard, go to Authentication → Settings</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      2
                    </div>
                    <div>
                      <p>Enable the authentication methods you want to use (at minimum, Email)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      3
                    </div>
                    <div>
                      <p>Create a profiles table with admin flag:</p>
                      <div className="rounded-md bg-muted p-4 mt-2">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm font-medium">Profiles Table</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => copyToClipboard(`-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    is_admin BOOLEAN DEFAULT false,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create handler for new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new signups
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
`, "profiles")}
                            className="h-8"
                          >
                            {copied["profiles"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                        <pre className="text-xs bg-secondary/50 p-3 rounded overflow-x-auto max-h-64 overflow-y-auto">
{`-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    is_admin BOOLEAN DEFAULT false,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create handler for new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new signups
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="development">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">5. Configure Environment Variables</h2>
              
              <div className="space-y-6">
                <div className="rounded-md bg-muted p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Create .env file</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(`VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key`, "env")}
                      className="h-8"
                    >
                      {copied["env"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Create a .env file in the project root with the following:</p>
                  <pre className="text-sm bg-secondary/50 p-3 rounded overflow-x-auto">
{`VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key`}
                  </pre>
                </div>
                
                <div className="rounded-md bg-muted p-4">
                  <h3 className="text-sm font-medium mb-2">Where to find your keys</h3>
                  <p className="text-sm mb-2">1. In your Supabase dashboard, go to Project Settings</p>
                  <p className="text-sm mb-2">2. Click on "API" in the sidebar</p>
                  <p className="text-sm mb-2">3. Under "Project URL" and "Project API keys", copy the URL and anon key</p>
                </div>
              </div>
              
              <div className="mt-8 space-y-6">
                <h2 className="text-2xl font-bold mb-4">6. Run the Development Server</h2>
                
                <div className="rounded-md bg-muted p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Start development server</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(`npm run dev`, "dev")}
                      className="h-8"
                    >
                      {copied["dev"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <pre className="text-sm bg-secondary/50 p-3 rounded overflow-x-auto">
                    npm run dev
                  </pre>
                </div>
                
                <div className="rounded-md bg-muted p-4">
                  <h3 className="text-sm font-medium mb-2">Open in browser</h3>
                  <p className="text-sm">Once the server starts, open your browser and navigate to: <span className="font-mono bg-secondary/50 px-2 rounded">http://localhost:5173</span></p>
                </div>
              </div>
              
              <div className="mt-8 space-y-6">
                <h2 className="text-2xl font-bold mb-4">7. Set Up Admin Access</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      1
                    </div>
                    <div>
                      <p>Sign up for an account in your application</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      2
                    </div>
                    <div>
                      <p>In the Supabase dashboard, go to the Table Editor</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      3
                    </div>
                    <div>
                      <p>Find your user in the "profiles" table</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      4
                    </div>
                    <div>
                      <p>Edit the row and set "is_admin" to true</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      5
                    </div>
                    <div>
                      <p>Log out and log back in to your application to get admin access</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customization">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. Customizing Your Restaurant Theme</h2>
                <p className="text-muted-foreground mb-4">Now that you have the basic setup running, let's customize the look and feel to match your restaurant's brand identity.</p>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center mb-4">
                      <PaintBrush className="mr-2 h-5 w-5" />
                      Tailwind Theme Customization
                    </h3>
                    
                    <div className="rounded-md bg-muted p-4">
                      <p className="text-sm mb-4">Edit the <code>tailwind.config.ts</code> file to change your color palette:</p>
                      
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium">tailwind.config.ts</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => copyToClipboard(`import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Update these colors to match your restaurant's brand identity
        primary: {
          DEFAULT: "#D18F69", // Your main brand color
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FEF7ED", // A complementary color
          foreground: "#292524",
        },
        accent: {
          DEFAULT: "#D4AF37", // An accent color for highlights
          foreground: "#FFFFFF",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};`, "tailwind")}
                          className="h-8"
                        >
                          {copied["tailwind"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      
                      <pre className="text-xs bg-secondary/50 p-3 rounded overflow-x-auto max-h-64 overflow-y-auto">
{`import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Update these colors to match your restaurant's brand identity
        primary: {
          DEFAULT: "#D18F69", // Your main brand color
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FEF7ED", // A complementary color
          foreground: "#292524",
        },
        accent: {
          DEFAULT: "#D4AF37", // An accent color for highlights
          foreground: "#FFFFFF",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};`}
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold flex items-center mb-4">
                      Updating Logo and Brand Name
                    </h3>
                    
                    <div className="rounded-md bg-muted p-4">
                      <p className="text-sm mb-4">Edit the <code>Navbar.tsx</code> file to update your restaurant name and logo:</p>
                      
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium">Navbar.tsx - Brand Name</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => copyToClipboard(`<Link to="/" className="text-xl font-bold">YOUR RESTAURANT NAME</Link>`, "brand-name")}
                          className="h-8"
                        >
                          {copied["brand-name"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      
                      <pre className="text-xs bg-secondary/50 p-3 rounded overflow-x-auto mb-4">
{`<Link to="/" className="text-xl font-bold">YOUR RESTAURANT NAME</Link>`}
                      </pre>
                      
                      <p className="text-sm mb-4">To add a logo instead of text:</p>
                      
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium">Navbar.tsx - Logo</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => copyToClipboard(`<Link to="/" className="flex items-center">
  <img src="/path-to-your-logo.png" alt="Your Restaurant" className="h-8 w-auto" />
</Link>`, "logo")}
                          className="h-8"
                        >
                          {copied["logo"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      
                      <pre className="text-xs bg-secondary/50 p-3 rounded overflow-x-auto">
{`<Link to="/" className="flex items-center">
  <img src="/path-to-your-logo.png" alt="Your Restaurant" className="h-8 w-auto" />
</Link>`}
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold flex items-center mb-4">
                      Customizing Content
                    </h3>
                    
                    <p className="mb-4">After connecting to Supabase and setting up admin access, you can customize content through the admin panel:</p>
                    
                    <ol className="space-y-2 list-decimal pl-5">
                      <li>Log in with your admin account</li>
                      <li>Click on the "Admin" link in the navigation</li>
                      <li>Use the "Site Editor" to update content for different sections</li>
                      <li>Upload your own images and update text for:
                        <ul className="list-disc pl-5 mt-2">
                          <li>Hero section</li>
                          <li>About section</li>
                          <li>Menu items</li>
                          <li>Events</li>
                          <li>Testimonials</li>
                        </ul>
                      </li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold flex items-center mb-4">
                      Advanced Customizations
                    </h3>
                    
                    <div className="space-y-4">
                      <p>For more advanced customizations, you can modify component files directly:</p>
                      
                      <div className="rounded-md bg-muted p-4">
                        <h4 className="font-medium mb-2">Core Components to Customize</h4>
                        <ul className="space-y-2 list-disc pl-5">
                          <li><code>src/components/Hero.tsx</code> - The main banner</li>
                          <li><code>src/components/Footer.tsx</code> - Update contact info and social links</li>
                          <li><code>src/components/Menu.tsx</code> - Customize menu layout</li>
                          <li><code>src/components/About.tsx</code> - Tell your restaurant's story</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-8" />
              
              <div>
                <h2 className="text-2xl font-bold mb-4">9. Deployment</h2>
                
                <div className="space-y-6">
                  <p>Once you're ready to deploy your website, you have several options:</p>
                  
                  <div className="space-y-6">
                    <div className="rounded-md bg-muted p-4">
                      <h3 className="font-medium mb-2">Option 1: Vercel (Recommended)</h3>
                      <ol className="space-y-2 list-decimal pl-5">
                        <li>Create an account on <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">Vercel <ExternalLink className="ml-1 w-3 h-3" /></a></li>
                        <li>Push your code to a Git provider (GitHub, GitLab, or Bitbucket)</li>
                        <li>Import your repository in Vercel</li>
                        <li>Add your environment variables (Supabase URL and key)</li>
                        <li>Deploy</li>
                      </ol>
                    </div>
                    
                    <div className="rounded-md bg-muted p-4">
                      <h3 className="font-medium mb-2">Option 2: Netlify</h3>
                      <ol className="space-y-2 list-decimal pl-5">
                        <li>Create an account on <a href="https://netlify.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">Netlify <ExternalLink className="ml-1 w-3 h-3" /></a></li>
                        <li>Push your code to a Git provider</li>
                        <li>Import your repository in Netlify</li>
                        <li>Set the build command to <code>npm run build</code></li>
                        <li>Set the publish directory to <code>dist</code></li>
                        <li>Add your environment variables</li>
                        <li>Deploy</li>
                      </ol>
                    </div>
                    
                    <div className="rounded-md bg-muted p-4">
                      <h3 className="font-medium mb-2">Option 3: GitHub Pages</h3>
                      <ol className="space-y-2 list-decimal pl-5">
                        <li>Update <code>vite.config.ts</code> with your base path</li>
                        <li>Run <code>npm run build</code></li>
                        <li>Push the <code>dist</code> folder to a <code>gh-pages</code> branch</li>
                        <li>Enable GitHub Pages in your repository settings</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-8" />
              
              <div className="rounded-lg bg-secondary/50 p-6 border border-primary/20">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3">✓</span>
                  You're all set!
                </h2>
                
                <p className="mb-4">Your restaurant website should now be up and running with customized content and styling. If you need further assistance or have questions, check out these resources:</p>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-2 mt-0.5">•</span>
                    <span>React documentation: <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">reactjs.org <ExternalLink className="ml-1 w-3 h-3" /></a></span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-2 mt-0.5">•</span>
                    <span>Supabase documentation: <a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">supabase.com/docs <ExternalLink className="ml-1 w-3 h-3" /></a></span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-2 mt-0.5">•</span>
                    <span>Tailwind CSS: <a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">tailwindcss.com/docs <ExternalLink className="ml-1 w-3 h-3" /></a></span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CloneInstructions;
