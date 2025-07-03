"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Select, { StylesConfig } from "react-select";
import { format } from "date-fns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Hotel, Mail, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useModal } from "@/context/providers";
import { DatePicker } from "./date-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useBlockedDates } from "@/hooks/useBlockedDates";
import { useTimeSlots } from "@/hooks/useTimeSlots";

const petHotelFormSchema = z.object({
  ownerName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  petType: z.enum(["dog", "cat"], {
    required_error: "Please select pet type",
  }),
  petName: z.string().min(1, "Please enter pet name(s)"),
  petAge: z.string().min(1, "Please enter pet age"),
  numberOfPets: z.string().min(1, "Please enter number of pets"),
  breeds: z.string().min(1, "Please enter breed(s)"),
  checkInDate: z.string().min(1, "Please select check-in date"),
  checkInTime: z.string().min(1, "Please select check-in time"),
  checkOutDate: z.string().min(1, "Please select check-out date"),
  checkOutTime: z.string().min(1, "Please select check-out time"),
  specialNotes: z.string().optional(),
});

type PetHotelFormValues = z.infer<typeof petHotelFormSchema>;

interface PetHotelBookingFormProps {
  children: React.ReactNode;
  variant?: 'default' | 'cta';
  initialOpen?: boolean;
}

// Custom styles for react-select
type SelectOption = { value: string; label: string; };

const customSelectStyles: StylesConfig<SelectOption, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: '44px',
    backgroundColor: '#F2F2F2',
    borderColor: state.isFocused ? '#E73992' : '#E5E5E5',
    borderWidth: '0.5px',
    borderRadius: '12px',
    boxShadow: state.isFocused ? '0 0 0 1px #E73992' : 'none',
    '&:hover': {
      borderColor: '#E73992',
    },
    fontSize: '16px', // Prevents zoom on iOS
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    zIndex: 999,
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#E73992' : state.isFocused ? '#FFF0F7' : 'white',
    color: state.isSelected ? 'white' : '#374151',
    padding: '12px 16px',
    fontSize: '16px',
    '&:active': {
      backgroundColor: '#E73992',
      color: 'white',
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: '#374151',
    fontSize: '16px',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#9CA3AF',
    fontSize: '16px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? '#E73992' : '#9CA3AF',
    '&:hover': {
      color: '#E73992',
    },
  }),
};

export function PetHotelBookingForm({ children, variant = 'default', initialOpen = false }: PetHotelBookingFormProps) {
  const [isOpen, setIsOpen] = React.useState(initialOpen);
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const { setIsAnyModalOpen } = useModal();
  const { isDateBlocked, getBlockedTimesForDate } = useBlockedDates('pethotel');
  const { timeSlots, loading: timeSlotsLoading } = useTimeSlots('pethotel');

  // Generate time options based on configured slots and 24-hour constraint
  const generateTimeOptions = (date: string, isCheckIn: boolean = true) => {
    if (!date) return [];
    
    const selectedDate = new Date(date);
    const now = new Date();
    const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    // Get configured time slots
    const configuredSlots = isCheckIn ? 
      (timeSlots.check_in || []) : 
      (timeSlots.check_out || []);
    
    // If no configured slots, fall back to default business hours
    if (configuredSlots.length === 0) {
      const dayOfWeek = selectedDate.getDay();
      let startHour = 8;
      let startMinute = 30;
      let endHour = 16;
      let endMinute = 30;
      
      // Sunday: 12:00 PM - 4:00 PM
      if (dayOfWeek === 0) {
        startHour = 12;
        startMinute = 0;
        endHour = 16;
        endMinute = 0;
      }
      
      const options = [];
      let currentHour = startHour;
      let currentMinute = startMinute;
      
      while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
        const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
        const displayTime = new Date(2000, 0, 1, currentHour, currentMinute).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        
        // Check if this time slot is blocked
        const blockedTimes = getBlockedTimesForDate(selectedDate);
        const isBlocked = blockedTimes.includes(timeString);
        
        // For check-in times, ensure they are at least 24 hours from now and not blocked
        if (isCheckIn) {
          const dateTime = new Date(selectedDate);
          dateTime.setHours(currentHour, currentMinute, 0, 0);
          
          if (dateTime >= twentyFourHoursFromNow && !isBlocked) {
            options.push({ value: timeString, label: displayTime });
          }
        } else {
          // For check-out times, no 24-hour restriction but check if blocked
          if (!isBlocked) {
            options.push({ value: timeString, label: displayTime });
          }
        }
        
        // Increment by 30 minutes
        currentMinute += 30;
        if (currentMinute >= 60) {
          currentMinute = 0;
          currentHour += 1;
        }
      }
      
      return options;
    }
    
    // Use configured slots
    const options = [];
    const blockedTimes = getBlockedTimesForDate(selectedDate);
    
    for (const slot of configuredSlots) {
      const [hours, minutes] = slot.value.split(':').map(Number);
      
      // Check if this time slot is blocked
      if (blockedTimes.includes(slot.value)) {
        continue;
      }
      
      // For check-in times, ensure they are at least 24 hours from now
      if (isCheckIn) {
        const dateTime = new Date(selectedDate);
        dateTime.setHours(hours, minutes, 0, 0);
        
        if (dateTime >= twentyFourHoursFromNow) {
          options.push(slot);
        }
      } else {
        // For check-out times, no 24-hour restriction
        options.push(slot);
      }
    }
    
    return options;
  };
  
  // Generate check-out time options (no longer needs to filter based on check-in time since it's always a different day)
  const generateCheckOutTimeOptions = (checkOutDate: string) => {
    return generateTimeOptions(checkOutDate, false);
  };

  const form = useForm<PetHotelFormValues>({
    resolver: zodResolver(petHotelFormSchema),
    defaultValues: {
      ownerName: "",
      email: "",
      phone: "",
      petType: undefined,
      petName: "",
      petAge: "",
      numberOfPets: "",
      breeds: "",
      checkInDate: "",
      checkInTime: "",
      checkOutDate: "",
      checkOutTime: "",
      specialNotes: "",
    },
  });

  const onSubmit = async (values: PetHotelFormValues) => {
    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/send-booking-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          clientEmail: values.email,
          serviceType: 'pethotel',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send booking request');
      }

      setSubmitStatus('success');
      form.reset();
      
      // Close modal after a delay to show success message
      setTimeout(() => {
        setIsOpen(false);
        setSubmitStatus('idle');
      }, 2000);

    } catch (error) {
      console.error('Error sending booking request:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send booking request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (values: PetHotelFormValues) => {
    onSubmit(values);
  };

  // Update isOpen when initialOpen prop changes
  React.useEffect(() => {
    if (initialOpen) {
      setIsOpen(true);
    }
  }, [initialOpen]);

  // Control modal open state for context
  React.useEffect(() => {
    setIsAnyModalOpen(isOpen);
    
    // Reset states when modal closes
    if (!isOpen) {
      setSubmitStatus('idle');
      setErrorMessage('');
      setIsLoading(false);
    }

    return () => {
      setIsAnyModalOpen(false);
    };
  }, [isOpen, setIsAnyModalOpen]);


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className={variant === 'cta' 
            ? "inline-flex items-center justify-center bg-white text-[#E73992] hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold transition-colors"
            : "bg-[#E73992] text-white hover:bg-[#d3337f] rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg font-medium transition-colors inline-flex items-center justify-center whitespace-nowrap"
          }
          data-testid="pet-hotel-booking-trigger"
        >
          {children}
        </button>
      </DialogTrigger>
      
      <DialogContent className="flex flex-col overflow-hidden">
        <DialogHeader>
          <div className="p-6 pt-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Hotel className="w-8 h-8 text-[#E73992] mr-2" />
                <DialogTitle>Pet Hotel Booking</DialogTitle>
              </div>
              <DialogDescription className="px-4">
                Reserve your pet&apos;s stay at our comfortable and caring hotel.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="ownerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Your Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your full name" 
                              {...field} 
                              className="h-11 text-base border-gray-200 bg-[#F2F2F2] rounded-xl focus:border-[#E73992] focus:ring-[#E73992] placeholder:text-gray-400"
                              style={{ fontSize: '16px' }} // Prevent zoom on iOS
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Email Address *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="your.email@example.com" 
                              {...field} 
                              className="h-11 text-base border-gray-200 bg-[#F2F2F2] rounded-xl focus:border-[#E73992] focus:ring-[#E73992] placeholder:text-gray-400"
                              style={{ fontSize: '16px' }}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Phone Number *</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel"
                              placeholder="(555) 123-4567" 
                              {...field} 
                              className="h-11 text-base border-gray-200 bg-[#F2F2F2] rounded-xl focus:border-[#E73992] focus:ring-[#E73992] placeholder:text-gray-400"
                              style={{ fontSize: '16px' }}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="petName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Pet Name(s) *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Max, Luna" 
                              {...field} 
                              className="h-11 text-base border-gray-200 bg-[#F2F2F2] rounded-xl focus:border-[#E73992] focus:ring-[#E73992] placeholder:text-gray-400"
                              style={{ fontSize: '16px' }}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="petType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Pet Type *</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value ? { 
                                value: field.value, 
                                label: field.value === 'dog' ? 'Dog' : 'Cat' 
                              } : null}
                              onChange={(option) => field.onChange(option?.value)}
                              options={[
                                { value: 'dog', label: 'Dog' },
                                { value: 'cat', label: 'Cat' }
                              ]}
                              placeholder="Select pet type"
                              styles={customSelectStyles}
                              className="react-select-container"
                              classNamePrefix="react-select"
                              isClearable={false}
                              isSearchable={false}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="petAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Pet Age *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., 2 years, 6 months" 
                              {...field} 
                              className="h-11 text-base border-gray-200 bg-[#F2F2F2] rounded-xl focus:border-[#E73992] focus:ring-[#E73992] placeholder:text-gray-400"
                              style={{ fontSize: '16px' }}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="numberOfPets"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Number of Pets *</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value ? { value: field.value, label: field.value } : null}
                              onChange={(option) => field.onChange(option?.value)}
                              options={[
                                { value: '1', label: '1' },
                                { value: '2', label: '2' },
                                { value: '3', label: '3' },
                                { value: '4', label: '4' },
                                { value: '5+', label: '5 or more' }
                              ]}
                              placeholder="Select number of pets"
                              styles={customSelectStyles}
                              className="react-select-container"
                              classNamePrefix="react-select"
                              isClearable={false}
                              isSearchable={false}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="breeds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Breed(s) *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Golden Retriever, Tabby Cat" 
                              {...field} 
                              className="h-11 text-base border-gray-200 bg-[#F2F2F2] rounded-xl focus:border-[#E73992] focus:ring-[#E73992] placeholder:text-gray-400"
                              style={{ fontSize: '16px' }}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Business Hours Info */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-5">
                      <p className="text-sm font-medium text-gray-700 mb-2">Business Hours</p>
                      <div className="space-y-1 text-xs text-gray-600">
                        <p>• Monday - Saturday: 8:30 AM - 5:00 PM</p>
                        <p>• Sunday: 12:00 PM - 4:00 PM</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="checkInDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium text-sm">Check-in Date *</FormLabel>
                            <FormControl>
                              <DatePicker
                                selected={field.value}
                                onSelect={(date) => {
                                  if (date) {
                                    // Ensure we're working with local date to avoid timezone issues
                                    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                                    field.onChange(format(localDate, 'yyyy-MM-dd'));
                                  }
                                }}
                                disabled={(date) => {
                                  // Check if the entire date is blocked
                                  if (isDateBlocked(date)) {
                                    return true;
                                  }
                                  // Check if this date would have any available time slots
                                  const availableTimes = generateTimeOptions(format(date, 'yyyy-MM-dd'), true);
                                  return availableTimes.length === 0;
                                }}
                                placeholderText="Select check-in date"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="checkInTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium text-sm">Check-in Time *</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value ? generateTimeOptions(form.watch('checkInDate'), true).find(opt => opt.value === field.value) : null}
                                onChange={(option) => field.onChange(option?.value)}
                                options={generateTimeOptions(form.watch('checkInDate'), true)}
                                placeholder="Select time"
                                styles={customSelectStyles}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                isClearable={false}
                                isSearchable={false}
                                isDisabled={!form.watch('checkInDate') || timeSlotsLoading}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="checkOutDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium text-sm">Check-out Date *</FormLabel>
                            <FormControl>
                              <DatePicker
                                selected={field.value}
                                onSelect={(date) => {
                                  if (date) {
                                    // Ensure we're working with local date to avoid timezone issues
                                    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                                    field.onChange(format(localDate, 'yyyy-MM-dd'));
                                  }
                                }}
                                disabled={(date) => {
                                  const checkInDate = form.watch('checkInDate');
                                  
                                  if (!checkInDate) {
                                    // If no check-in date selected, disable all dates
                                    return true;
                                  }
                                  
                                  // Check if the entire date is blocked
                                  if (isDateBlocked(date)) {
                                    return true;
                                  }
                                  
                                  // Check-out must be at least one day after check-in
                                  // Parse dates properly to avoid timezone issues
                                  const checkIn = new Date(checkInDate + 'T00:00:00');
                                  const dateToCheck = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                                  
                                  // Add one day to check-in date
                                  const minCheckOutDate = new Date(checkIn);
                                  minCheckOutDate.setDate(minCheckOutDate.getDate() + 1);
                                  
                                  // Compare dates
                                  dateToCheck.setHours(0, 0, 0, 0);
                                  minCheckOutDate.setHours(0, 0, 0, 0);
                                  
                                  return dateToCheck < minCheckOutDate;
                                }}
                                placeholderText="Select check-out date"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="checkOutTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium text-sm">Check-out Time *</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value ? generateCheckOutTimeOptions(form.watch('checkOutDate')).find(opt => opt.value === field.value) : null}
                                onChange={(option) => field.onChange(option?.value)}
                                options={generateCheckOutTimeOptions(form.watch('checkOutDate'))}
                                placeholder="Select time"
                                styles={customSelectStyles}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                isClearable={false}
                                isSearchable={false}
                                isDisabled={!form.watch('checkOutDate') || timeSlotsLoading}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                            <p className="text-xs text-amber-600 mt-1 flex items-start gap-1">
                              <span className="text-amber-500">⚠️</span>
                              <span>Check-out after 11:00 AM will incur an additional day charge</span>
                            </p>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="specialNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Special Instructions (optional)</FormLabel>
                          <FormControl>
                            <textarea 
                              placeholder="Medications, feeding instructions, or special care needs..."
                              {...field} 
                              className="flex min-h-[100px] w-full rounded-xl border-[0.5px] border-[#E5E5E5] bg-[#F2F2F2] px-3 py-2 text-base shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E73992] disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                              style={{ fontSize: '16px' }}
                              rows={4}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Booking request sent successfully! We&apos;ll contact you shortly to confirm your reservation.</span>
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
                        <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{errorMessage || 'Failed to send booking request. Please try again.'}</span>
                      </div>
                    )}

                {/* Add padding at bottom for mobile fixed button */}
                <div className="h-20 md:hidden" />
              </form>
            </Form>
          </div>
        </div>

        {/* Fixed button area - Always visible */}
        <DialogFooter>
          <Button
            type="submit"
            onClick={form.handleSubmit(handleSubmit)}
            disabled={isLoading}
            className="w-full bg-[#E73992] hover:bg-[#d3337f] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 text-lg rounded-full transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                Send Booking Request
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}