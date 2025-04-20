
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Users, Globe, Calendar, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const SuperAdminDashboard: React.FC = () => {
  const [venues, setVenues] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalVenues: 0,
    activeVenues: 0,
    totalUsers: 0,
    totalReservations: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch venues
        const { data: venuesData, error: venuesError } = await supabase
          .from("venues")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (venuesError) throw venuesError;
        
        // Get count of active venues
        const activeVenues = venuesData?.filter(v => v.status === "active").length || 0;
        
        // Fetch user count
        const { count: usersCount, error: usersError } = await supabase
          .from("profiles")
          .select("*", { count: 'exact', head: true });
        
        if (usersError) throw usersError;
        
        // Fetch reservation count
        const { count: reservationsCount, error: reservationsError } = await supabase
          .from("reservations")
          .select("*", { count: 'exact', head: true });
        
        if (reservationsError) throw reservationsError;
        
        setVenues(venuesData || []);
        setStats({
          totalVenues: venuesData?.length || 0,
          activeVenues,
          totalUsers: usersCount || 0,
          totalReservations: reservationsCount || 0
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({ 
          title: "Data fetch failed", 
          description: "Could not load dashboard data", 
          variant: "destructive" 
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const filteredVenues = venues.filter(venue => 
    venue.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    venue.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <img
              alt="GetReserve"
              src="https://getreserve.com/assets/logo.png"
              className="w-10 h-10 mr-4 rounded-full shadow"
              style={{ background: "#fff", border: "2px solid #FFD700" }}
            />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Super Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" onClick={() => navigate('/')}>Exit Admin Mode</Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                  <Globe className="h-6 w-6 text-blue-600 dark:text-blue-200" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Venues</p>
                  <h3 className="text-2xl font-bold">{stats.totalVenues}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
                  <Activity className="h-6 w-6 text-green-600 dark:text-green-200" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Venues</p>
                  <h3 className="text-2xl font-bold">{stats.activeVenues}</h3>
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
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
                  <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-amber-600 dark:text-amber-200" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Reservations</p>
                  <h3 className="text-2xl font-bold">{stats.totalReservations}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Venue Management</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input 
                  placeholder="Search venues..." 
                  className="pl-8" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Slug</th>
                    <th className="px-6 py-3">Owner</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Created</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center">Loading venues...</td>
                    </tr>
                  ) : filteredVenues.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center">No venues found</td>
                    </tr>
                  ) : (
                    filteredVenues.map((venue) => (
                      <tr key={venue.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{venue.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{venue.slug}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{venue.owner_email || "Unknown"}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            venue.status === "active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                            venue.status === "pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                            "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}>
                            {venue.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(venue.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => navigate(`/venues/${venue.slug}`)}
                            >
                              View Site
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => navigate(`/super-admin/venues/${venue.id}`)}
                            >
                              Manage
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
