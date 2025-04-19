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
        </Tabs
