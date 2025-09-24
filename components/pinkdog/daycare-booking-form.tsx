"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Select, { StylesConfig } from "react-select";
// import { format } from "date-fns"; // Temporarily commented

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
import { Heart, Mail, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useModal } from "@/context/providers";
// import { DatePicker } from "./date-picker"; // Temporarily commented
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { useBlockedDates } from "@/hooks/useBlockedDates"; // Temporarily commented
// import { useTimeSlots } from "@/hooks/useTimeSlots"; // Temporarily commented
import { ClientTypeSelection } from "./client-type-selection";

// Dynamic schema based on client type
const createDaycareFormSchema = (isNewClient: boolean) => z.object({
  ownerName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  petType: z.enum(["dog", "cat"], {
    required_error: "Please select pet type",
  }),
  petName: z.string().min(1, "Please enter your pet's name"),
  breed: z.string().min(1, "Please enter breed"),
  age: z.string().min(1, "Please enter age"),
  previousDaycare: z.enum(["yes", "no"], {
    required_error: "Please select if your pet has attended daycare before",
  }),
  socialBehavior: z.string().min(1, "Please describe how your pet is around other pets"),
  // IMPORTANT: DO NOT DELETE - These fields are optional for new clients but required for existing clients
  daycareDate: isNewClient ? z.string().optional() : z.string().min(1, "Please select daycare date"),
  dropOffTime: isNewClient ? z.string().optional() : z.string().min(1, "Please select drop-off time"),
  pickUpTime: isNewClient ? z.string().optional() : z.string().min(1, "Please select pick-up time"),
  specialNotes: z.string().optional(),
});

type DaycareFormValues = z.infer<ReturnType<typeof createDaycareFormSchema>>;

interface DaycareBookingFormProps {
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

export function DaycareBookingForm({ children, variant = 'default', initialOpen = false }: DaycareBookingFormProps) {
  const [isOpen, setIsOpen] = React.useState(initialOpen);
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showClientTypeSelection, setShowClientTypeSelection] = React.useState(true);
  const [isNewClient, setIsNewClient] = React.useState(false);
  const { setIsAnyModalOpen } = useModal();
  // Temporarily commented - used for date/time fields
  // const { isDateBlocked, getBlockedTimesForDate } = useBlockedDates('daycare');
  // const { timeSlots, loading: timeSlotsLoading } = useTimeSlots('daycare');

  // Temporarily commented - used for date/time fields
  /*
  // Generate time options based on configured slots and 24-hour constraint
  const generateTimeOptions = (date: string, isDropOff: boolean = true) => {
    if (!date) return [];
    
    const selectedDate = new Date(date);
    const now = new Date();
    const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    // Get configured time slots
    const configuredSlots = isDropOff ? 
      (timeSlots.drop_off || []) : 
      (timeSlots.pick_up || []);
    
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
        
        // For drop-off times, ensure they are at least 24 hours from now and not blocked
        if (isDropOff) {
          const dateTime = new Date(selectedDate);
          dateTime.setHours(currentHour, currentMinute, 0, 0);
          
          if (dateTime >= twentyFourHoursFromNow && !isBlocked) {
            options.push({ value: timeString, label: displayTime });
          }
        } else {
          // For pick-up times, no 24-hour restriction but check if blocked
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
      
      // For drop-off times, ensure they are at least 24 hours from now
      if (isDropOff) {
        const dateTime = new Date(selectedDate);
        dateTime.setHours(hours, minutes, 0, 0);
        
        if (dateTime >= twentyFourHoursFromNow) {
          options.push(slot);
        }
      } else {
        // For pick-up times, no 24-hour restriction
        options.push(slot);
      }
    }
    
    return options;
  };
  */
  
  const form = useForm<DaycareFormValues>({
    resolver: zodResolver(createDaycareFormSchema(isNewClient)),
    defaultValues: {
      ownerName: "",
      email: "",
      phone: "",
      petType: undefined,
      petName: "",
      breed: "",
      age: "",
      previousDaycare: undefined,
      socialBehavior: "",
      daycareDate: "",
      dropOffTime: "",
      pickUpTime: "",
      specialNotes: "",
    },
  });

  // Temporarily commented - used for date/time fields
  /*
  // Generate pick-up time options that are after drop-off time
  const generatePickUpTimeOptions = (daycareDate: string) => {
    const baseOptions = generateTimeOptions(daycareDate, false);
    const dropOffTime = form.watch('dropOffTime');
    
    // If no drop-off time selected, show all times
    if (!dropOffTime) {
      return baseOptions;
    }
    
    // Filter times to be after drop-off time
    const [dropOffHour, dropOffMinute] = dropOffTime.split(':').map(Number);
    const dropOffMinutes = dropOffHour * 60 + dropOffMinute;
    
    return baseOptions.filter(option => {
      const [hour, minute] = option.value.split(':').map(Number);
      const optionMinutes = hour * 60 + minute;
      return optionMinutes > dropOffMinutes;
    });
  };
  */

  const onSubmit = async (values: DaycareFormValues) => {
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
          // Map daycare form fields to the expected format
          ownerName: values.ownerName,
          clientEmail: values.email,
          phone: values.phone,
          petType: values.petType,
          petName: values.petName,
          petAge: values.age,
          breeds: values.breed,
          numberOfPets: '1',
          // Temporarily commenting out date/time fields
          // checkInDate: values.daycareDate,
          // checkInTime: values.dropOffTime,
          // checkOutDate: values.daycareDate, // Same day for daycare
          // checkOutTime: values.pickUpTime,
          // Send structured data as separate fields
          previousDaycare: values.previousDaycare,
          socialBehavior: values.socialBehavior,
          specialNotes: values.specialNotes || '', // Only actual special notes
          serviceType: 'daycare', // Add service type to distinguish from pet hotel
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send daycare request');
      }

      setSubmitStatus('success');
      form.reset();
      
      // Close modal after a delay to show success message
      setTimeout(() => {
        setIsOpen(false);
        setSubmitStatus('idle');
      }, 2000);

    } catch (error) {
      console.error('Error sending daycare request:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send daycare request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (values: DaycareFormValues) => {
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
      setShowClientTypeSelection(true);
      setIsNewClient(false);
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
          data-testid="daycare-booking-trigger"
        >
          {children}
        </button>
      </DialogTrigger>
      
      <DialogContent className="flex flex-col overflow-hidden">
        <DialogHeader>
          <div className="p-6 pt-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Heart className="w-8 h-8 text-[#E73992] mr-2" />
                <DialogTitle>Daycare Request</DialogTitle>
              </div>
              <DialogDescription className="px-4">
                We&apos;re excited to welcome your pup! Please choose the right option to continue.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {showClientTypeSelection ? (
            <ClientTypeSelection
              serviceType="daycare"
              onNewClient={() => {
                setIsNewClient(true);
                setShowClientTypeSelection(false);
              }}
              onExistingClient={() => {
                setIsOpen(false);
              }}
            />
          ) : (
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
                          <FormLabel className="text-gray-700 font-medium text-sm">Pet Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Buddy" 
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
                      name="breed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Breed *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Golden Retriever" 
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
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Age *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., 3 years" 
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
                      name="previousDaycare"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Has your dog attended daycare before? *</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value ? { value: field.value, label: field.value === 'yes' ? 'Yes' : 'No' } : null}
                              onChange={(option) => field.onChange(option?.value)}
                              options={[
                                { value: 'yes', label: 'Yes' },
                                { value: 'no', label: 'No' }
                              ]}
                              placeholder="Select an option"
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
                      name="socialBehavior"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">How is your dog around other dogs? *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Friendly, Shy, Selective, Reactive" 
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
                      <p className="text-sm font-medium text-gray-700 mb-2">Daycare Hours</p>
                      <div className="space-y-1 text-xs text-gray-600">
                        <p>• Monday - Saturday: 8:30 AM - 5:00 PM</p>
                        <p>• Sunday: 8:30 PM - 5:00 PM</p>
                          <span className="text-xs text-gray-500">(Closed for lunch: 1:00 PM - 1:30 PM)</span>
                        <p className="text-amber-600 mt-2 flex items-start gap-1">
                          <span className="text-amber-500">⚠️</span>
                          <span>Daycare bookings require 24 hours advance notice</span>
                        </p>
                      </div>
                    </div>
                    
                    {/* IMPORTANT: DO NOT DELETE - These fields are hidden for new clients but needed for existing clients */}
                    {/* Temporarily commenting out date/time fields
                    {!isNewClient && (
                    <>
                    <FormField
                      control={form.control}
                      name="daycareDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Daycare Date *</FormLabel>
                          <FormControl>
                            <DatePicker
                              selected={field.value || ''}
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
                              placeholderText="Select daycare date"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="dropOffTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium text-sm">Drop-off Time *</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value ? generateTimeOptions(form.watch('daycareDate') || '', true).find(opt => opt.value === field.value) : null}
                                onChange={(option) => field.onChange(option?.value)}
                                options={generateTimeOptions(form.watch('daycareDate') || '', true)}
                                placeholder="Select time"
                                styles={customSelectStyles}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                isClearable={false}
                                isSearchable={false}
                                isDisabled={!form.watch('daycareDate') || timeSlotsLoading}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="pickUpTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium text-sm">Pick-up Time *</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value ? generatePickUpTimeOptions(form.watch('daycareDate') || '').find(opt => opt.value === field.value) : null}
                                onChange={(option) => field.onChange(option?.value)}
                                options={generatePickUpTimeOptions(form.watch('daycareDate') || '')}
                                placeholder="Select time"
                                styles={customSelectStyles}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                isClearable={false}
                                isSearchable={false}
                                isDisabled={!form.watch('daycareDate') || timeSlotsLoading}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        
                          </FormItem>
                        )}
                      />
                    </div>
                    </>
                    )}
                    */}

                    <FormField
                      control={form.control}
                      name="specialNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Additional notes (optional)</FormLabel>
                          <FormControl>
                            <textarea 
                              placeholder="Any special care instructions or behavior notes..."
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
                        <span className="text-sm">Daycare request sent successfully! We&apos;ll contact you soon to schedule a temperament test.</span>
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
                        <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{errorMessage || 'Failed to send daycare request. Please try again.'}</span>
                      </div>
                    )}

                {/* Add padding at bottom for mobile fixed button */}
                <div className="h-20 md:hidden" />
              </form>
            </Form>
          </div>
          )}
        </div>

        {/* Fixed button area - Only visible when form is shown */}
        {!showClientTypeSelection && (
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
                  Send Request
                </>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}