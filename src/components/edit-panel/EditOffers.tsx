
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import * as z from "zod";
import { 
  ImagePlus,
  Edit, 
  Save,
  Trash2, 
  Plus, 
  Tag,
  Calendar,
  Loader2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Define interface for Offer
interface Offer {
  id: string;
  title: string;
  description: string;
  valid_until: string;
  image_url: string | null;
  coupon_code: string;
}

// Create schema for form validation
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  valid_until: z.string().min(1, "Valid until date is required"),
  image_url: z.string().nullable(),
  coupon_code: z.string().min(3, "Coupon code must be at least 3 characters")
});

const EditOffers: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      valid_until: "",
      image_url: null,
      coupon_code: ""
    }
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching offers:', error);
        toast({
          title: "Error",
          description: "Failed to load offers. Please try again later.",
          variant: "destructive",
        });
        return;
      }
      
      setOffers(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      try {
        // Upload the image to Supabase storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('offers')
          .upload(fileName, file);
          
        if (uploadError) {
          throw uploadError;
        }
        
        // Get the public URL
        const { data: publicUrlData } = supabase.storage
          .from('offers')
          .getPublicUrl(fileName);
          
        const publicUrl = publicUrlData.publicUrl;
        
        // Set the image URL in the form
        form.setValue('image_url', publicUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        toast({
          title: "Upload Error",
          description: "Failed to upload image. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleEdit = (offer: Offer) => {
    setEditingId(offer.id);
    form.reset({
      title: offer.title,
      description: offer.description,
      valid_until: offer.valid_until,
      image_url: offer.image_url,
      coupon_code: offer.coupon_code
    });
    setImagePreview(offer.image_url);
  };

  const startAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    form.reset({
      title: "",
      description: "",
      valid_until: "",
      image_url: null,
      coupon_code: ""
    });
    setImagePreview(null);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    form.reset();
    setImagePreview(null);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      if (editingId !== null) {
        // Update existing offer
        const { error } = await supabase
          .from('offers')
          .update({
            title: values.title,
            description: values.description,
            valid_until: values.valid_until,
            image_url: values.image_url,
            coupon_code: values.coupon_code,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingId);
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Offer updated successfully",
        });
      } else {
        // Add new offer
        const { error } = await supabase
          .from('offers')
          .insert({
            title: values.title,
            description: values.description,
            valid_until: values.valid_until,
            image_url: values.image_url,
            coupon_code: values.coupon_code
          });
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "New offer added successfully",
        });
      }
      
      // Refresh the offers list
      fetchOffers();
      
      // Reset form and state
      setIsAdding(false);
      setEditingId(null);
      form.reset();
      setImagePreview(null);
    } catch (error) {
      console.error('Error saving offer:', error);
      toast({
        title: "Error",
        description: "Failed to save offer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Get the offer to find associated image
      const offerToDelete = offers.find(offer => offer.id === id);
      
      // Delete the database record
      const { error } = await supabase
        .from('offers')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // If there's an associated image URL and it's in our storage, delete it
      if (offerToDelete?.image_url) {
        try {
          const imageUrl = offerToDelete.image_url;
          const fileName = imageUrl.split('/').pop();
          
          // Only delete if it's in our storage (not an external URL)
          if (fileName && imageUrl.includes('supabase')) {
            await supabase.storage
              .from('offers')
              .remove([fileName]);
          }
        } catch (imageError) {
          console.error('Error deleting image:', imageError);
          // We don't want to fail the whole operation if just the image deletion fails
        }
      }
      
      // Remove from local state
      setOffers(offers.filter(offer => offer.id !== id));
      
      toast({
        title: "Success",
        description: "Offer deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting offer:', error);
      toast({
        title: "Error",
        description: "Failed to delete offer. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-medium">Loading offers...</p>
      </div>
    );
  }

  return (
    <div>
      {(isAdding || editingId !== null) ? (
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-semibold">
              {editingId !== null ? "Edit Offer" : "Add New Offer"}
            </h2>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Offer Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Weekend Special" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe the offer" 
                                {...field} 
                                className="resize-none h-20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name="valid_until"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Valid Until</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. May 31, 2025 or Ongoing" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="coupon_code"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Coupon Code</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. WEEKEND25" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="image_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Offer Image</FormLabel>
                            <div className="mt-1">
                              <Input
                                id="offer-image"
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                              />
                              <Label 
                                htmlFor="offer-image" 
                                className="cursor-pointer flex h-40 w-full items-center justify-center rounded-md border border-dashed border-gray-300 hover:border-gray-400"
                              >
                                {imagePreview ? (
                                  <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    className="h-full w-full object-cover rounded-md"
                                  />
                                ) : (
                                  <div className="flex flex-col items-center justify-center">
                                    <ImagePlus className="h-10 w-10 text-gray-400" />
                                    <span className="mt-2 text-sm text-gray-500">Click to add image</span>
                                  </div>
                                )}
                              </Label>
                              <Input 
                                {...field} 
                                value={field.value || ''}
                                onChange={(e) => {
                                  field.onChange(e.target.value ? e.target.value : null);
                                  setImagePreview(e.target.value);
                                }}
                                placeholder="Or enter image URL" 
                                className="mt-2"
                              />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="mt-6">
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              {editingId !== null ? "Save Changes" : "Add Offer"}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Special Offers</h2>
          <Button onClick={startAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Offer
          </Button>
        </div>
      )}

      {(!isAdding && editingId === null) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-gray-50 dark:bg-zinc-800/30 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
              <Tag className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">No Offers Yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating your first offer.
              </p>
              <Button onClick={startAddNew} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add New Offer
              </Button>
            </div>
          ) : (
            offers.map((offer) => (
              <Card key={offer.id} className="overflow-hidden group">
                <CardContent className="p-0 relative">
                  <div className="h-40 relative">
                    <img 
                      src={offer.image_url || '/placeholder.svg'} 
                      alt={offer.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Valid until: {offer.valid_until}</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-lg">{offer.title}</h3>
                    <p className="text-gray-500 mt-1 text-sm line-clamp-2">{offer.description}</p>
                    
                    <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-100 flex justify-between items-center">
                      <span className="font-mono text-sm">{offer.coupon_code}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => {
                          navigator.clipboard.writeText(offer.coupon_code);
                          toast({
                            title: "Copied",
                            description: "Coupon code copied to clipboard",
                          });
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                    
                    <div className="flex space-x-2 mt-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleEdit(offer)}
                      >
                        <Edit className="h-3 w-3 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="flex-1"
                        onClick={() => handleDelete(offer.id)}
                      >
                        <Trash2 className="h-3 w-3 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default EditOffers;
