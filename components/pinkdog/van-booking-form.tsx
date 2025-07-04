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
import { Car, Mail, Loader2, CheckCircle, XCircle } from "lucide-react";
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

const vanFormSchema = z.object({
  ownerName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  petNames: z.string().min(1, "Please enter your pet's name(s)"),
  petType: z.enum(["dog", "cat"], {
    required_error: "Please select pet type",
  }),
  numberOfPets: z.string().min(1, "Please enter number of pets"),
  breed: z.string().min(1, "Please enter breed"),
  size: z.string().min(1, "Please enter size"),
  age: z.string().min(1, "Please enter age"),
  serviceNeeded: z.enum(["pickup", "dropoff", "both"], {
    required_error: "Please select service type needed",
  }),
  address: z.string().min(1, "Please enter pick-up/drop-off address"),
  desiredDate: z.string().min(1, "Please select desired date"),
  pickupTime: z.string().min(1, "Please select pickup time"),
  requestedService: z.enum(["grooming", "daycare", "boarding", "other"], {
    required_error: "Please select service type",
  }),
  otherServiceType: z.string().optional(),
  specialInstructions: z.string().optional(),
});

type VanFormValues = z.infer<typeof vanFormSchema>;

interface VanBookingFormProps {
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

export function VanBookingForm({ children, variant = 'default', initialOpen = false }: VanBookingFormProps) {
  const [isOpen, setIsOpen] = React.useState(initialOpen);
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const { setIsAnyModalOpen } = useModal();
  const { isDateBlocked } = useBlockedDates('van');
  const { timeSlots, loading: timeSlotsLoading } = useTimeSlots('van');

  const form = useForm<VanFormValues>({
    resolver: zodResolver(vanFormSchema),
    defaultValues: {
      ownerName: "",
      email: "",
      phone: "",
      petNames: "",
      petType: undefined,
      numberOfPets: "",
      breed: "",
      size: "",
      age: "",
      serviceNeeded: undefined,
      address: "",
      desiredDate: "",
      pickupTime: "",
      requestedService: undefined,
      otherServiceType: "",
      specialInstructions: "",
    },
  });

  const watchRequestedService = form.watch("requestedService");

  const onSubmit = async (values: VanFormValues) => {
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
          // Map van form fields to the API expected format
          ownerName: values.ownerName,
          clientEmail: values.email,
          phone: values.phone,
          petType: values.petType,
          petName: values.petNames,
          petAge: values.age,
          breeds: values.breed,
          numberOfPets: values.numberOfPets,
          checkInDate: values.desiredDate,
          checkInTime: values.pickupTime,
          checkOutDate: values.desiredDate,
          checkOutTime: values.pickupTime,
          serviceType: 'van', // Identify as van service
          // Send structured data as separate fields
          petSize: values.size,
          serviceNeeded: values.serviceNeeded,
          address: values.address,
          requestedService: values.requestedService === 'other' ? values.otherServiceType : values.requestedService,
          specialNotes: values.specialInstructions || '', // Only actual special instructions
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send van service request');
      }

      setSubmitStatus('success');
      form.reset();
      
      // Close modal after a delay to show success message
      setTimeout(() => {
        setIsOpen(false);
        setSubmitStatus('idle');
      }, 2000);

    } catch (error) {
      console.error('Error sending van service request:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send van service request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (values: VanFormValues) => {
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
          data-testid="van-booking-trigger"
        >
          {children}
        </button>
      </DialogTrigger>
      
      <DialogContent className="flex flex-col overflow-hidden">
        <DialogHeader>
          <div className="p-6 pt-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Car className="w-8 h-8 text-[#E73992] mr-2" />
                <DialogTitle>PinkVan Request</DialogTitle>
              </div>
              <DialogDescription className="px-4">
                Need a lift for your pup? Our PinkVan offers safe and convenient transportation!
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
                      name="petNames"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Pet&apos;s Name(s) *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Buddy, Luna" 
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
                      name="size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Size *</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value ? { value: field.value, label: field.value } : null}
                              onChange={(option) => field.onChange(option?.value)}
                              options={[
                                { value: 'Small', label: 'Small' },
                                { value: 'Medium', label: 'Medium' },
                                { value: 'Large', label: 'Large' }
                              ]}
                              placeholder="Select size"
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
                      name="serviceNeeded"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Pick-Up, Drop-Off, or Both? *</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value ? { 
                                value: field.value, 
                                label: field.value === 'pickup' ? 'Pick-Up Only' : 
                                       field.value === 'dropoff' ? 'Drop-Off Only' : 
                                       'Both Pick-Up & Drop-Off' 
                              } : null}
                              onChange={(option) => field.onChange(option?.value)}
                              options={[
                                { value: 'pickup', label: 'Pick-Up Only' },
                                { value: 'dropoff', label: 'Drop-Off Only' },
                                { value: 'both', label: 'Both Pick-Up & Drop-Off' }
                              ]}
                              placeholder="Select service needed"
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
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Address for Pick-Up/Drop-Off *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Full address including city and zip code" 
                              {...field} 
                              className="h-11 text-base border-gray-200 bg-[#F2F2F2] rounded-xl focus:border-[#E73992] focus:ring-[#E73992] placeholder:text-gray-400"
                              style={{ fontSize: '16px' }}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Van Service Hours Info */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-5">
                      <p className="text-sm font-medium text-gray-700 mb-2">Van Service Hours</p>
                      <div className="space-y-1 text-xs text-gray-600">
                        <p>• Monday - Saturday: 8:00 AM - 4:00 PM</p>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-600 flex items-start gap-1">
                          <span className="text-[#E73992]">•</span>
                          <span>Van service requires 24 hours advance booking</span>
                        </p>
                        <p className="text-xs text-gray-600 mt-1 flex items-start gap-1">
                          <span className="text-[#E73992]">•</span>
                          <span>Additional charges apply based on distance and time</span>
                        </p>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="desiredDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Desired Date *</FormLabel>
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
                                // Only check if the date is blocked
                                return isDateBlocked(date);
                              }}
                              placeholderText="Select service date"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pickupTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Pick-up Time *</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value ? timeSlots.time_window?.find(opt => opt.value === field.value) : null}
                              onChange={(option) => field.onChange(option?.value)}
                              options={timeSlots.time_window || []}
                              placeholder="Select pick-up time"
                              styles={customSelectStyles}
                              className="react-select-container"
                              classNamePrefix="react-select"
                              isClearable={false}
                              isSearchable={false}
                              isDisabled={!form.watch('desiredDate') || timeSlotsLoading}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                       
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="requestedService"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Service Type *</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value ? { 
                                value: field.value, 
                                label: timeSlots.service_type?.find(opt => opt.value === field.value)?.label || field.value.charAt(0).toUpperCase() + field.value.slice(1) 
                              } : null}
                              onChange={(option) => field.onChange(option?.value)}
                              options={timeSlots.service_type || [
                                { value: 'grooming', label: 'Grooming' },
                                { value: 'daycare', label: 'Daycare' },
                                { value: 'boarding', label: 'Boarding' },
                                { value: 'other', label: 'Other' }
                              ]}
                              placeholder="Select service type"
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

                    {watchRequestedService === 'other' && (
                      <FormField
                        control={form.control}
                        name="otherServiceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium text-sm">Please specify other service</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Describe the service needed" 
                                {...field} 
                                className="h-11 text-base border-gray-200 bg-[#F2F2F2] rounded-xl focus:border-[#E73992] focus:ring-[#E73992] placeholder:text-gray-400"
                                style={{ fontSize: '16px' }}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="specialInstructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Special Instructions (optional)</FormLabel>
                          <FormControl>
                            <textarea 
                              placeholder="Gate code, preferred door, pet handling notes, etc..."
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
                        <span className="text-sm">PinkVan request sent successfully! We&apos;ll contact you soon to confirm your transportation.</span>
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
                        <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{errorMessage || 'Failed to send PinkVan request. Please try again.'}</span>
                      </div>
                    )}

                {/* Add padding at bottom for mobile fixed button */}
                <div className="h-32 md:hidden" />
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
                Send PinkVan Request
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}