
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Image, 
  Upload, 
  Trash2, 
  Plus, 
  Calendar, 
  DollarSign, 
  Star, 
  User, 
  ImagePlus,
  Edit, 
  Save
} from 'lucide-react';

// Define the Experience interface
interface Experience {
  id: number;
  title: string;
  host: string;
  date: string;
  price: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  isSoldOut: boolean;
}

// Create schema for form validation
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  host: z.string().min(2, "Host name is required"),
  date: z.string().optional(),
  price: z.string().min(1, "Price is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  rating: z.number().min(0).max(5).optional(),
  reviews: z.number().min(0).optional(),
  isSoldOut: z.boolean().optional()
});

// Mock data
const initialExperiences: Experience[] = [
  {
    id: 1,
    title: "Fine Dine Restaurant Experience",
    host: "Chef Marcus",
    date: "",
    price: "₹2,500 per person",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.92,
    reviews: 286,
    isSoldOut: false
  },
  {
    id: 2,
    title: "Farm to Table Dinner",
    host: "Maria",
    date: "May 25, 2025",
    price: "₹3,200 per person",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.78,
    reviews: 124,
    isSoldOut: false
  },
  {
    id: 3,
    title: "Wine Tasting Evening",
    host: "Sommelier Jean",
    date: "June 3, 2025",
    price: "₹1,800 per person",
    imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.9,
    reviews: 158,
    isSoldOut: false
  }
];

const EditExperiences: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      host: "",
      date: "",
      price: "",
      imageUrl: "",
      rating: 0,
      reviews: 0,
      isSoldOut: false
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        form.setValue('imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingId(experience.id);
    form.reset({
      title: experience.title,
      host: experience.host,
      date: experience.date,
      price: experience.price,
      imageUrl: experience.imageUrl,
      rating: experience.rating,
      reviews: experience.reviews,
      isSoldOut: experience.isSoldOut
    });
    setImagePreview(experience.imageUrl);
  };

  const startAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    form.reset({
      title: "",
      host: "",
      date: "",
      price: "",
      imageUrl: "",
      rating: 0,
      reviews: 0,
      isSoldOut: false
    });
    setImagePreview(null);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    form.reset();
    setImagePreview(null);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (editingId !== null) {
      // Update existing
      setExperiences(experiences.map(exp => 
        exp.id === editingId ? { 
          ...exp, 
          title: values.title,
          host: values.host,
          date: values.date || "",
          price: values.price,
          imageUrl: values.imageUrl,
          rating: values.rating || 0,
          reviews: values.reviews || 0,
          isSoldOut: values.isSoldOut || false
        } : exp
      ));
      toast({
        title: "Success",
        description: "Experience updated successfully",
      });
    } else {
      // Add new
      const newExperience: Experience = {
        id: Date.now(),
        title: values.title,
        host: values.host,
        date: values.date || "",
        price: values.price,
        imageUrl: values.imageUrl,
        rating: values.rating || 0,
        reviews: values.reviews || 0,
        isSoldOut: values.isSoldOut || false
      };
      setExperiences([...experiences, newExperience]);
      toast({
        title: "Success",
        description: "New experience added successfully",
      });
    }
    
    setIsAdding(false);
    setEditingId(null);
    form.reset();
    setImagePreview(null);
  };

  const handleDelete = (id: number) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
    toast({
      title: "Success",
      description: "Experience deleted successfully",
    });
  };

  return (
    <div>
      {(isAdding || editingId !== null) ? (
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-semibold">
              {editingId !== null ? "Edit Experience" : "Add New Experience"}
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
                            <FormLabel>Experience Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Wine Tasting Evening" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name="host"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Host</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Chef Marcus" {...field} />
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
                              <FormLabel>Date (if event)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. May 25, 2025" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. ₹2,500 per person" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="rating"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rating (0-5)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="0" 
                                  max="5" 
                                  step="0.1" 
                                  placeholder="e.g. 4.9"
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name="reviews"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Reviews</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="0"
                                  placeholder="e.g. 124"
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="isSoldOut"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-end space-x-3 space-y-0 mt-8">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={(e) => field.onChange(e.target.checked)}
                                  className="h-4 w-4"
                                />
                              </FormControl>
                              <FormLabel className="text-sm">Mark as Sold Out</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image</FormLabel>
                            <div className="mt-1">
                              <Input
                                id="experience-image"
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                              />
                              <Label 
                                htmlFor="experience-image" 
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
                                placeholder="Or enter image URL" 
                                className="mt-2"
                                onChange={(e) => {
                                  field.onChange(e.target.value);
                                  setImagePreview(e.target.value);
                                }}
                              />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="mt-6">
                        <Button type="submit" className="w-full">
                          <Save className="h-4 w-4 mr-2" />
                          {editingId !== null ? "Save Changes" : "Add Experience"}
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
          <h2 className="text-2xl font-semibold">Experiences</h2>
          <Button onClick={startAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Experience
          </Button>
        </div>
      )}

      {(!isAdding && editingId === null) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {experiences.map((experience) => (
            <Card key={experience.id} className="overflow-hidden group">
              <CardContent className="p-0 relative">
                <div className="h-40 relative">
                  <img 
                    src={experience.imageUrl} 
                    alt={experience.title} 
                    className="w-full h-full object-cover"
                  />
                  {experience.isSoldOut && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Sold Out
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-lg">{experience.title}</h3>
                  
                  <div className="flex items-center mt-1 text-gray-500">
                    <User className="h-3 w-3 mr-1" />
                    <span className="text-sm">{experience.host}</span>
                  </div>
                  
                  {experience.date && (
                    <div className="flex items-center mt-1 text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="text-sm">{experience.date}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center mt-1 text-gray-500">
                    <DollarSign className="h-3 w-3 mr-1" />
                    <span className="text-sm">{experience.price}</span>
                  </div>
                  
                  {experience.rating && (
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 mr-1 text-yellow-500 fill-current" />
                      <span className="text-sm">{experience.rating}</span>
                      {experience.reviews && (
                        <span className="text-sm text-gray-500"> · {experience.reviews} reviews</span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex space-x-2 mt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleEdit(experience)}
                    >
                      <Edit className="h-3 w-3 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDelete(experience.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditExperiences;
