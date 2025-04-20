
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface EditAboutContentProps {
  venueSlug?: string;
}

interface AboutContent {
  id?: string;
  title: string;
  description: string;
  image_url: string;
  venue_slug?: string;
}

const EditAboutContent: React.FC<EditAboutContentProps> = ({ venueSlug }) => {
  const [about, setAbout] = useState<AboutContent>({
    title: "",
    description: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(false);

  // Load about content on mount
  useEffect(() => {
    const fetchAboutContent = async () => {
      setLoading(true);
      try {
        // Create a base query
        const { data, error } = await supabase
          .from("about_content")
          .select("*")
          .order("created_at", { ascending: true })
          .eq(venueSlug ? "venue_slug" : "id", venueSlug || "")
          .limit(1);

        if (error) {
          toast({ title: "Error", description: "Could not fetch about content", variant: "destructive" });
        }
        if (data && Array.isArray(data) && data.length > 0) {
          setAbout(data[0] as AboutContent);
        }
      } catch (error) {
        console.error("Error fetching about content:", error);
        toast({ title: "Error", description: "Could not fetch about content", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, [venueSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let resp;
      const updateData: AboutContent = {
        title: about.title,
        description: about.description,
        image_url: about.image_url,
      };

      if (venueSlug) {
        updateData.venue_slug = venueSlug;
      }

      if (about.id) {
        resp = await supabase
          .from("about_content")
          .update(updateData)
          .eq("id", about.id);
      } else {
        resp = await supabase
          .from("about_content")
          .insert([updateData]);
      }

      if (resp.error) {
        toast({ title: "Error", description: "Failed to save about content", variant: "destructive" });
      } else {
        toast({ title: "Saved", description: "About section updated" });
        if (!about.id && resp.data && resp.data[0]?.id) {
          setAbout({ ...about, id: resp.data[0].id });
        }
      }
    } catch (error) {
      console.error("Error saving about content:", error);
      toast({ title: "Error", description: "Failed to save about content", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="py-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Title</label>
            <Input
              value={about.title}
              onChange={e => setAbout(a => ({ ...a, title: e.target.value }))}
              required
              placeholder="About section title"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <Textarea
              value={about.description}
              onChange={e => setAbout(a => ({ ...a, description: e.target.value }))}
              required
              placeholder="Write about your restaurant..."
              rows={5}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Image URL</label>
            <Input
              value={about.image_url}
              onChange={e => setAbout(a => ({ ...a, image_url: e.target.value }))}
              placeholder="Paste an image link"
            />
            <div className="mt-2">
              {about.image_url && (
                <img
                  src={about.image_url}
                  alt="About Preview"
                  className="max-h-40 rounded shadow border"
                  style={{ maxWidth: 250, background: "#eee" }}
                />
              )}
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full">{loading ? "Saving..." : "Save"}</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditAboutContent;
