import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Users,
  Calendar,
  Settings,
  Edit,
  Home,
  Utensils,
  ChefHat,
  CalendarClock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/AuthProvider";

interface Venue {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  website: string | null;
  contact_email: string;
  contact_phone: string;
  owner_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const VenueAdminDashboard: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [stats, setStats] = useState({
    totalReservations: 0,
    todayReservations: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchVenueData = async () => {
      if (!slug) return;

      try {
        const { data: venueData, error: venueError } = await supabase
          .from("venues")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        if (venueError) throw venueError;
        if (!venueData) {
          toast({
            title: "Not found",
            description: "Venue not found",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        if (venueData.owner_id !== user?.id) {
          toast({
            title: "Access denied",
            description: "You don't have permission to access this venue",
            variant: "destructive",
          });
          navigate("/");
          return;
        }

        setVenue(venueData);

        const today = new Date().toISOString().split('T')[0];

        const { count: totalReservations } = await supabase
          .from("reservations")
          .select("*", { count: 'exact', head: true });

        const { count: todayReservations } = await supabase
          .from("reservations")
          .select("*", { count: 'exact', head: true })
          .eq("date", today);

        const { data: revenueData } = await supabase
          .from("reservations")
          .select("total_amount");

        const totalRevenue = revenueData?.reduce((sum: number, reservation: { total_amount: number }) => sum + Number(reservation.total_amount), 0) || 0;

        setStats({
          totalReservations: totalReservations || 0,
          todayReservations: todayReservations || 0,
          totalRevenue: totalRevenue,
        });
      } catch (error) {
        console.error("Error fetching venue data:", error);
        toast({
          title: "Error",
          description: "Failed to load venue data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenueData();
  }, [slug, user?.id, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading venue data...</p>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Venue Not Found</CardTitle>
            <CardDescription>
              The venue you're looking for doesn't exist or you don't have access to it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/")}>Return to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="mr-4"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {venue.name} Admin Panel
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate(`/venues/${slug}`)}
            >
              View Public Site
            </Button>
            <Button
              size="sm"
              onClick={() => navigate(`/venues/${slug}/edit/about`)}
            >
              Edit Site
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-200" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Reservations
                  </p>
                  <h3 className="text-2xl font-bold">{stats.totalReservations}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-green-600 dark:text-green-200" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Today's Reservations
                  </p>
                  <h3 className="text-2xl font-bold">{stats.todayReservations}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-200" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Revenue
                  </p>
                  <h3 className="text-2xl font-bold">
                    ${stats.totalRevenue.toLocaleString()}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Venue Management</CardTitle>
            <CardDescription>
              Manage your venue's content, reservations, and settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="content">
              <TabsList className="mb-6 grid grid-cols-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="reservations">Reservations</TabsTrigger>
                <TabsTrigger value="customers">Customers</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="content">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" 
                       onClick={() => navigate(`/venues/${slug}/edit/about`)}>
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-2">
                        <Home className="h-5 w-5 mr-2 text-gray-500" />
                        <h3 className="font-medium">About Section</h3>
                      </div>
                      <p className="text-sm text-gray-500">
                        Edit your venue's about section and main description
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                       onClick={() => navigate(`/venues/${slug}/edit/menu`)}>
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-2">
                        <Utensils className="h-5 w-5 mr-2 text-gray-500" />
                        <h3 className="font-medium">Menu</h3>
                      </div>
                      <p className="text-sm text-gray-500">
                        Manage your venue's menu items and categories
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                       onClick={() => navigate(`/venues/${slug}/edit/specials`)}>
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-2">
                        <ChefHat className="h-5 w-5 mr-2 text-gray-500" />
                        <h3 className="font-medium">Chef's Specials</h3>
                      </div>
                      <p className="text-sm text-gray-500">
                        Update your chef's special dishes and promotions
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                       onClick={() => navigate(`/venues/${slug}/edit/events`)}>
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-2">
                        <CalendarClock className="h-5 w-5 mr-2 text-gray-500" />
                        <h3 className="font-medium">Events & Experiences</h3>
                      </div>
                      <p className="text-sm text-gray-500">
                        Manage upcoming events and special experiences
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="reservations">
                <p className="text-center text-gray-500 py-8">
                  Reservation management coming soon...
                </p>
              </TabsContent>
              <TabsContent value="customers">
                <p className="text-center text-gray-500 py-8">
                  Customer management coming soon...
                </p>
              </TabsContent>
              <TabsContent value="settings">
                <p className="text-center text-gray-500 py-8">
                  Venue settings coming soon...
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default VenueAdminDashboard;
