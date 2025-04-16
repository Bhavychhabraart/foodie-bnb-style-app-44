
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

/**
 * Uploads a file to a specific Supabase storage bucket
 * @param file The file to upload
 * @param bucketName The name of the storage bucket
 * @returns The URL of the uploaded file or null if the upload failed
 */
export const uploadFile = async (file: File, bucketName: string): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file);
    
    if (error) {
      console.error('Error uploading file:', error);
      return null;
    }
    
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
      
    return urlData.publicUrl;
  } catch (error) {
    console.error('File upload error:', error);
    return null;
  }
};

/**
 * Deletes a file from a Supabase storage bucket
 * @param fileUrl The URL of the file to delete
 * @param bucketName The name of the storage bucket
 * @returns boolean indicating if the deletion was successful
 */
export const deleteFile = async (fileUrl: string, bucketName: string): Promise<boolean> => {
  try {
    // Extract the file name from the URL
    const fileName = fileUrl.split('/').pop();
    
    if (!fileName) {
      return false;
    }
    
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([fileName]);
    
    if (error) {
      console.error('Error deleting file:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('File deletion error:', error);
    return false;
  }
};
