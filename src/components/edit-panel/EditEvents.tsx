import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Pencil, Trash2, Plus, Image, Loader2, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type Event = {
  id: string;
  title: string;
  host: string;
  price: string;
  rating: number;
  reviews: number;
  is_sold_out: boolean;
  venue: string;
  time: string;
  image_url: string | null;
  date: string;
  category: string;
  description: string | null;
  featured: boolean;
  capacity: string | null;
};

type RequiredEventFields = {
  title: string;
  host: string;
  date: string;
  time: string;
  venue: string;
  price: string;
  category: string;
};

const EditEvents = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState<RequiredEventFields & Partial<Event>>({
    title: '',
    host: '',
    date: '',
    time: '',
    venue: '',
    price: '',
    category: 'home',
    description: '',
    capacity: null,
    featured: false,
    is_sold_out: false,
    rating: 4.8,
    reviews: 0,
  });
  
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['admin-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Event[];
    }
  });
  
  const createEventMutation = useMutation({
    mutationFn: async (data: RequiredEventFields & Partial<Event>) => {
      const { data: eventData, error } = await supabase
        .from('events')
        .insert(data)
        .select()
        .single();
      
      if (error) throw error;
      return eventData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setIsAddDialogOpen(false);
      resetForm();
      toast({
        title: "Event Created",
        description: "The event has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create event: ${error.message}`,
        variant: "destructive",
      });
    }
  });
  
  const updateEventMutation = useMutation({
    mutationFn: async (data: RequiredEventFields & Partial<Event> & { id: string }) => {
      const { id, ...updateData } = data;
      const { data: eventData, error } = await supabase
        .from('events')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return eventData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setIsEditDialogOpen(false);
      resetForm();
      toast({
        title: "Event Updated",
        description: "The event has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update event: ${error.message}`,
        variant: "destructive",
      });
    }
  });
  
  const deleteEventMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setIsDeleting(false);
      toast({
        title: "Event Deleted",
        description: "The event has been deleted successfully.",
      });
    },
    onError: (error) => {
      setIsDeleting(false);
      toast({
        title: "Error",
        description: `Failed to delete event: ${error.message}`,
        variant: "destructive",
      });
    }
  });
  
  const uploadImageMutation = useMutation({
    mutationFn: async ({ file, eventId }: { file: File, eventId: string }) => {
      const fileExt = file.name.split('.').pop();
      const filePath = `${eventId}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase
        .storage
        .from('event_images')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      const { data: publicUrlData } = supabase
        .storage
        .from('event_images')
        .getPublicUrl(filePath);
        
      const { error: updateError } = await supabase
        .from('events')
        .update({ image_url: publicUrlData.publicUrl })
        .eq('id', eventId);
        
      if (updateError) throw updateError;
      
      return publicUrlData.publicUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({
        title: "Image Uploaded",
        description: "The event image has been uploaded successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to upload image: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, eventId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImageMutation.mutate({ file, eventId });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const resetForm = () => {
    setFormData({
      title: '',
      host: '',
      date: '',
      time: '',
      venue: '',
      price: '',
      category: 'home',
      description: '',
      capacity: null,
      featured: false,
      is_sold_out: false,
      rating: 4.8,
      reviews: 0,
    });
  };
  
  const handleEditClick = (event: Event) => {
    setSelectedEvent(event);
    setFormData(event);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteClick = (id: string) => {
    setIsDeleting(true);
    deleteEventMutation.mutate(id);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedEvent) {
      updateEventMutation.mutate({ ...formData, id: selectedEvent.id });
    } else {
      createEventMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Events</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : events.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-center text-muted-foreground mb-4">No events found. Create your first event!</p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="relative h-48 bg-muted">
                {event.image_url ? (
                  <img 
                    src={event.image_url} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <Image className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute bottom-2 right-2 flex space-x-2">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={(e) => handleImageUpload(e, event.id)}
                  />
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Image className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>{event.title}</CardTitle>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-current text-yellow-400 inline mr-1" />
                    <span className="text-sm">{event.rating.toFixed(1)}</span>
                  </div>
                </div>
                <CardDescription>{event.host}</CardDescription>
              </CardHeader>
              
              <CardContent className="py-2">
                <div className="space-y-1 text-sm">
                  <div><span className="font-medium">Date:</span> {event.date}</div>
                  <div><span className="font-medium">Time:</span> {event.time}</div>
                  <div><span className="font-medium">Venue:</span> {event.venue}</div>
                  <div><span className="font-medium">Price:</span> {event.price}</div>
                  <div><span className="font-medium">Category:</span> {event.category}</div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0 flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEditClick(event)}
                >
                  <Pencil className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeleteClick(event.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsAddDialogOpen(false);
          setIsEditDialogOpen(false);
          resetForm();
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
            <DialogDescription>
              Fill in the details below to {selectedEvent ? 'update the' : 'create a new'} event.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Event Title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="host">Host</Label>
                <Input
                  id="host"
                  name="host"
                  value={formData.host}
                  onChange={handleInputChange}
                  placeholder="Host Name or Date"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder="e.g. 12th April, 2025"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  placeholder="e.g. 7:30 PM"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Input
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  placeholder="e.g. Sector 49, Gurgaon"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price / Offer</Label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g. Free Entry or ₹500"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  value={formData.capacity || ''}
                  onChange={handleInputChange}
                  placeholder="e.g. 100 people"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="experiences">Experiences</SelectItem>
                    <SelectItem value="menu">Menu</SelectItem>
                    <SelectItem value="offers">Offers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                placeholder="Event Description"
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured || false}
                  onCheckedChange={(checked) => handleSwitchChange('featured', checked)}
                />
                <Label htmlFor="featured">Featured Event</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_sold_out"
                  checked={formData.is_sold_out || false}
                  onCheckedChange={(checked) => handleSwitchChange('is_sold_out', checked)}
                />
                <Label htmlFor="is_sold_out">Sold Out</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsAddDialogOpen(false);
                  setIsEditDialogOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={createEventMutation.isPending || updateEventMutation.isPending}
              >
                {(createEventMutation.isPending || updateEventMutation.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {selectedEvent ? 'Update' : 'Create'} Event
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditEvents;
