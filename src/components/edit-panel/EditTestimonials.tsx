
import React, { useState } from 'react';
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
  MessageSquare
} from 'lucide-react';

// Define interface for Testimonial
interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  text: string;
}

// Create schema for form validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  date: z.string().min(3, "Date is required"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  text: z.string().min(10, "Review text must be at least 10 characters"),
  avatar: z.string().url("Must be a valid URL"),
});

// Mock data
const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "March 2025",
    rating: 5,
    text: "Absolutely incredible dining experience! The truffle risotto was divine, and the service was impeccable. The ambiance makes it perfect for special occasions."
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    date: "February 2025",
    rating: 4,
    text: "Great food and atmosphere. The beef tenderloin was cooked to perfection. Only giving 4 stars because we had to wait a bit for our table despite having a reservation."
  },
  {
    id: 3,
    name: "Emma Roberts",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    date: "January 2025",
    rating: 5,
    text: "Our anniversary dinner was spectacular! The tasting menu with wine pairings was worth every penny. The staff made us feel so special."
  }
];

const EditTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: "",
      rating: 5,
      text: "",
      avatar: ""
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        form.setValue('avatar', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    form.reset({
      name: testimonial.name,
      date: testimonial.date,
      rating: testimonial.rating,
      text: testimonial.text,
      avatar: testimonial.avatar
    });
    setAvatarPreview(testimonial.avatar);
  };

  const startAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    form.reset({
      name: "",
      date: "",
      rating: 5,
      text: "",
      avatar: ""
    });
    setAvatarPreview(null);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    form.reset();
    setAvatarPreview(null);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (editingId !== null) {
      // Update existing
      setTestimonials(testimonials.map(testimonial => 
        testimonial.id === editingId ? {
          ...testimonial,
          name: values.name,
          date: values.date,
          rating: values.rating,
          text: values.text,
          avatar: values.avatar
        } : testimonial
      ));
      toast({
        title: "Success",
        description: "Testimonial updated successfully",
      });
    } else {
      // Add new
      const newTestimonial: Testimonial = {
        id: Date.now(),
        name: values.name,
        date: values.date,
        rating: values.rating,
        text: values.text,
        avatar: values.avatar
      };
      setTestimonials([...testimonials, newTestimonial]);
      toast({
        title: "Success",
        description: "New testimonial added successfully",
      });
    }
    
    setIsAdding(false);
    setEditingId(null);
    form.reset();
    setAvatarPreview(null);
  };

  const handleDelete = (id: number) => {
    setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
    toast({
      title: "Success",
      description: "Testimonial deleted successfully",
    });
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
                            name="avatar"
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
                      
                      <div className="grid grid-cols-2 gap-4">
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
                          name="date"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. March 2025" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
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
                        name="text"
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
                                <p className="text-sm text-gray-500">{form.watch('date') || 'Date'}</p>
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
                            {form.watch('text') || 'Testimonial text will appear here...'}
                          </p>
                        </CardContent>
                      </Card>

                      <div className="mt-6">
                        <Button type="submit" className="w-full">
                          <Save className="h-4 w-4 mr-2" />
                          {editingId !== null ? "Save Changes" : "Add Testimonial"}
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

      {(!isAdding && editingId === null) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.date}</p>
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
                <p className="text-gray-700">{testimonial.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditTestimonials;
