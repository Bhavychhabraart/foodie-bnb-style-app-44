
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Additional date formatting utility
export const formatDate = (dateString: string): string => {
  try {
    // Try to parse the date string and format it
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy');
  } catch (error) {
    // Return the original string if parsing fails
    return dateString;
  }
};
