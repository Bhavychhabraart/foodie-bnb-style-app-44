
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl, FormItem } from '@/components/ui/form';

interface GuestDetailsInputProps {
  guestCount: number;
  genderCounts: { male: number; female: number };
  onGenderCountChange: (male: number, female: number) => void;
  error?: string;
}

const GuestDetailsInput: React.FC<GuestDetailsInputProps> = ({
  guestCount,
  genderCounts,
  onGenderCountChange,
  error
}) => {
  const handleMaleCountChange = (value: string) => {
    const maleCount = parseInt(value);
    const femaleCount = guestCount - maleCount;
    onGenderCountChange(maleCount, femaleCount);
  };

  const handleFemaleCountChange = (value: string) => {
    const femaleCount = parseInt(value);
    const maleCount = guestCount - femaleCount;
    onGenderCountChange(maleCount, femaleCount);
  };

  return (
    <div className="space-y-4">
      <div>
        <FormItem>
          <Label>Male Guests</Label>
          <Select 
            value={genderCounts.male.toString()} 
            onValueChange={handleMaleCountChange}
          >
            <SelectTrigger className="w-full bg-[#1E1E1E] border-airbnb-gold/20">
              <SelectValue placeholder="Select number of male guests" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: guestCount + 1 }, (_, i) => (
                <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      </div>

      <div>
        <FormItem>
          <Label>Female Guests</Label>
          <Select 
            value={genderCounts.female.toString()} 
            onValueChange={handleFemaleCountChange}
          >
            <SelectTrigger className="w-full bg-[#1E1E1E] border-airbnb-gold/20">
              <SelectValue placeholder="Select number of female guests" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: guestCount + 1 }, (_, i) => (
                <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
};

export default GuestDetailsInput;
