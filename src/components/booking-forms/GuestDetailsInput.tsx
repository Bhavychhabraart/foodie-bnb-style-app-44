
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormItem } from '@/components/ui/form';

interface GuestDetailsInputProps {
  guestCount: number;
  genderCounts: { male: number; female: number };
  onGenderCountChange: (gender: 'male' | 'female', value: number) => void;
  error?: string;
}

const GuestDetailsInput: React.FC<GuestDetailsInputProps> = ({
  guestCount,
  genderCounts,
  onGenderCountChange,
  error
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Guest Gender Distribution</h3>
      <p className="text-sm text-airbnb-light">
        For security reasons, we maintain a balanced guest ratio. Male stags cannot exceed the number of couples.
      </p>
      
      <div>
        <FormItem>
          <Label>Male Guests</Label>
          <Select 
            value={genderCounts.male.toString()} 
            onValueChange={(value) => onGenderCountChange('male', parseInt(value))}
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
            onValueChange={(value) => onGenderCountChange('female', parseInt(value))}
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
      
      <div className="flex items-center justify-between px-1">
        <span className="text-sm">Total guests selected:</span>
        <span className="font-medium">{genderCounts.male + genderCounts.female} / {guestCount}</span>
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}

      {genderCounts.male + genderCounts.female !== guestCount && !error && (
        <p className="text-sm text-amber-500 mt-2">
          Total number of male and female guests must equal {guestCount}
        </p>
      )}
    </div>
  );
};

export default GuestDetailsInput;
