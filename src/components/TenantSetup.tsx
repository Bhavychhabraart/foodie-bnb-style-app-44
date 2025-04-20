
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/AuthProvider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Match Database type for venues
interface Venue {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  website: string | null;
  contact_email: string;
  contact_phone: string;
  owner_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const tenantSchema = z.object({
  name: z.string().min(2, "Venue name must be at least 2 characters"),
  slug: z.string()
    .min(3, "Slug must be at least 3 characters")
    .max(30, "Slug cannot exceed 30 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  description: z.string().optional(),
  address: z.string().min(5, "Please enter a valid address"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  contact_email: z.string().email("Please enter a valid email address"),
  contact_phone: z.string().min(6, "Please enter a valid phone number"),
});

type TenantFormValues = z.infer<typeof tenantSchema>;

const TenantSetup: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const form = useForm<TenantFormValues>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      address: "",
      website: "",
      contact_email: "",
      contact_phone: "",
    },
  });

  const onSubmit = async (values: TenantFormValues) => {
    if (!user) {
      toast({
        title: "Authentication error",
        description: "You must be logged in to create a venue",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // First check if slug is available
      const { data: existingVenue } = await supabase
        .from("venues")
        .select("slug")
        .eq("slug", values.slug)
        .maybeSingle();

      if (existingVenue) {
        form.setError("slug", {
          message: "This slug is already taken. Please choose another one."
        });
        setIsLoading(false);
        return;
      }

      // Insert new venue
      const { data: venue, error } = await supabase
        .from("venues")
        .insert({
          name: values.name,
          slug: values.slug,
          description: values.description || "",
          address: values.address,
          website: values.website || null,
          contact_email: values.contact_email,
          contact_phone: values.contact_phone,
          owner_id: user.id,
          status: "active"
        })
        .select()
        .single();

      if (error) throw error;

      // Update user's profile to set current_venue_id
      await supabase
        .from("profiles")
        .update({ current_venue_id: venue.id })
        .eq("id", user.id);

      toast({
        title: "Venue created",
        description: `Your venue "${values.name}" has been created successfully!`
      });

      // Navigate to venue setup wizard
      navigate(`/venues/${values.slug}/setup`);
    } catch (error: any) {
      console.error("Error creating venue:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create venue",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    form.setValue("name", nameValue);
    const currentSlug = form.getValues("slug");

    // Only auto-generate slug if user hasn't manually changed slug field
    if (!form.formState.dirtyFields.slug) {
      const slugValue = nameValue
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      form.setValue("slug", slugValue);
    }
  };

  return (
    <div className="container max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create Your Venue</CardTitle>
          <CardDescription>
            Set up your venue's profile. This information will be used to create your custom site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => handleNameChange(e)}
                        placeholder="e.g. Fine Dine Restaurant"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Slug</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-gray-500">getreserve.com/</div>
                        <Input
                          {...field}
                          className="flex-1"
                          placeholder="your-venue-name"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Tell us about your venue..."
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="123 Restaurant St." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://yourwebsite.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="contact_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="contact@yourvenue.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="+1 (555) 123-4567" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Venue"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantSetup;

