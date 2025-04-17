
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminSiteEditor: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-4"
              onClick={() => navigate('/admin')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin Dashboard
            </Button>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Site Editor</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" onClick={() => navigate('/')}>Preview Site</Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SiteEditorCard 
            title="Content Management"
            description="Manage site content, images, and text"
            action={() => navigate('/edit-panel')}
          />
          
          <SiteEditorCard 
            title="Design Settings" 
            description="Customize colors, fonts, and layout"
          />
          
          <SiteEditorCard 
            title="Navigation" 
            description="Edit menus and navigation structure"
          />
          
          <SiteEditorCard 
            title="SEO Settings" 
            description="Optimize for search engines"
          />
          
          <SiteEditorCard 
            title="Integrations" 
            description="Connect with third-party services"
          />
          
          <SiteEditorCard 
            title="Advanced Settings" 
            description="Custom code and technical configurations"
          />
        </div>
      </main>
    </div>
  );
};

// Card component for site editor options
const SiteEditorCard: React.FC<{
  title: string;
  description: string;
  action?: () => void;
}> = ({ title, description, action }) => {
  return (
    <div className="bg-white dark:bg-slate-800 shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{description}</p>
        <div className="mt-4">
          <Button 
            variant="default" 
            size="sm"
            onClick={action}
            className="w-full"
          >
            Manage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSiteEditor;
