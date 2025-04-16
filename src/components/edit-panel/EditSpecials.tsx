
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
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { 
  ImagePlus,
  Edit, 
  Save,
  Trash2, 
  Plus, 
  DollarSign,
  ChefHat,
  Loader2
} from 'lucide-react';

// Define interface for Special
interface Special {
  id: string;
  title: string;
  description: string | null;
  price: string;
  imageUrl: string;
  chef: string;
  isNew: boolean;
  isPopular: boolean;
}

// Create schema for form validation
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().min(1, "Price is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  chef: z.string().min(2, "Chef name is required"),
  isNew: z.boolean().optional(),
  isPopular: z.boolean().optional()
});

const EditSpecials: React.FC = () => {
  const [specials, setSpecials] = useState<Special[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      imageUrl: "",
      chef: "",
      isNew: false,
      isPopular: false
    }
  });

  // Fetch chef specials from Supabase
  useEffect(() => {
    async function fetchChefSpecials() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('chef_specials')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }

        if (data) {
          const formattedData = data.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description || "",
            price: item.price,
            imageUrl: item.image_url,
            chef: item.chef,
            isNew: item.is_featured || false,
            isPopular: false // We'll add this column later if needed
          }));
          setSpecials(formattedData);
        }
      } catch (error) {
        console.error('Error fetching chef specials:', error);
        toast({
          title: "Error",
          description: "Failed to load chef specials",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }

    fetchChefSpecials();
  }, [toast]);

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

  const handleEdit = (special: Special) => {
    setEditingId(special.id);
    form.reset({
      title: special.title,
      description: special.description || "",
      price: special.price,
      imageUrl: special.imageUrl,
      chef: special.chef,
      isNew: special.isNew,
      isPopular: special.isPopular
    });
    setImagePreview(special.imageUrl);
  };

  const startAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    form.reset({
      title: "",
      description: "",
      price: "",
      imageUrl: "",
      chef: "",
      isNew: false,
      isPopular: false
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
    setSubmitting(true);
    try {
      if (editingId !== null) {
        // Update existing special
        const { error } = await supabase
          .from('chef_specials')
          .update({
            title: values.title,
            description: values.description,
            price: values.price,
            image_url: values.imageUrl,
            chef: values.chef,
            is_featured: values.isNew || false
          })
          .eq('id', editingId);

        if (error) throw error;

        // Update local state
        setSpecials(specials.map(special => 
          special.id === editingId ? {
            ...special,
            title: values.title,
            description: values.description,
            price: values.price,
            imageUrl: values.imageUrl,
            chef: values.chef,
            isNew: values.isNew || false,
            isPopular: values.isPopular || false
          } : special
        ));

        toast({
          title: "Success",
          description: "Chef's special updated successfully",
        });
      } else {
        // Add new special
        const { data, error } = await supabase
          .from('chef_specials')
          .insert({
            title: values.title,
            description: values.description,
            price: values.price,
            image_url: values.imageUrl,
            chef: values.chef,
            is_featured: values.isNew || false
          })
          .select();

        if (error) throw error;

        if (data && data[0]) {
          const newSpecial: Special = {
            id: data[0].id,
            title: values.title,
            description: values.description,
            price: values.price,
            imageUrl: values.imageUrl,
            chef: values.chef,
            isNew: values.isNew || false,
            isPopular: values.isPopular || false
          };
          setSpecials([newSpecial, ...specials]);
        }

        toast({
          title: "Success",
          description: "New chef's special added successfully",
        });
      }
      
      setIsAdding(false);
      setEditingId(null);
      form.reset();
      setImagePreview(null);
    } catch (error: any) {
      console.error('Error saving chef special:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save chef's special",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this chef's special?")) {
      try {
        const { error } = await supabase
          .from('chef_specials')
          .delete()
          .eq('id', id);

        if (error) throw error;

        setSpecials(specials.filter(special => special.id !== id));
        toast({
          title: "Success",
          description: "Chef's special deleted successfully",
        });
      } catch (error: any) {
        console.error('Error deleting chef special:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to delete chef's special",
          variant: "destructive"
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading chef's specials...</span>
      </div>
    );
  }

  return (
    <div>
      {(isAdding || editingId !== null) ? (
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-semibold">
              {editingId !== null ? "Edit Chef's Special" : "Add New Chef's Special"}
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
                            <FormLabel>Dish Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Truffle Pasta" {...field} />
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
                                placeholder="Describe the dish" 
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
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. ₹1,800" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="chef"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Chef</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Chef Marcus" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex space-x-6 mt-4">
                        <FormField
                          control={form.control}
                          name="isNew"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={(e) => field.onChange(e.target.checked)}
                                  className="h-4 w-4"
                                />
                              </FormControl>
                              <FormLabel className="text-sm">Feature this dish</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="isPopular"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={(e) => field.onChange(e.target.checked)}
                                  className="h-4 w-4"
                                />
                              </FormControl>
                              <FormLabel className="text-sm">Mark as Popular</FormLabel>
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
                            <FormLabel>Dish Image</FormLabel>
                            <div className="mt-1">
                              <Input
                                id="special-image"
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                              />
                              <Label 
                                htmlFor="special-image" 
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
                        <Button type="submit" className="w-full" disabled={submitting}>
                          {submitting ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              {editingId !== null ? "Save Changes" : "Add Chef's Special"}
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
          <h2 className="text-2xl font-semibold">Chef's Specials</h2>
          <Button onClick={startAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Chef's Special
          </Button>
        </div>
      )}

      {(!isAdding && editingId === null) && (
        <>
          {specials.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <ChefHat className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No Chef's Specials</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new chef's special dish.</p>
              <div className="mt-6">
                <Button onClick={startAddNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Chef's Special
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {specials.map((special) => (
                <Card key={special.id} className="overflow-hidden group">
                  <CardContent className="p-0 relative">
                    <div className="h-40 relative">
                      <img 
                        src={special.imageUrl} 
                        alt={special.title} 
                        className="w-full h-full object-cover"
                      />
                      {special.isNew && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Featured
                        </div>
                      )}
                      {special.isPopular && (
                        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                          <span className="mr-1">Popular</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-medium text-lg">{special.title}</h3>
                      <p className="text-gray-500 mt-1 text-sm line-clamp-2">{special.description}</p>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-gray-700">
                          <ChefHat className="h-4 w-4 mr-1" />
                          <span className="text-sm">{special.chef}</span>
                        </div>
                        <div className="font-medium text-airbnb-red">
                          {special.price}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleEdit(special)}
                        >
                          <Edit className="h-3 w-3 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="flex-1"
                          onClick={() => handleDelete(special.id)}
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
        </>
      )}
    </div>
  );
};

export default EditSpecials;
