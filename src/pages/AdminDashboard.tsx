
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PenSquare, Users, Calendar, Settings, Table } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/providers/AuthProvider';
import BookingsManagement from '@/components/admin/BookingsManagement';
import TablesManagement from '@/components/admin/TablesManagement';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 shadow">
        <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="outline" size="sm" className="mr-4" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Logged in as: {user?.email}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard 
            icon={<Users className="h-6 w-6" />}
            title="Users" 
            value="563" 
            change="+6%" 
            duration="Last 30 days"
          />
          <DashboardCard 
            icon={<Calendar className="h-6 w-6" />}
            title="Bookings" 
            value="128" 
            change="+12%" 
            duration="Last 7 days"
          />
          <DashboardCard 
            icon={<Table className="h-6 w-6" />}
            title="Tables" 
            value="24" 
            change="100%" 
            duration="Capacity"
          />
          <DashboardCard 
            icon={<PenSquare className="h-6 w-6" />}
            title="Website" 
            value="Edit" 
            change="" 
            action={() => navigate('/admin/site-editor')}
          />
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Booking Management</h2>
          <Card>
            <CardContent className="pt-6">
              <BookingsManagement />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Table Management</h2>
          <Card>
            <CardContent className="pt-6">
              <TablesManagement />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  duration?: string;
  action?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  icon, title, value, change, duration, action 
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </CardTitle>
        <div className="h-9 w-9 rounded-lg bg-gray-100 dark:bg-slate-700 p-2 text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && <p className="text-xs text-gray-500 dark:text-gray-400">
          <span className={change.startsWith('+') ? 'text-green-500' : ''}>
            {change}
          </span>
          {duration && ` ${duration}`}
        </p>}
      </CardContent>
      {action && (
        <CardFooter className="pt-0">
          <Button size="sm" onClick={action} variant="outline" className="w-full">
            Manage
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AdminDashboard;
