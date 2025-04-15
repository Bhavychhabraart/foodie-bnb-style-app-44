
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Image, 
  Upload, 
  Trash2, 
  Plus, 
  ImagePlus
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock data for the gallery - in a real app, this would come from a database
const initialPhotos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    alt: "Main dining area with elegant table settings"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    alt: "Gourmet dish presentation"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    alt: "Bar area with premium spirits"
  }
];

const EditGallery: React.FC = () => {
  const [photos, setPhotos] = useState(initialPhotos);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [altText, setAltText] = useState("");
  const { toast } = useToast();

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

  const handleUpload = () => {
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

    // In a real application, this is where you'd upload to a server
    // For this demo, we'll just add it to our local state
    const newPhoto = {
      id: Date.now(),
      url: imagePreview as string,
      alt: altText
    };

    setPhotos([...photos, newPhoto]);
    setSelectedFile(null);
    setImagePreview(null);
    setAltText("");

    toast({
      title: "Success",
      description: "Image uploaded successfully",
    });
  };

  const handleDelete = (id: number) => {
    setPhotos(photos.filter(photo => photo.id !== id));
    toast({
      title: "Success",
      description: "Image deleted successfully",
    });
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

                <Button 
                  onClick={handleUpload} 
                  className="w-full"
                  disabled={!selectedFile || !altText}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
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
