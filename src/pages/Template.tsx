
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Check, AlertCircle, Database, Key, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Template = () => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard.",
    });
    
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  const CodeBlock = ({ code, id }: { code: string, id: string }) => (
    <div className="relative">
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm my-4">
        <code>{code}</code>
      </pre>
      <Button 
        size="sm" 
        variant="outline" 
        className="absolute top-2 right-2"
        onClick={() => handleCopy(code, id)}
      >
        {copied === id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Restaurant/Event App Template</CardTitle>
          <CardDescription>
            A comprehensive guide to setting up this restaurant and events application with Supabase backend
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Follow these instructions step-by-step to configure your own instance of this application.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="setup">
            <TabsList className="mb-4">
              <TabsTrigger value="setup">Initial Setup</TabsTrigger>
              <TabsTrigger value="tables">Database Tables</TabsTrigger>
              <TabsTrigger value="auth">Authentication</TabsTrigger>
              <TabsTrigger value="deployment">Deployment</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[60vh]">
              <TabsContent value="setup" className="space-y-4">
                <h2 className="text-2xl font-semibold">Setting Up Your Project</h2>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-medium flex items-center gap-2">
                    <Database className="h-5 w-5" /> 1. Create a Supabase Project
                  </h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Sign up or log in to <a href="https://supabase.com" className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">Supabase</a></li>
                    <li>Create a new project and note down your project URL and anon key</li>
                    <li>These will be needed for connecting your application to Supabase</li>
                  </ol>

                  <h3 className="text-xl font-medium flex items-center gap-2 mt-8">
                    <Github className="h-5 w-5" /> 2. Clone or Create the Project
                  </h3>
                  <p>Clone this repository or create a new one based on this template:</p>
                  
                  <CodeBlock 
                    id="clone-command"
                    code="git clone <repository-url>\ncd <project-directory>\nnpm install"
                  />

                  <h3 className="text-xl font-medium flex items-center gap-2 mt-8">
                    <Key className="h-5 w-5" /> 3. Configure Environment Variables
                  </h3>
                  <p>Create a .env file in your project root with the following variables:</p>
                  
                  <CodeBlock 
                    id="env-vars"
                    code={`VITE_SUPABASE_URL=your-supabase-project-url\nVITE_SUPABASE_ANON_KEY=your-supabase-anon-key`}
                  />
                </div>
              </TabsContent>

              <TabsContent value="tables" className="space-y-4">
                <h2 className="text-2xl font-semibold">Database Tables Structure</h2>
                <p>Execute these SQL commands in the Supabase SQL editor to create the necessary tables:</p>

                <h3 className="text-xl font-medium mt-6">Events Table</h3>
                <CodeBlock 
                  id="events-table"
                  code={`CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  host TEXT NOT NULL,
  price TEXT NOT NULL,
  rating NUMERIC DEFAULT 4.8,
  reviews INTEGER DEFAULT 0,
  is_sold_out BOOLEAN DEFAULT false,
  venue TEXT NOT NULL,
  time TEXT NOT NULL,
  image_url TEXT,
  date TEXT NOT NULL,
  category TEXT DEFAULT 'home',
  description TEXT,
  featured BOOLEAN DEFAULT false,
  capacity TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);`}
                />

                <h3 className="text-xl font-medium mt-6">Offers Table</h3>
                <CodeBlock 
                  id="offers-table"
                  code={`CREATE TABLE public.offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  coupon_code TEXT NOT NULL,
  valid_until TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);`}
                />

                <h3 className="text-xl font-medium mt-6">Chefs Specials Table</h3>
                <CodeBlock 
                  id="chefs-specials-table"
                  code={`CREATE TABLE public.chefs_specials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  chef TEXT NOT NULL,
  price TEXT NOT NULL,
  rating NUMERIC DEFAULT 4.5,
  is_popular BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);`}
                />

                <h3 className="text-xl font-medium mt-6">Spotlight Table</h3>
                <CodeBlock 
                  id="spotlight-table"
                  code={`CREATE TABLE public.spotlight (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  capacity TEXT NOT NULL,
  price TEXT NOT NULL,
  rating NUMERIC DEFAULT 4.5,
  reviews INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);`}
                />

                <h3 className="text-xl font-medium mt-6">Profiles Table</h3>
                <CodeBlock 
                  id="profiles-table"
                  code={`CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  phone TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create trigger to create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
`}
                />

                <h3 className="text-xl font-medium mt-6">Reservations Tables</h3>
                <CodeBlock 
                  id="reservations-tables"
                  code={`CREATE TABLE public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  booking_type TEXT NOT NULL,
  special_requests TEXT,
  status TEXT DEFAULT 'pending',
  total_amount NUMERIC DEFAULT 0,
  user_id UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.restaurant_tables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_number INTEGER NOT NULL,
  capacity INTEGER NOT NULL,
  location TEXT NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.reservation_tables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id UUID REFERENCES public.reservations NOT NULL,
  table_id UUID REFERENCES public.restaurant_tables NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.reservation_guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id UUID REFERENCES public.reservations NOT NULL,
  name TEXT,
  gender TEXT NOT NULL,
  cover_charge NUMERIC DEFAULT 1000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);`}
                />
              </TabsContent>

              <TabsContent value="auth" className="space-y-4">
                <h2 className="text-2xl font-semibold">Setting Up Authentication</h2>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">1. Configure Auth Providers</h3>
                  <p>In your Supabase dashboard:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Go to Authentication → Providers</li>
                    <li>Enable Email provider</li>
                    <li>Configure additional providers as needed (Google, GitHub, etc.)</li>
                  </ol>

                  <h3 className="text-xl font-medium mt-6">2. Configure URL Settings</h3>
                  <p>Set up the Site URL and Redirect URLs:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Go to Authentication → URL Configuration</li>
                    <li>Set Site URL to your application's URL (e.g., http://localhost:5173 for development)</li>
                    <li>Add any additional redirect URLs needed</li>
                  </ol>

                  <h3 className="text-xl font-medium mt-6">3. Configure Row Level Security (RLS)</h3>
                  <p>Enable and configure Row Level Security for your tables to protect data:</p>
                  
                  <CodeBlock 
                    id="rls-policies"
                    code={`-- Enable RLS on tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chefs_specials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spotlight ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservation_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservation_guests ENABLE ROW LEVEL SECURITY;

-- Public read access for content tables
CREATE POLICY "Allow public read access for events" ON public.events
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access for offers" ON public.offers
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access for chefs_specials" ON public.chefs_specials
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access for spotlight" ON public.spotlight
  FOR SELECT USING (true);

-- User profile access
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Reservation policies
CREATE POLICY "Users can view own reservations" ON public.reservations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create reservations" ON public.reservations
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Admin policies (example)
CREATE POLICY "Admins can do everything" ON public.events
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );`}
                  />
                </div>
              </TabsContent>

              <TabsContent value="deployment" className="space-y-4">
                <h2 className="text-2xl font-semibold">Deploying Your Application</h2>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">1. Build the Application</h3>
                  <CodeBlock 
                    id="build-command"
                    code={`npm run build`}
                  />
                  
                  <h3 className="text-xl font-medium mt-6">2. Deployment Options</h3>
                  <h4 className="text-lg font-medium">Option A: Vercel</h4>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Connect your GitHub repository to Vercel</li>
                    <li>Configure environment variables in Vercel dashboard</li>
                    <li>Deploy from the Vercel dashboard</li>
                  </ol>
                  
                  <h4 className="text-lg font-medium mt-4">Option B: Netlify</h4>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Connect your GitHub repository to Netlify</li>
                    <li>Configure environment variables in Netlify dashboard</li>
                    <li>Set build command: <code>npm run build</code></li>
                    <li>Set publish directory: <code>dist</code></li>
                  </ol>
                  
                  <h3 className="text-xl font-medium mt-6">3. Update Supabase Configuration</h3>
                  <p>After deployment, update your Supabase project with your production URL:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Go to Authentication → URL Configuration</li>
                    <li>Update the Site URL to your production URL</li>
                    <li>Add your production URL to the Redirect URLs list</li>
                  </ol>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            For more detailed information, refer to the project documentation or contact support.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Template;
