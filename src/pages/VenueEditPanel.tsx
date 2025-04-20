
import React from 'react';
import { useParams } from 'react-router-dom';
import EditAboutContent from '@/components/edit-panel/EditAboutContent';
import EditVenueHighlights from '@/components/edit-panel/EditVenueHighlights';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VenueEditPanel: React.FC = () => {
  const { slug, section } = useParams<{ slug: string, section: string }>();
  const navigate = useNavigate();
  
  const renderSection = () => {
    switch (section) {
      case 'about':
        return <EditAboutContent venueSlug={slug} />;
      case 'highlights':
        return <EditVenueHighlights venueSlug={slug} />;
      case 'menu':
        return <div>Menu Editor Coming Soon</div>;
      case 'specials':
        return <div>Specials Editor Coming Soon</div>;
      case 'events':
        return <div>Events Editor Coming Soon</div>;
      default:
        return <div>Select a section to edit</div>;
    }
  };
  
  return (
    <div className="container py-8">
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-2"
              onClick={() => navigate(`/venues/${slug}/admin`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin Dashboard
            </Button>
            <CardTitle className="text-2xl">Edit {section?.charAt(0).toUpperCase() + section?.slice(1)}</CardTitle>
            <CardDescription>
              Make changes to your venue's {section} section
            </CardDescription>
          </div>
          <Button 
            onClick={() => navigate(`/venues/${slug}`)} 
            variant="outline"
          >
            Preview Site
          </Button>
        </CardHeader>
        <CardContent>
          {renderSection()}
        </CardContent>
      </Card>
    </div>
  );
};

export default VenueEditPanel;
