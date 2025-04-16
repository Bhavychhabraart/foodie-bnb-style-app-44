import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  ImagePlus,
  Edit, 
  Save,
  Trash2, 
  Plus, 
  Star,
  MessageSquare,
  Loader2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { uploadFile } from '@/utils/storage-helpers';
import { Testimonial } from '@/types/supabase';

// Create schema for form validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  review_text: z.string().min(10, "Review text must be at least 10 characters"),
  avatar_url: z.string().optional(),
  is_approved: z.boolean().default(true)
});

const EditTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      rating: 5,
      review_text: "",
      avatar_url: "",
      is_approved: true
    }
  });

  // Fetch testimonials from Supabase
  const fetchTestimonials = async () => {
    setIsFetching(true);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setTestimonials(data as Testimonial[]);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: "Error",
        description: "Failed to load testimonials",
        variant: "destructive",
      });
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      try {
        // Upload avatar to Supabase storage
        const fileUrl = await uploadFile(file, 'testimonial-avatars');
        if (fileUrl) {
          setAvatarPreview(fileUrl);
          form.setValue('avatar_url', fileUrl);
        } else {
          toast({
            title: "Error",
            description: "Failed to upload image",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
        toast({
          title: "Error",
          description: "Failed to upload image",
          variant: "destructive",
        });
      }
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    form.reset({
      name: testimonial.name,
      rating: testimonial.rating,
      review_text: testimonial.review_text,
      avatar_url: testimonial.avatar_url || '',
      is_approved: testimonial.is_approved
    });
    setAvatarPreview(testimonial.avatar_url);
  };

  const startAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    form.reset({
      name: "",
      rating: 5,
      review_text: "",
      avatar_url: "",
      is_approved: true
    });
    setAvatarPreview(null);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    form.reset();
    setAvatarPreview(null);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      if (editingId !== null) {
        // Update existing testimonial
        const { error } = await supabase
          .from('testimonials')
          .update({
            name: values.name,
            rating: values.rating,
            review_text: values.review_text,
            avatar_url: values.avatar_url || null,
            is_approved: values.is_approved
          })
          .eq('id', editingId);
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Testimonial updated successfully",
        });
      } else {
        // Add new testimonial
        const { error } = await supabase
          .from('testimonials')
          .insert({
            name: values.name,
            rating: values.rating,
            review_text: values.review_text,
            avatar_url: values.avatar_url || null,
            is_approved: values.is_approved
          });
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "New testimonial added successfully",
        });
      }
      
      // Refetch the testimonials to update the list
      await fetchTestimonials();
      
      setIsAdding(false);
      setEditingId(null);
      form.reset();
      setAvatarPreview(null);
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to save testimonial",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
      
      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
    }
  };

  const toggleApproval = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_approved: !currentStatus })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update the local state
      setTestimonials(testimonials.map(testimonial => 
        testimonial.id === id 
          ? {...testimonial, is_approved: !currentStatus} 
          : testimonial
      ));
      
      toast({
        title: "Success",
        description: `Testimonial ${!currentStatus ? 'approved' : 'unapproved'} successfully`,
      });
    } catch (error) {
      console.error('Error updating approval status:', error);
      toast({
        title: "Error",
        description: "Failed to update testimonial status",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      {(isAdding || editingId !== null) ? (
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-semibold">
              {editingId !== null ? "Edit Testimonial" : "Add New Testimonial"}
            </h2>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="mr-4">
                          <Input
                            id="avatar-upload"
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                          />
                          <Label 
                            htmlFor="avatar-upload" 
                            className="cursor-pointer block"
                          >
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={avatarPreview || ''} alt="Avatar" />
                              <AvatarFallback className="bg-gray-200 text-gray-500">
                                <ImagePlus className="h-6 w-6" />
                              </AvatarFallback>
                            </Avatar>
                          </Label>
                        </div>
                        
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="avatar_url"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Avatar URL</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="https://example.com/avatar.jpg" 
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e.target.value);
                                      setAvatarPreview(e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Guest Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Sarah Johnson" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Rating (1-5)</FormLabel>
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => field.onChange(star)}
                                  className="focus:outline-none"
                                >
                                  <Star 
                                    className={`h-8 w-8 ${star <= field.value ? 'fill-current text-yellow-500' : 'text-gray-300'}`} 
                                  />
                                </button>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="review_text"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Testimonial Text</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter guest review" 
                                className="resize-none h-24" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="is_approved"
                        render={({ field }) => (
                          <FormItem className="mt-4 flex items-center space-x-2">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="h-4 w-4"
                              />
                            </FormControl>
                            <FormLabel className="font-medium">Approve Testimonial</FormLabel>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="md:pl-6 md:border-l border-gray-100">
                      <h3 className="text-lg font-medium mb-4">Preview</h3>
                      
                      <Card className="border-none shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex justify-between mb-4">
                            <div className="flex items-center">
                              <Avatar className="h-12 w-12 mr-4">
                                <AvatarImage 
                                  src={avatarPreview || ''} 
                                  alt={form.watch('name')} 
                                />
                                <AvatarFallback>
                                  {form.watch('name').substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{form.watch('name') || 'Guest Name'}</h3>
                              </div>
                            </div>
                          </div>
                          <div className="flex mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-4 w-4 ${star <= form.watch('rating') ? 'fill-current text-yellow-500' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-gray-700">
                            {form.watch('review_text') || 'Testimonial text will appear here...'}
                          </p>
                          
                          {!form.watch('is_approved') && (
                            <div className="mt-3 text-xs text-amber-600 font-medium">
                              This testimonial will not be visible on the website until approved
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <div className="mt-6">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              {editingId !== null ? "Save Changes" : "Add Testimonial"}
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
          <h2 className="text-2xl font-semibold">Guest Testimonials</h2>
          <Button onClick={startAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Testimonial
          </Button>
        </div>
      )}

      {isFetching ? (
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 mx-auto animate-spin text-gray-500" />
          <p className="mt-2 text-gray-500">Loading testimonials...</p>
        </div>
      ) : testimonials.length === 0 && !isAdding && !editingId ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <MessageSquare className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">No testimonials yet</h3>
          <p className="text-gray-500 mt-1">Add your first testimonial to showcase guest feedback</p>
          <Button onClick={startAddNew} className="mt-4">
            Add Testimonial
          </Button>
        </div>
      ) : (!isAdding && editingId === null) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className={`border-none shadow-sm ${!testimonial.is_approved ? 'bg-gray-50' : ''}`}
            >
              <CardContent className="p-6">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar_url || ''} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{testimonial.name}</h3>
                      {!testimonial.is_approved && (
                        <span className="text-xs text-amber-600 font-medium">Pending approval</span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleEdit(testimonial)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={`h-8 w-8 p-0 ${testimonial.is_approved ? 'text-amber-500 hover:text-amber-600' : 'text-green-500 hover:text-green-600'}`}
                      onClick={() => toggleApproval(testimonial.id, testimonial.is_approved)}
                    >
                      {testimonial.is_approved ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18.6 18H5.4A1.4 1.4 0 0 1 4 16.6V7.4A1.4 1.4 0 0 1 5.4 6h13.2A1.4 1.4 0 0 1 20 7.4v9.2a1.4 1.4 0 0 1-1.4 1.4Z"/>
                          <line x1="16" x2="2" y1="2" y2="16"/>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 12l2 2 4-4"/>
                          <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7z"/>
                        </svg>
                      )}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(testimonial.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-4 w-4 ${star <= testimonial.rating ? 'fill-current text-yellow-500' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700">{testimonial.review_text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditTestimonials;
