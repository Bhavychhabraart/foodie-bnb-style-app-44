
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
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { 
  ImagePlus,
  Edit, 
  Save,
  Trash2, 
  Plus, 
  DollarSign,
  ChefHat,
  Loader2,
  Star  // Added Star import
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Define interface for Chef's Special
interface ChefSpecial {
  id: string;
  title: string;
  chef: string;
  description: string;
  price: string;
  image_url: string | null;
  rating: number;
  is_new: boolean;
  is_popular: boolean;
}

// Create schema for form validation
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().min(1, "Price is required"),
  chef: z.string().min(2, "Chef name is required"),
  rating: z.number().min(0).max(5).default(4.5),
  is_new: z.boolean().default(false),
  is_popular: z.boolean().default(false),
  image_url: z.string().url("Must be a valid URL").nullable()
});

const EditSpecials: React.FC = () => {
  const [specials, setSpecials] = useState<ChefSpecial[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      chef: "",
      rating: 4.5,
      is_new: false,
      is_popular: false,
      image_url: null
    }
  });

  useEffect(() => {
    fetchSpecials();
  }, []);

  const fetchSpecials = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('chefs_specials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setSpecials(data);
      }
    } catch (error) {
      console.error('Error fetching chef specials:', error);
      toast({
        title: "Error",
        description: "Failed to load chef's specials",
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
      
      // Upload file to Supabase Storage
      setIsUploading(true);
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('chefs_specials')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('chefs_specials')
          .getPublicUrl(filePath);

        form.setValue('image_url', publicUrlData.publicUrl);
        toast({
          title: "Success",
          description: "Image uploaded successfully",
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        toast({
          title: "Error",
          description: "Failed to upload image",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleEdit = (special: ChefSpecial) => {
    setEditingId(special.id);
    setIsAdding(true);
    form.reset({
      title: special.title,
      description: special.description,
      price: special.price,
      chef: special.chef,
      rating: special.rating,
      is_new: special.is_new,
      is_popular: special.is_popular,
      image_url: special.image_url
    });
    setImagePreview(special.image_url);
  };

  const startAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    form.reset({
      title: "",
      description: "",
      price: "",
      chef: "",
      rating: 4.5,
      is_new: false,
      is_popular: false,
      image_url: null
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
    setIsLoading(true);
    try {
      if (editingId) {
        // Update existing
        const { error } = await supabase
          .from('chefs_specials')
          .update({
            title: values.title,
            description: values.description,
            price: values.price,
            chef: values.chef,
            rating: values.rating,
            is_new: values.is_new,
            is_popular: values.is_popular,
            image_url: values.image_url,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingId);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Chef's special updated successfully",
        });
      } else {
        // Add new
        const { error } = await supabase
          .from('chefs_specials')
          .insert({
            title: values.title,
            description: values.description,
            price: values.price,
            chef: values.chef,
            rating: values.rating,
            is_new: values.is_new,
            is_popular: values.is_popular,
            image_url: values.image_url
          });

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "New chef's special added successfully",
        });
      }
      
      // Refresh the list
      await fetchSpecials();
      
      // Reset form
      setIsAdding(false);
      setEditingId(null);
      form.reset();
      setImagePreview(null);
    } catch (error) {
      console.error('Error saving chef special:', error);
      toast({
        title: "Error",
        description: "Failed to save chef's special",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this chef's special?")) return;
    
    setIsLoading(true);
    try {
      // First get the special to check if it has an image
      const { data: special, error: fetchError } = await supabase
        .from('chefs_specials')
        .select('image_url')
        .eq('id', id)
        .single();
      
      if (fetchError) throw fetchError;
      
      // Delete from database
      const { error: deleteError } = await supabase
        .from('chefs_specials')
        .delete()
        .eq('id', id);
      
      if (deleteError) throw deleteError;
      
      // Delete image from storage if exists and is from our bucket
      if (special.image_url && special.image_url.includes('chefs_specials')) {
        const path = special.image_url.split('/').pop();
        if (path) {
          await supabase.storage
            .from('chefs_specials')
            .remove([path]);
        }
      }
      
      // Update local state
      setSpecials(specials.filter(s => s.id !== id));
      
      toast({
        title: "Success",
        description: "Chef's special deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting chef special:', error);
      toast({
        title: "Error",
        description: "Failed to delete chef's special",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isAdding ? (
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-semibold">
              {editingId ? "Edit Chef's Special" : "Add New Chef's Special"}
            </h2>
            <Button variant="outline" onClick={handleCancel} disabled={isLoading}>Cancel</Button>
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

                      <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Rating (0-5)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="0.1" 
                                min="0" 
                                max="5" 
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex space-x-6 mt-4">
                        <FormField
                          control={form.control}
                          name="is_new"
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
                              <FormLabel className="text-sm">Mark as New</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="is_popular"
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
                        name="image_url"
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
                                disabled={isUploading}
                              />
                              <Label 
                                htmlFor="special-image" 
                                className={`cursor-pointer flex h-40 w-full items-center justify-center rounded-md border border-dashed border-gray-300 hover:border-gray-400 ${isUploading ? 'opacity-50' : ''}`}
                              >
                                {isUploading ? (
                                  <div className="flex flex-col items-center justify-center">
                                    <Loader2 className="h-10 w-10 text-gray-400 animate-spin" />
                                    <span className="mt-2 text-sm text-gray-500">Uploading...</span>
                                  </div>
                                ) : imagePreview ? (
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
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={isLoading || isUploading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              {editingId ? "Updating..." : "Adding..."}
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              {editingId ? "Save Changes" : "Add Chef's Special"}
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
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Chef's Specials</h2>
            <Button onClick={startAddNew} disabled={isLoading}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Chef's Special
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : specials.length === 0 ? (
            <div className="text-center py-12 border rounded-lg bg-gray-50">
              <ChefHat className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">No chef's specials yet</h3>
              <p className="text-gray-500 mt-1">Get started by adding your first chef's special</p>
              <Button onClick={startAddNew} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Chef's Special
              </Button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border bg-background shadow">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Chef</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-center">Rating</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {specials.map((special) => (
                    <TableRow key={special.id}>
                      <TableCell>
                        {special.image_url ? (
                          <img
                            src={special.image_url}
                            alt={special.title}
                            className="h-12 w-12 rounded object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded bg-gray-200 flex items-center justify-center">
                            <ChefHat className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{special.title}</TableCell>
                      <TableCell>{special.chef}</TableCell>
                      <TableCell>{special.price}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-current text-amber-400" />
                          <span>{special.rating.toFixed(1)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-1">
                          {special.is_new && (
                            <span className="inline-block px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                              New
                            </span>
                          )}
                          {special.is_popular && (
                            <span className="inline-block px-2 py-0.5 text-xs bg-orange-100 text-orange-800 rounded-full">
                              Popular
                            </span>
                          )}
                          {!special.is_new && !special.is_popular && (
                            <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">
                              Regular
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(special)}
                            disabled={isLoading}
                          >
                            <Edit className="h-3.5 w-3.5" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(special.id)}
                            disabled={isLoading}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EditSpecials;
