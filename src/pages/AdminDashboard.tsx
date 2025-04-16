
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Star, 
  ArrowLeft,
  Columns,
  LayoutGrid
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChartContainer,
  ChartTooltip
} from '@/components/ui/chart';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';
import BookingsManagement from '@/components/admin/BookingsManagement';
import TablesManagement from '@/components/admin/TablesManagement';

// Mock data for charts and stats
const salesData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 7000 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 8000 },
  { name: 'Jul', value: 10000 },
  { name: 'Aug', value: 9000 },
  { name: 'Sep', value: 11000 },
  { name: 'Oct', value: 12000 },
  { name: 'Nov', value: 15000 },
  { name: 'Dec', value: 18000 },
];

const bookingsData = [
  { name: 'Jan', value: 20 },
  { name: 'Feb', value: 15 },
  { name: 'Mar', value: 25 },
  { name: 'Apr', value: 35 },
  { name: 'May', value: 30 },
  { name: 'Jun', value: 40 },
  { name: 'Jul', value: 50 },
  { name: 'Aug', value: 45 },
  { name: 'Sep', value: 55 },
  { name: 'Oct', value: 60 },
  { name: 'Nov', value: 75 },
  { name: 'Dec', value: 90 },
];

const guestData = [
  { name: 'Jan', value: 35 },
  { name: 'Feb', value: 28 },
  { name: 'Mar', value: 42 },
  { name: 'Apr', value: 58 },
  { name: 'May', value: 50 },
  { name: 'Jun', value: 65 },
  { name: 'Jul', value: 80 },
  { name: 'Aug', value: 75 },
  { name: 'Sep', value: 88 },
  { name: 'Oct', value: 95 },
  { name: 'Nov', value: 110 },
  { name: 'Dec', value: 135 },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <header className="bg-[#121212] border-b border-airbnb-gold/20">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-4 text-airbnb-light hover:bg-airbnb-gold/10"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Site
            </Button>
            <h1 className="text-xl font-semibold text-airbnb-light">Admin Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-airbnb-gold/20 text-airbnb-light"
              onClick={() => navigate('/edit')}>
              Content Editor
            </Button>
            <Button size="sm" className="bg-airbnb-gold text-airbnb-light hover:bg-airbnb-gold/90">Settings</Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-[#1E1E1E] border border-airbnb-gold/20 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-airbnb-gold/10 p-3 rounded-full mr-4">
                  <DollarSign className="h-6 w-6 text-airbnb-gold" />
                </div>
                <div>
                  <p className="text-sm text-airbnb-light/70">Total Revenue</p>
                  <h3 className="text-xl font-semibold text-airbnb-light">$128,000</h3>
                  <p className="text-xs text-green-500">+12% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1E1E1E] border border-airbnb-gold/20 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-airbnb-gold/10 p-3 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-airbnb-gold" />
                </div>
                <div>
                  <p className="text-sm text-airbnb-light/70">Total Bookings</p>
                  <h3 className="text-xl font-semibold text-airbnb-light">540</h3>
                  <p className="text-xs text-green-500">+8% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1E1E1E] border border-airbnb-gold/20 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-airbnb-gold/10 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-airbnb-gold" />
                </div>
                <div>
                  <p className="text-sm text-airbnb-light/70">Total Guests</p>
                  <h3 className="text-xl font-semibold text-airbnb-light">1,024</h3>
                  <p className="text-xs text-green-500">+15% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1E1E1E] border border-airbnb-gold/20 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-airbnb-gold/10 p-3 rounded-full mr-4">
                  <Star className="h-6 w-6 text-airbnb-gold" />
                </div>
                <div>
                  <p className="text-sm text-airbnb-light/70">Average Rating</p>
                  <h3 className="text-xl font-semibold text-airbnb-light">4.8/5</h3>
                  <p className="text-xs text-green-500">+0.2 from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Admin Tabs */}
        <Tabs defaultValue="dashboard" className="mb-8">
          <TabsList className="mb-4 bg-[#1E1E1E] border border-airbnb-gold/20 w-full justify-start overflow-x-auto">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-airbnb-gold data-[state=active]:text-airbnb-light">
              <LayoutGrid className="h-4 w-4 mr-2" /> Dashboard
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-airbnb-gold data-[state=active]:text-airbnb-light">
              <Calendar className="h-4 w-4 mr-2" /> Reservations
            </TabsTrigger>
            <TabsTrigger value="tables" className="data-[state=active]:bg-airbnb-gold data-[state=active]:text-airbnb-light">
              <Columns className="h-4 w-4 mr-2" /> Tables
            </TabsTrigger>
          </TabsList>
          
          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-airbnb-light">Analytics Dashboard</h2>
              
              <Tabs defaultValue="overview" className="mb-8">
                <TabsList className="mb-4 bg-[#1E1E1E] border border-airbnb-gold/20">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-airbnb-gold data-[state=active]:text-airbnb-light">Overview</TabsTrigger>
                  <TabsTrigger value="sales" className="data-[state=active]:bg-airbnb-gold data-[state=active]:text-airbnb-light">Sales</TabsTrigger>
                  <TabsTrigger value="bookings" className="data-[state=active]:bg-airbnb-gold data-[state=active]:text-airbnb-light">Bookings</TabsTrigger>
                  <TabsTrigger value="guests" className="data-[state=active]:bg-airbnb-gold data-[state=active]:text-airbnb-light">Guests</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-[#1E1E1E] border border-airbnb-gold/20 shadow-md">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium text-airbnb-light">Revenue Trend</h3>
                          <div className="flex items-center text-sm text-green-500">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            <span>+12.5%</span>
                          </div>
                        </div>
                        <div className="h-[300px] w-full">
                          <ChartContainer
                            config={{
                              sales: { color: "#B18E72" },
                            }}
                            className="w-full h-full"
                          >
                            <LineChart data={salesData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                              <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                padding={{ left: 10, right: 10 }}
                              />
                              <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value}`}
                                width={60}
                              />
                              <Line
                                type="monotone"
                                dataKey="value"
                                stroke="var(--color-sales)"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 5 }}
                              />
                              <ChartTooltip
                                content={({ active, payload }) => {
                                  if (active && payload && payload.length) {
                                    return (
                                      <div className="rounded-lg border bg-[#121212] border-airbnb-gold/20 p-2 shadow-sm">
                                        <div className="grid grid-cols-2 gap-2">
                                          <div className="flex flex-col">
                                            <span className="text-[0.70rem] uppercase text-airbnb-light/70">
                                              Month
                                            </span>
                                            <span className="font-bold text-xs text-airbnb-light">
                                              {payload[0].payload.name}
                                            </span>
                                          </div>
                                          <div className="flex flex-col">
                                            <span className="text-[0.70rem] uppercase text-airbnb-light/70">
                                              Revenue
                                            </span>
                                            <span className="font-bold text-xs text-airbnb-light">
                                              ${payload[0].value.toLocaleString()}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                            </LineChart>
                          </ChartContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-[#1E1E1E] border border-airbnb-gold/20 shadow-md">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium text-airbnb-light">Booking Statistics</h3>
                          <div className="flex items-center text-sm text-green-500">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            <span>+8.3%</span>
                          </div>
                        </div>
                        <div className="h-[300px] w-full">
                          <ChartContainer
                            config={{
                              bookings: { color: "#B18E72" },
                            }}
                            className="w-full h-full"
                          >
                            <BarChart data={bookingsData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                              <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                padding={{ left: 10, right: 10 }}
                              />
                              <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                width={30}
                              />
                              <Bar
                                dataKey="value"
                                fill="var(--color-bookings)"
                                radius={[4, 4, 0, 0]}
                                barSize={20}
                              />
                              <ChartTooltip
                                content={({ active, payload }) => {
                                  if (active && payload && payload.length) {
                                    return (
                                      <div className="rounded-lg border bg-[#121212] border-airbnb-gold/20 p-2 shadow-sm">
                                        <div className="grid grid-cols-2 gap-2">
                                          <div className="flex flex-col">
                                            <span className="text-[0.70rem] uppercase text-airbnb-light/70">
                                              Month
                                            </span>
                                            <span className="font-bold text-xs text-airbnb-light">
                                              {payload[0].payload.name}
                                            </span>
                                          </div>
                                          <div className="flex flex-col">
                                            <span className="text-[0.70rem] uppercase text-airbnb-light/70">
                                              Bookings
                                            </span>
                                            <span className="font-bold text-xs text-airbnb-light">
                                              {payload[0].value}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                            </BarChart>
                          </ChartContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="sales">
                  <Card className="bg-[#1E1E1E] border border-airbnb-gold/20 shadow-md">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium text-airbnb-light mb-4">Sales Overview</h3>
                      <div className="h-[400px] w-full">
                        <ChartContainer
                          config={{
                            sales: { color: "#B18E72" },
                          }}
                          className="w-full h-full"
                        >
                          <LineChart 
                            data={salesData} 
                            margin={{ top: 20, right: 30, bottom: 20, left: 40 }}
                          >
                            <XAxis
                              dataKey="name"
                              stroke="#888888"
                              fontSize={12}
                              tickLine={false}
                              axisLine={false}
                              padding={{ left: 10, right: 10 }}
                            />
                            <YAxis
                              stroke="#888888"
                              fontSize={12}
                              tickLine={false}
                              axisLine={false}
                              tickFormatter={(value) => `$${value}`}
                              width={60}
                            />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="var(--color-sales)"
                              strokeWidth={2}
                              dot={{ r: 4, strokeWidth: 2 }}
                              activeDot={{ r: 6, strokeWidth: 2 }}
                            />
                            <ChartTooltip />
                          </LineChart>
                        </ChartContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="bookings">
                  <Card className="bg-[#1E1E1E] border border-airbnb-gold/20 shadow-md">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium text-airbnb-light mb-4">Booking Trends</h3>
                      <div className="h-[400px] w-full">
                        <ChartContainer
                          config={{
                            bookings: { color: "#B18E72" },
                          }}
                          className="w-full h-full"
                        >
                          <BarChart 
                            data={bookingsData}
                            margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
                          >
                            <XAxis
                              dataKey="name"
                              stroke="#888888"
                              fontSize={12}
                              tickLine={false}
                              axisLine={false}
                              padding={{ left: 10, right: 10 }}
                            />
                            <YAxis
                              stroke="#888888"
                              fontSize={12}
                              tickLine={false}
                              axisLine={false}
                              width={30}
                            />
                            <Bar
                              dataKey="value"
                              fill="var(--color-bookings)"
                              radius={[4, 4, 0, 0]}
                              barSize={30}
                            />
                            <ChartTooltip />
                          </BarChart>
                        </ChartContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="guests">
                  <Card className="bg-[#1E1E1E] border border-airbnb-gold/20 shadow-md">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium text-airbnb-light mb-4">Guest Statistics</h3>
                      <div className="h-[400px] w-full">
                        <ChartContainer
                          config={{
                            guests: { color: "#B18E72" },
                          }}
                          className="w-full h-full"
                        >
                          <LineChart 
                            data={guestData}
                            margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
                          >
                            <XAxis
                              dataKey="name"
                              stroke="#888888"
                              fontSize={12}
                              tickLine={false}
                              axisLine={false}
                              padding={{ left: 10, right: 10 }}
                            />
                            <YAxis
                              stroke="#888888"
                              fontSize={12}
                              tickLine={false}
                              axisLine={false}
                              width={30}
                            />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="var(--color-guests)"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                            <ChartTooltip />
                          </LineChart>
                        </ChartContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
          
          {/* Bookings Management Tab */}
          <TabsContent value="bookings">
            <Card className="bg-[#1E1E1E] border border-airbnb-gold/20 shadow-md">
              <CardContent className="pt-6">
                <BookingsManagement />
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tables Management Tab */}
          <TabsContent value="tables">
            <Card className="bg-[#1E1E1E] border border-airbnb-gold/20 shadow-md">
              <CardContent className="pt-6">
                <TablesManagement />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
