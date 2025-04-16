
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
  ImagePlus,
  Edit, 
  Save,
  Trash2, 
  Plus, 
  DollarSign,
  ChefHat
} from 'lucide-react';

// Define interface for Special
interface Special {
  id: number;
  title: string;
  description: string;
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

// Mock data
const initialSpecials: Special[] = [
  {
    id: 1,
    title: "Truffle Pasta",
    description: "Fresh homemade pasta with black truffle, parmesan cream sauce and wild mushrooms",
    price: "₹1,800",
    imageUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    chef: "Chef Marcus",
    isNew: true,
    isPopular: false
  },
  {
    id: 2,
    title: "Wagyu Ribeye",
    description: "Prime A5 Japanese Wagyu ribeye steak with roasted vegetables and red wine reduction",
    price: "₹3,500",
    imageUrl: "https://images.unsplash.com/photo-1504973960431-1c467e159aa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    chef: "Chef Alessandro",
    isNew: false,
    isPopular: true
  },
  {
    id: 3,
    title: "Seafood Platter",
    description: "Selection of fresh lobster, king crab, prawns, and oysters with housemade sauces",
    price: "₹4,200",
    imageUrl: "https://images.unsplash.com/photo-1606850246029-dd015c13d94c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    chef: "Chef Maria",
    isNew: false,
    isPopular: false
  }
];

const EditSpecials: React.FC = () => {
  const [specials, setSpecials] = useState<Special[]>(initialSpecials);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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
      description: special.description,
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (editingId !== null) {
      // Update existing
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
      // Add new
      const newSpecial: Special = {
        id: Date.now(),
        title: values.title,
        description: values.description,
        price: values.price,
        imageUrl: values.imageUrl,
        chef: values.chef,
        isNew: values.isNew || false,
        isPopular: values.isPopular || false
      };
      setSpecials([...specials, newSpecial]);
      toast({
        title: "Success",
        description: "New chef's special added successfully",
      });
    }
    
    setIsAdding(false);
    setEditingId(null);
    form.reset();
    setImagePreview(null);
  };

  const handleDelete = (id: number) => {
    setSpecials(specials.filter(special => special.id !== id));
    toast({
      title: "Success",
      description: "Chef's special deleted successfully",
    });
  };

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
                              <FormLabel className="text-sm">Mark as New</FormLabel>
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
                        <Button type="submit" className="w-full">
                          <Save className="h-4 w-4 mr-2" />
                          {editingId !== null ? "Save Changes" : "Add Chef's Special"}
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
                      New
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
    </div>
  );
};

export default EditSpecials;
