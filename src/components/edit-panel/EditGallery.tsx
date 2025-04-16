
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Image, 
  Upload, 
  Trash2, 
  Plus, 
  ImagePlus,
  Loader2
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

// Types for gallery items
type GalleryItem = {
  id: string;
  image_url: string;
  alt_text?: string;
  caption?: string;
  created_at: string;
};

const EditGallery: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch gallery images
  const { data: photos = [], isLoading } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as GalleryItem[];
    }
  });

  // Delete image mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Get the image URL first to extract the path
      const { data: imageData } = await supabase
        .from('gallery')
        .select('image_url')
        .eq('id', id)
        .single();
      
      if (imageData?.image_url) {
        // Extract file path from the URL
        const path = imageData.image_url.split('/').pop();
        if (path) {
          // Delete from storage
          const { error: storageError } = await supabase.storage
            .from('gallery')
            .remove([path]);
            
          if (storageError) throw storageError;
        }
      }

      // Delete from gallery table
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
      queryClient.invalidateQueries({ queryKey: ['galleryPhotos'] });
      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
    },
    onError: (error) => {
      console.error("Error deleting image:", error);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive"
      });
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image is too large. Maximum size is 5MB",
          variant: "destructive"
        });
        return;
      }
      
      setSelectedFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select an image to upload",
        variant: "destructive"
      });
      return;
    }

    if (!altText) {
      toast({
        title: "Error",
        description: "Please add alt text for accessibility",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);
      
      // Create a unique filename
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = fileName;
      
      // Upload to Supabase storage
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('gallery')
        .upload(filePath, selectedFile);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);
        
      // Insert into gallery table
      const { error: insertError } = await supabase
        .from('gallery')
        .insert([
          {
            image_url: publicUrlData.publicUrl,
            alt_text: altText,
            caption: caption || null
          }
        ]);
        
      if (insertError) throw insertError;
      
      // Reset form and refresh data
      setSelectedFile(null);
      setImagePreview(null);
      setAltText("");
      setCaption("");
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
      queryClient.invalidateQueries({ queryKey: ['galleryPhotos'] });
      
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upload New Photo</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <Label htmlFor="image-upload">Select Image</Label>
                  <div className="mt-1 flex items-center">
                    <Input
                      id="image-upload"
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <Label 
                      htmlFor="image-upload" 
                      className="cursor-pointer flex h-32 w-full items-center justify-center rounded-md border border-dashed border-gray-300 hover:border-gray-400"
                    >
                      {imagePreview ? (
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <ImagePlus className="h-10 w-10 text-gray-400" />
                          <span className="mt-2 text-sm text-gray-500">Click to browse files</span>
                        </div>
                      )}
                    </Label>
                  </div>
                </div>

                <div className="mb-4">
                  <Label htmlFor="alt-text">Alt Text (for accessibility)</Label>
                  <Input
                    id="alt-text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="Describe the image"
                    className="mt-1"
                  />
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="caption">Caption (optional)</Label>
                  <Textarea
                    id="caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Add a caption for the image"
                    className="mt-1"
                  />
                </div>

                <Button 
                  onClick={handleUpload} 
                  className="w-full"
                  disabled={!selectedFile || !altText || isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </>
                  )}
                </Button>
              </div>

              <div>
                <Label>Image Guidelines</Label>
                <ul className="mt-1 text-sm text-gray-500 list-disc list-inside space-y-1">
                  <li>Use high quality images (minimum 1000px width)</li>
                  <li>Keep file size under 5MB</li>
                  <li>Supported formats: JPG, PNG, WebP</li>
                  <li>Always include descriptive alt text for accessibility</li>
                  <li>Optimal aspect ratio is 16:9 for consistency</li>
                  <li>Adding captions is optional but recommended</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Current Gallery Photos</h2>
          <span className="text-sm text-gray-500">{photos.length} photos</span>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-6 w-6 animate-spin text-airbnb-gold" />
            <span className="ml-2">Loading gallery...</span>
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-10 border border-dashed rounded-md">
            <ImagePlus className="h-10 w-10 mx-auto text-gray-400" />
            <p className="mt-2 text-gray-500">No images in the gallery yet</p>
            <p className="text-sm text-gray-400">Upload your first image above</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden group">
                <CardContent className="p-0 relative">
                  <img 
                    src={photo.image_url} 
                    alt={photo.alt_text || 'Gallery image'} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(photo.id)}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending && deleteMutation.variables === photo.id ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4 mr-2" />
                      )}
                      Delete
                    </Button>
                  </div>
                  <div className="p-3">
                    <p className="text-sm text-gray-500 truncate">{photo.alt_text}</p>
                    {photo.caption && (
                      <p className="text-xs text-gray-400 mt-1 truncate">{photo.caption}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditGallery;
