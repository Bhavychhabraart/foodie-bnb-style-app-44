
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
  Tag,
  Calendar
} from 'lucide-react';

// Define interface for Offer
interface Offer {
  id: number;
  title: string;
  description: string;
  validUntil: string;
  imageUrl: string;
  couponCode: string;
}

// Create schema for form validation
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  validUntil: z.string().min(1, "Valid until date is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  couponCode: z.string().min(3, "Coupon code must be at least 3 characters")
});

// Mock data
const initialOffers: Offer[] = [
  {
    id: 1,
    title: "Weekend Special",
    description: "25% off on all desserts every weekend",
    validUntil: "May 31, 2025",
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80",
    couponCode: "WEEKEND25"
  },
  {
    id: 2,
    title: "Seasonal Menu",
    description: "Try our limited spring specialties",
    validUntil: "June 15, 2025",
    imageUrl: "https://images.unsplash.com/photo-1559046375-d0593977ebed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80",
    couponCode: "SPRING2025"
  },
  {
    id: 3,
    title: "Family Package",
    description: "Special menu for 4 with complimentary dessert",
    validUntil: "Ongoing",
    imageUrl: "https://images.unsplash.com/photo-1611599538835-b52a8c2f9da1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80",
    couponCode: "FAMILY4"
  }
];

const EditOffers: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      validUntil: "",
      imageUrl: "",
      couponCode: ""
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

  const handleEdit = (offer: Offer) => {
    setEditingId(offer.id);
    form.reset({
      title: offer.title,
      description: offer.description,
      validUntil: offer.validUntil,
      imageUrl: offer.imageUrl,
      couponCode: offer.couponCode
    });
    setImagePreview(offer.imageUrl);
  };

  const startAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    form.reset({
      title: "",
      description: "",
      validUntil: "",
      imageUrl: "",
      couponCode: ""
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
      setOffers(offers.map(offer => 
        offer.id === editingId ? {
          ...offer,
          title: values.title,
          description: values.description,
          validUntil: values.validUntil,
          imageUrl: values.imageUrl,
          couponCode: values.couponCode
        } : offer
      ));
      toast({
        title: "Success",
        description: "Offer updated successfully",
      });
    } else {
      // Add new
      const newOffer: Offer = {
        id: Date.now(),
        title: values.title,
        description: values.description,
        validUntil: values.validUntil,
        imageUrl: values.imageUrl,
        couponCode: values.couponCode
      };
      setOffers([...offers, newOffer]);
      toast({
        title: "Success",
        description: "New offer added successfully",
      });
    }
    
    setIsAdding(false);
    setEditingId(null);
    form.reset();
    setImagePreview(null);
  };

  const handleDelete = (id: number) => {
    setOffers(offers.filter(offer => offer.id !== id));
    toast({
      title: "Success",
      description: "Offer deleted successfully",
    });
  };

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
                          name="validUntil"
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
                          name="couponCode"
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
                        name="imageUrl"
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
                          {editingId !== null ? "Save Changes" : "Add Offer"}
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
          {offers.map((offer) => (
            <Card key={offer.id} className="overflow-hidden group">
              <CardContent className="p-0 relative">
                <div className="h-40 relative">
                  <img 
                    src={offer.imageUrl} 
                    alt={offer.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center">
                    <Tag className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">Valid until: {offer.validUntil}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-lg">{offer.title}</h3>
                  <p className="text-gray-500 mt-1 text-sm line-clamp-2">{offer.description}</p>
                  
                  <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-100 flex justify-between items-center">
                    <span className="font-mono text-sm">{offer.couponCode}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => {
                        navigator.clipboard.writeText(offer.couponCode);
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
          ))}
        </div>
      )}
    </div>
  );
};

export default EditOffers;
