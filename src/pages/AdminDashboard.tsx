
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Star, 
  ShoppingBag,
  ArrowLeft,
  BarChart3
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
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
import DashboardTable from '@/components/DashboardTable';

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-4"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Site
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Export Data</Button>
            <Button size="sm">Settings</Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <h3 className="text-xl font-semibold">$128,000</h3>
                  <p className="text-xs text-green-500">+12% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Bookings</p>
                  <h3 className="text-xl font-semibold">540</h3>
                  <p className="text-xs text-green-500">+8% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Guests</p>
                  <h3 className="text-xl font-semibold">1,024</h3>
                  <p className="text-xs text-green-500">+15% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <Star className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Average Rating</p>
                  <h3 className="text-xl font-semibold">4.8/5</h3>
                  <p className="text-xs text-green-500">+0.2 from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="guests">Guests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Revenue Trend</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                      <span>+12.5%</span>
                    </div>
                  </div>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        sales: { color: "#2563eb" },
                      }}
                    >
                      <LineChart data={salesData}>
                        <XAxis
                          dataKey="name"
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `$${value}`}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="var(--color-sales)"
                          strokeWidth={2}
                          dot={false}
                        />
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                                        Month
                                      </span>
                                      <span className="font-bold text-xs">
                                        {payload[0].payload.name}
                                      </span>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                                        Revenue
                                      </span>
                                      <span className="font-bold text-xs">
                                        ${payload[0].value}
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
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Booking Statistics</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                      <span>+8.3%</span>
                    </div>
                  </div>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        bookings: { color: "#8b5cf6" },
                      }}
                    >
                      <BarChart data={bookingsData}>
                        <XAxis
                          dataKey="name"
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Bar
                          dataKey="value"
                          fill="var(--color-bookings)"
                          radius={[4, 4, 0, 0]}
                        />
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                                        Month
                                      </span>
                                      <span className="font-bold text-xs">
                                        {payload[0].payload.name}
                                      </span>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                                        Bookings
                                      </span>
                                      <span className="font-bold text-xs">
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
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Sales Overview</h3>
                <div className="h-[400px]">
                  <ChartContainer
                    config={{
                      sales: { color: "#2563eb" },
                    }}
                  >
                    <LineChart data={salesData}>
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="var(--color-sales)"
                        strokeWidth={2}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bookings">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Booking Trends</h3>
                <div className="h-[400px]">
                  <ChartContainer
                    config={{
                      bookings: { color: "#8b5cf6" },
                    }}
                  >
                    <BarChart data={bookingsData}>
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Bar
                        dataKey="value"
                        fill="var(--color-bookings)"
                        radius={[4, 4, 0, 0]}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="guests">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Guest Statistics</h3>
                <div className="h-[400px]">
                  <ChartContainer
                    config={{
                      guests: { color: "#ec4899" },
                    }}
                  >
                    <LineChart data={guestData}>
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="var(--color-guests)"
                        strokeWidth={2}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Bookings Table */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Recent Bookings</h3>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <DashboardTable />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
