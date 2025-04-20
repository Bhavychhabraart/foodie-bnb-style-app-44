
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Loader2, Save, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AboutContent {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
}

interface EditAboutContentProps {
  venueSlug?: string;
}

const EditAboutContent: React.FC<EditAboutContentProps> = ({ venueSlug }) => {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAboutContent();
  }, [venueSlug]);

  const fetchAboutContent = async () => {
    if (!venueSlug) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setAboutContent(data);
        setTitle(data.title);
        setDescription(data.description);
        setImageUrl(data.image_url || '');
      }
    } catch (error) {
      console.error('Error fetching about content:', error);
      toast({
        title: 'Error',
        description: 'Failed to load about content. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title || !description) {
      toast({
        title: 'Missing information',
        description: 'Please provide both a title and description.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSaving(true);
      const updates = {
        title,
        description,
        image_url: imageUrl || null,
      };

      if (aboutContent?.id) {
        // Update existing content
        const { error } = await supabase
          .from('about_content')
          .update(updates)
          .eq('id', aboutContent.id);

        if (error) throw error;
      } else {
        // Create new content
        const { error } = await supabase
          .from('about_content')
          .insert([updates]);

        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: 'About content saved successfully!',
      });

      // Refresh content
      fetchAboutContent();
    } catch (error) {
      console.error('Error saving about content:', error);
      toast({
        title: 'Error',
        description: 'Failed to save about content. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>About Section</CardTitle>
            <CardDescription>
              Update the information about your venue that will be displayed to visitors.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="About Our Venue"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block mb-2 text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell visitors about your venue, its history, and what makes it special..."
                rows={5}
              />
            </div>
            
            <div>
              <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium">
                Image URL
              </label>
              <div className="flex gap-2">
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/your-image.jpg"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Provide a URL to an image that represents your venue.
              </p>
            </div>

            {imageUrl && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Image Preview</h3>
                <div className="border rounded-md p-2">
                  <img 
                    src={imageUrl} 
                    alt="About section preview" 
                    className="max-h-40 rounded-md mx-auto object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://lovable.dev/placeholder.svg";
                      toast({
                        title: "Image Error",
                        description: "The provided image URL could not be loaded.",
                        variant: "destructive"
                      });
                    }} 
                  />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSave}
              disabled={saving || !title || !description}
              className="w-full"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default EditAboutContent;
