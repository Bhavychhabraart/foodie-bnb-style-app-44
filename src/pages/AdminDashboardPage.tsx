
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Users, Calendar, BarChart2, TrendingUp, 
  BarChart, UserCheck, Bell, Settings 
} from 'lucide-react';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Mock data for recent bookings
  const recentBookings = [
    { id: 1, name: 'John Smith', date: 'Apr 20, 2025', time: '7:00 PM', guests: 4, status: 'Confirmed' },
    { id: 2, name: 'Emily Johnson', date: 'Apr 19, 2025', time: '8:30 PM', guests: 2, status: 'Completed' },
    { id: 3, name: 'Michael Brown', date: 'Apr 19, 2025', time: '6:00 PM', guests: 6, status: 'Confirmed' },
    { id: 4, name: 'Sarah Wilson', date: 'Apr 18, 2025', time: '7:30 PM', guests: 3, status: 'Cancelled' },
    { id: 5, name: 'David Lee', date: 'Apr 18, 2025', time: '9:00 PM', guests: 2, status: 'Completed' },
  ];
  
  // Mock data for collaborations
  const collaborations = [
    { id: 1, name: 'FoodBlogger123', followers: '250K', status: 'Pending', platform: 'Instagram' },
    { id: 2, name: 'TastyTreats', followers: '500K', status: 'Confirmed', platform: 'YouTube' },
    { id: 3, name: 'CulinaryCreator', followers: '120K', status: 'Completed', platform: 'TikTok' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col bg-white h-screen border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-airbnb-red">Fine Dine Admin</h2>
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${activeTab === 'bookings' ? 'bg-airbnb-gray text-airbnb-red' : ''}`}
                  onClick={() => setActiveTab('bookings')}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Bookings
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${activeTab === 'analytics' ? 'bg-airbnb-gray text-airbnb-red' : ''}`}
                  onClick={() => setActiveTab('analytics')}
                >
                  <BarChart2 className="mr-2 h-5 w-5" />
                  Analytics
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${activeTab === 'influencers' ? 'bg-airbnb-gray text-airbnb-red' : ''}`}
                  onClick={() => setActiveTab('influencers')}
                >
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Influencers
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-5 w-5" />
                  Customers
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="mr-2 h-5 w-5" />
                  Notifications
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </Button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
            
            {/* Mobile tabs */}
            <div className="md:hidden mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="influencers">Influencers</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="bg-blue-50 p-3 rounded-full mr-4">
                    <Calendar className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-airbnb-light">Today's Bookings</p>
                    <h3 className="text-2xl font-bold">24</h3>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="bg-green-50 p-3 rounded-full mr-4">
                    <BarChart className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-airbnb-light">Total Revenue</p>
                    <h3 className="text-2xl font-bold">₹45,289</h3>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="bg-purple-50 p-3 rounded-full mr-4">
                    <UserCheck className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-airbnb-light">Avg. Rating</p>
                    <h3 className="text-2xl font-bold">4.8/5</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Bookings */}
            {activeTab === 'bookings' && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left p-3 text-sm font-medium text-airbnb-light">Name</th>
                          <th className="text-left p-3 text-sm font-medium text-airbnb-light">Date</th>
                          <th className="text-left p-3 text-sm font-medium text-airbnb-light">Time</th>
                          <th className="text-left p-3 text-sm font-medium text-airbnb-light">Guests</th>
                          <th className="text-left p-3 text-sm font-medium text-airbnb-light">Status</th>
                          <th className="text-left p-3 text-sm font-medium text-airbnb-light">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentBookings.map((booking) => (
                          <tr key={booking.id} className="border-b border-gray-100">
                            <td className="p-3">{booking.name}</td>
                            <td className="p-3">{booking.date}</td>
                            <td className="p-3">{booking.time}</td>
                            <td className="p-3">{booking.guests}</td>
                            <td className="p-3">
                              <span className={`inline-block px-2 py-1 rounded text-xs ${
                                booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                                booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="p-3">
                              <Button variant="ghost" className="h-8 px-2 text-airbnb-red">View</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Analytics */}
            {activeTab === 'analytics' && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Booking Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border rounded bg-gray-50">
                    <p className="text-airbnb-light">Analytics charts will appear here</p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Influencer Collaborations */}
            {activeTab === 'influencers' && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Influencer Collaborations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left p-3 text-sm font-medium text-airbnb-light">Influencer</th>
                          <th className="text-left p-3 text-sm font-medium text-airbnb-light">Platform</th>
                          <th className="text-left p-3 text-sm font-medium text-airbnb-light">Followers</th>
                          <th className="text-left p-3 text-sm font-medium text-airbnb-light">Status</th>
                          <th className="text-left p-3 text-sm font-medium text-airbnb-light">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {collaborations.map((collab) => (
                          <tr key={collab.id} className="border-b border-gray-100">
                            <td className="p-3">{collab.name}</td>
                            <td className="p-3">{collab.platform}</td>
                            <td className="p-3">{collab.followers}</td>
                            <td className="p-3">
                              <span className={`inline-block px-2 py-1 rounded text-xs ${
                                collab.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                                collab.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {collab.status}
                              </span>
                            </td>
                            <td className="p-3">
                              <Button variant="ghost" className="h-8 px-2 text-airbnb-red">View</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <Button className="mt-4 bg-airbnb-red text-white">
                    Add New Collaboration
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
