
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PenSquare, Users, Calendar, Table } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/providers/AuthProvider';
import BookingsManagement from '@/components/admin/BookingsManagement';
import TablesManagement from '@/components/admin/TablesManagement';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-airbnb-dark">
      <header className="bg-airbnb-dark/50 backdrop-blur-lg border-b border-airbnb-gold/20">
        <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="sm" 
              className="mr-4 border-airbnb-gold/20 hover:bg-airbnb-gold/10" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold text-airbnb-light">Admin Dashboard</h1>
          </div>
          <div>
            <p className="text-sm text-airbnb-gold/80">Logged in as: {user?.email}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-airbnb-light">Booking Management</h2>
          <Card className="bg-airbnb-dark/50 border-airbnb-gold/20">
            <CardContent className="pt-6">
              <BookingsManagement />
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-airbnb-light">Table Management</h2>
          <Card className="bg-airbnb-dark/50 border-airbnb-gold/20">
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
    <Card className="bg-airbnb-dark/50 border-airbnb-gold/20 hover:border-airbnb-gold/40 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-airbnb-gold/80">
          {title}
        </CardTitle>
        <div className="h-9 w-9 rounded-lg bg-airbnb-gold/10 p-2 text-airbnb-gold">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-airbnb-light">{value}</div>
        {change && (
          <p className="text-xs text-airbnb-gold/60">
            <span className={change.startsWith('+') ? 'text-green-500' : ''}>
              {change}
            </span>
            {duration && ` ${duration}`}
          </p>
        )}
      </CardContent>
      {action && (
        <CardFooter className="pt-0">
          <Button 
            size="sm" 
            onClick={action} 
            variant="outline" 
            className="w-full border-airbnb-gold/20 hover:bg-airbnb-gold/10 text-airbnb-light"
          >
            Manage
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AdminDashboard;
