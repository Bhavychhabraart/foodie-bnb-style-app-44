
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Award,
  Clock,
  Utensils,
  PlusCircle,
  Loader2,
  Trash2,
  Save,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Highlight {
  id: string;
  title: string;
  description: string;
  icon_name: string;
}

interface EditVenueHighlightsProps {
  venueSlug?: string;
}

const ICON_OPTIONS = [
  { value: 'Award', label: 'Award', icon: <Award className="h-5 w-5" /> },
  { value: 'Clock', label: 'Clock', icon: <Clock className="h-5 w-5" /> },
  { value: 'Utensils', label: 'Utensils', icon: <Utensils className="h-5 w-5" /> },
];

const EditVenueHighlights: React.FC<EditVenueHighlightsProps> = ({ venueSlug }) => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('Award');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchHighlights();
  }, [venueSlug]);

  const fetchHighlights = async () => {
    if (!venueSlug) return;

    try {
      setLoading(true);
      // In a real implementation, we would filter by venue_id
      // This is a simplified version that just gets all highlights
      const { data, error } = await supabase
        .from('highlights')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHighlights(data || []);
    } catch (error) {
      console.error('Error fetching highlights:', error);
      toast({
        title: 'Error',
        description: 'Failed to load highlights. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddHighlight = async () => {
    if (!newTitle || !newDescription) {
      toast({
        title: 'Missing information',
        description: 'Please provide both a title and description.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSaving(true);
      const newHighlight = {
        title: newTitle,
        description: newDescription,
        icon_name: selectedIcon,
      };

      const { data, error } = await supabase
        .from('highlights')
        .insert([newHighlight])
        .select();

      if (error) throw error;

      setHighlights([...(data || []), ...highlights]);
      setNewTitle('');
      setNewDescription('');
      setSelectedIcon('Award');

      toast({
        title: 'Success',
        description: 'Highlight added successfully!',
      });
    } catch (error) {
      console.error('Error adding highlight:', error);
      toast({
        title: 'Error',
        description: 'Failed to add highlight. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteHighlight = async (id: string) => {
    try {
      const { error } = await supabase
        .from('highlights')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setHighlights(highlights.filter(highlight => highlight.id !== id));
      
      toast({
        title: 'Success',
        description: 'Highlight deleted successfully!',
      });
    } catch (error) {
      console.error('Error deleting highlight:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete highlight. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getIconComponent = (iconName: string) => {
    const option = ICON_OPTIONS.find(option => option.value === iconName);
    return option ? option.icon : <Award className="h-5 w-5" />;
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Highlight</CardTitle>
          <CardDescription>
            Highlights are key features of your venue that you want to showcase.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="mb-2 text-sm font-medium">Icon</div>
            <div className="flex gap-2">
              {ICON_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={selectedIcon === option.value ? "default" : "outline"}
                  className="flex items-center gap-2"
                  onClick={() => setSelectedIcon(option.value)}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              placeholder="e.g. Award-Winning Chefs"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="e.g. Our culinary team has been recognized with prestigious awards for their innovative approach."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleAddHighlight}
            disabled={saving || !newTitle || !newDescription}
            className="w-full"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Highlight
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-4">Current Highlights</h3>
        
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : highlights.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
              <AlertCircle className="h-10 w-10 mb-2" />
              <p>No highlights added yet</p>
              <p className="text-sm">Add your first highlight using the form above.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {highlights.map((highlight) => (
              <Card key={highlight.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full mr-2">
                        {getIconComponent(highlight.icon_name)}
                      </div>
                      <h4 className="font-semibold">{highlight.title}</h4>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive"
                      onClick={() => handleDeleteHighlight(highlight.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditVenueHighlights;
