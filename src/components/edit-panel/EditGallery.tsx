
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Trash2, 
  Plus, 
  ImagePlus
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { Skeleton } from "@/components/ui/skeleton";

interface Photo {
  id: string;
  url: string;
  alt: string;
}

const EditGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [altText, setAltText] = useState("");
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchGalleryPhotos();
  }, []);

  const fetchGalleryPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('id, image_url, alt_text')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        const formattedData = data.map(item => ({
          id: item.id,
          url: item.image_url,
          alt: item.alt_text || ''
        }));
        setPhotos(formattedData);
      }
    } catch (error) {
      console.error('Error fetching gallery photos:', error);
      toast({
        title: "Error",
        description: "Failed to fetch gallery photos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
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

    setUploading(true);

    try {
      // Upload image to Supabase Storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, selectedFile);
      
      if (uploadError) throw uploadError;
      
      // Get public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      // Insert record into gallery table
      const { error: insertError } = await supabase
        .from('gallery')
        .insert([
          { 
            image_url: publicUrl,
            alt_text: altText
          }
        ]);
      
      if (insertError) throw insertError;
      
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
      
      // Refresh gallery photos
      fetchGalleryPhotos();
      
      // Reset form
      setSelectedFile(null);
      setImagePreview(null);
      setAltText("");
      
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const photoToDelete = photos.find(photo => photo.id === id);
      
      if (!photoToDelete) return;
      
      // Extract the file path from the URL
      const urlParts = photoToDelete.url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `gallery/${fileName}`;
      
      // Delete from gallery table
      const { error: deleteError } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);
      
      if (deleteError) throw deleteError;
      
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('gallery')
        .remove([filePath]);
      
      if (storageError) {
        // Just log this error as the database record is already deleted
        console.error('Error deleting file from storage:', storageError);
      }
      
      setPhotos(photos.filter(photo => photo.id !== id));
      
      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Upload New Photo</h2>
          <Skeleton className="h-64 w-full" />
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Current Gallery Photos</h2>
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

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

                <Button 
                  onClick={handleUpload} 
                  className="w-full"
                  disabled={!selectedFile || !altText || uploading}
                >
                  {uploading ? "Uploading..." : "Upload Photo"}
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden group">
              <CardContent className="p-0 relative">
                <img 
                  src={photo.url} 
                  alt={photo.alt} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(photo.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
                <div className="p-3">
                  <p className="text-sm text-gray-500 truncate">{photo.alt}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditGallery;
