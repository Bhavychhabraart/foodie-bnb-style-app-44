
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Copy, Check, ExternalLink, ChevronLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CloneInstructions = () => {
  const [copied, setCopied] = React.useState<{[key: string]: boolean}>({});

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
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="setup">Initial Setup</TabsTrigger>
          <TabsTrigger value="supabase">Supabase Setup</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
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
                      <p>Enter a name for your project (e.g., "hacha-restaurant")</p>
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
                          <h3 className="text-sm font-medium">Sample Data</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => copyToClipboard(`-- Insert initial data
INSERT INTO public.highlights (title, description, icon) VALUES
    ('Award-Winning Chefs', 'Our culinary team has been recognized with prestigious awards for their innovative approach.', 'Award'),
    ('Farm to Table', 'We source the freshest ingredients from local farms for an authentic dining experience.', 'Utensils'),
    ('Exclusive Dining Hours', 'We offer special dining hours for intimate gatherings and private celebrations.', 'Clock');

INSERT INTO public.about_section (title, description) VALUES
    ('About Hacha', 'HACHA, the ultimate BYOB destination where aesthetics meet wild parties and culinary excellence!');

INSERT INTO public.testimonials (name, date, rating, text) VALUES
    ('Priya Sharma', 'March 2025', 5, 'Absolutely incredible dining experience! The truffle risotto was divine, and the service was impeccable. The ambiance makes it perfect for special occasions.'),
    ('Rahul Patel', 'February 2025', 4, 'Great food and atmosphere. The beef tenderloin was cooked to perfection. Only giving 4 stars because we had to wait a bit for our table despite having a reservation.'),
    ('Aisha Khan', 'January 2025', 5, 'Our anniversary dinner was spectacular! The tasting menu with wine pairings was worth every penny. The staff made us feel so special.');`, "sample-data")}
                            className="h-8"
                          >
                            {copied["sample-data"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                        <pre className="text-xs bg-secondary/50 p-3 rounded overflow-x-auto max-h-64 overflow-y-auto">
{`-- Insert initial data
INSERT INTO public.highlights (title, description, icon) VALUES
    ('Award-Winning Chefs', 'Our culinary team has been recognized with prestigious awards for their innovative approach.', 'Award'),
    ('Farm to Table', 'We source the freshest ingredients from local farms for an authentic dining experience.', 'Utensils'),
    ('Exclusive Dining Hours', 'We offer special dining hours for intimate gatherings and private celebrations.', 'Clock');

INSERT INTO public.about_section (title, description) VALUES
    ('About Hacha', 'HACHA, the ultimate BYOB destination where aesthetics meet wild parties and culinary excellence!');

INSERT INTO public.testimonials (name, date, rating, text) VALUES
    ('Priya Sharma', 'March 2025', 5, 'Absolutely incredible dining experience! The truffle risotto was divine, and the service was impeccable. The ambiance makes it perfect for special occasions.'),
    ('Rahul Patel', 'February 2025', 4, 'Great food and atmosphere. The beef tenderloin was cooked to perfection. Only giving 4 stars because we had to wait a bit for our table despite having a reservation.'),
    ('Aisha Khan', 'January 2025', 5, 'Our anniversary dinner was spectacular! The tasting menu with wine pairings was worth every penny. The staff made us feel so special.');`}
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
              <h2 className="text-2xl font-bold mb-4">5. Connect Your App to Supabase</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    1
                  </div>
                  <div className="flex-grow">
                    <p className="mb-2">In your Supabase project, go to Project Settings → API</p>
                    <p className="text-sm text-muted-foreground">Copy the URL and the anon/public key</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    2
                  </div>
                  <div className="flex-grow">
                    <p className="mb-2">Update the client file with your Supabase credentials:</p>
                    <div className="rounded-md bg-muted p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium">src/integrations/supabase/client.ts</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => copyToClipboard(`// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_SUPABASE_ANON_KEY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);`, "client")}
                          className="h-8"
                        >
                          {copied["client"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      <pre className="text-sm bg-secondary/50 p-3 rounded overflow-x-auto">
{`// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_SUPABASE_ANON_KEY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);`}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    3
                  </div>
                  <div>
                    <p className="mb-2">Start the development server:</p>
                    <div className="rounded-md bg-muted p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium">Start development server</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => copyToClipboard("npm run dev", "dev")}
                          className="h-8"
                        >
                          {copied["dev"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      <pre className="text-sm bg-secondary/50 p-3 rounded overflow-x-auto">
                        npm run dev
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    4
                  </div>
                  <div>
                    <p className="mb-2">Access the admin panel using pin code: <span className="font-mono bg-secondary/50 px-2 py-1 rounded">767676</span></p>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-muted rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Important Notes</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>The admin PIN code is set to <span className="font-mono">767676</span> in the <code>AdminRoute.tsx</code> file</li>
                    <li>You can modify table structures by running additional SQL commands in the Supabase SQL Editor</li>
                    <li>Make sure to create at least one admin user by setting <code>is_admin</code> to <code>true</code> in the profiles table</li>
                    <li>To deploy, follow the instructions in your hosting provider (Vercel, Netlify, etc.)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 border rounded-lg p-6 bg-secondary/10">
        <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </div>
              <h3 className="font-semibold text-center mb-2">Supabase Docs</h3>
              <p className="text-sm text-center text-muted-foreground">Official documentation for all Supabase features</p>
              <div className="mt-4 flex justify-center">
                <Button asChild variant="outline" size="sm">
                  <a href="https://supabase.io/docs" target="_blank" rel="noopener noreferrer">
                    Visit Docs
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </div>
              <h3 className="font-semibold text-center mb-2">React Docs</h3>
              <p className="text-sm text-center text-muted-foreground">Learn more about React and how to use it</p>
              <div className="mt-4 flex justify-center">
                <Button asChild variant="outline" size="sm">
                  <a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noopener noreferrer">
                    Visit Docs
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </div>
              <h3 className="font-semibold text-center mb-2">GitHub Repository</h3>
              <p className="text-sm text-center text-muted-foreground">View source code and report issues</p>
              <div className="mt-4 flex justify-center">
                <Button asChild variant="outline" size="sm">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Visit Repo
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CloneInstructions;
