"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Select from "react-select";
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

const vanFormSchema = z.object({
  ownerName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  petNames: z.string().min(1, "Please enter your pet's name(s)"),
  breedAndSize: z.string().min(1, "Please enter breed and size"),
  serviceNeeded: z.enum(["pickup", "dropoff", "both"], {
    required_error: "Please select service type needed",
  }),
  address: z.string().min(1, "Please enter pick-up/drop-off address"),
  desiredDate: z.string().min(1, "Please select desired date"),
  timeWindow: z.string().min(1, "Please enter preferred time window"),
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
const customSelectStyles = {
  control: (base: any, state: any) => ({
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
  menu: (base: any) => ({
    ...base,
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    zIndex: 999,
  }),
  menuList: (base: any) => ({
    ...base,
    padding: 0,
  }),
  option: (base: any, state: any) => ({
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
  singleValue: (base: any) => ({
    ...base,
    color: '#374151',
    fontSize: '16px',
  }),
  placeholder: (base: any) => ({
    ...base,
    color: '#9CA3AF',
    fontSize: '16px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (base: any, state: any) => ({
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

  // Generate time options based on selected date and business hours
  const generateTimeOptions = (date: string) => {
    if (!date) return [];
    
    // Create date with explicit timezone handling to avoid timezone issues
    const dateParts = date.split('-');
    const selectedDate = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
    const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    const options = [];
    
    // Sunday: Limited hours - 12:00 PM - 4:00 PM
    if (dayOfWeek === 0) {
      options.push(
        { value: "12:00 PM - 2:00 PM", label: "12:00 PM - 2:00 PM" },
        { value: "2:00 PM - 4:00 PM", label: "2:00 PM - 4:00 PM" }
      );
    } else {
      // Monday-Saturday: Full hours
      options.push(
        { value: "8:00 AM - 10:00 AM", label: "8:00 AM - 10:00 AM (Morning Pickup)" },
        { value: "10:00 AM - 12:00 PM", label: "10:00 AM - 12:00 PM" },
        { value: "12:00 PM - 2:00 PM", label: "12:00 PM - 2:00 PM" },
        { value: "2:00 PM - 4:00 PM", label: "2:00 PM - 4:00 PM" },
        { value: "3:00 PM - 5:00 PM", label: "3:00 PM - 5:00 PM (Afternoon Drop-off)" },
        { value: "4:00 PM - 6:00 PM", label: "4:00 PM - 6:00 PM" }
      );
    }
    
    return options;
  };

  const form = useForm<VanFormValues>({
    resolver: zodResolver(vanFormSchema),
    defaultValues: {
      ownerName: "",
      email: "",
      phone: "",
      petNames: "",
      breedAndSize: "",
      serviceNeeded: undefined,
      address: "",
      desiredDate: "",
      timeWindow: "",
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
          petType: 'van-service',
          breeds: values.breedAndSize,
          numberOfPets: values.petNames,
          checkInDate: values.desiredDate,
          checkInTime: values.timeWindow.split(' - ')[0],
          checkOutDate: values.desiredDate,
          checkOutTime: values.timeWindow.split(' - ')[1] || values.timeWindow.split(' - ')[0],
          serviceType: 'van', // Identify as van service
          specialNotes: `Pet Name(s): ${values.petNames}\nService Needed: ${values.serviceNeeded}\nAddress: ${values.address}\nRequested Service: ${values.requestedService === 'other' ? values.otherServiceType : values.requestedService}${values.specialInstructions ? `\nSpecial Instructions: ${values.specialInstructions}` : ''}`,
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

  // Control body scroll when modal is open and reset states when closed
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      setIsAnyModalOpen(true);
    } else {
      document.body.classList.remove('overflow-hidden');
      setIsAnyModalOpen(false);
      // Reset states when modal closes
      setSubmitStatus('idle');
      setErrorMessage('');
      setIsLoading(false);
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      setIsAnyModalOpen(false);
    };
  }, [isOpen, setIsAnyModalOpen]);


  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={variant === 'cta' 
          ? "inline-flex items-center justify-center bg-white text-[#E73992] hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold transition-colors"
          : "bg-[#E73992] text-white hover:bg-[#d3337f] rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg font-medium transition-colors inline-flex items-center justify-center whitespace-nowrap"
        }
        data-testid="van-booking-trigger"
      >
        {children}
      </button>

      {/* Custom Modal with mobile-first fullscreen design */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white md:bg-black md:bg-opacity-50 md:backdrop-blur-sm md:flex md:items-start md:justify-center">
          {/* Desktop backdrop */}
          <div 
            className="hidden md:block fixed inset-0" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Mobile: fullscreen, Desktop: modal */}
          <div className="h-full w-full md:relative md:w-full md:max-w-lg md:mx-4 md:mt-8 md:mb-8 md:h-[calc(100vh-64px)] bg-white md:rounded-2xl md:shadow-2xl flex flex-col">
            {/* Header - Fixed */}
            <div className="sticky top-0 bg-white z-10 border-b border-gray-100">
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full shadow-md"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-6 pt-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Car className="w-8 h-8 text-[#E73992] mr-2" />
                    <h2 className="text-2xl font-bold text-gray-900">PinkVan Request</h2>
                  </div>
                  <p className="text-gray-600 text-sm px-4">
                    Need a lift for your pup? Our PinkVan offers safe and convenient transportation!
                  </p>
                </div>
              </div>
            </div>

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
                          <FormLabel className="text-gray-700 font-medium text-sm">Pet's Name(s) *</FormLabel>
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
                      name="breedAndSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Breed & Size *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Golden Retriever, Large" 
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
                                  field.onChange(format(date, 'yyyy-MM-dd'));
                                }
                              }}
                              disabled={(date) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                return date < today;
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
                      name="timeWindow"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium text-sm">Time Window *</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value ? generateTimeOptions(form.watch('desiredDate')).find(opt => opt.value === field.value) : null}
                              onChange={(option) => field.onChange(option?.value)}
                              options={generateTimeOptions(form.watch('desiredDate'))}
                              placeholder="Select time window"
                              styles={customSelectStyles}
                              className="react-select-container"
                              classNamePrefix="react-select"
                              isClearable={false}
                              isSearchable={false}
                              isDisabled={!form.watch('desiredDate')}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                          <p className="text-xs text-gray-500 mt-1">
                            Mon-Sat: Morning Pickup (8-10 AM) | Afternoon Drop-off (3-5 PM)
                          </p>
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
                                label: field.value.charAt(0).toUpperCase() + field.value.slice(1) 
                              } : null}
                              onChange={(option) => field.onChange(option?.value)}
                              options={[
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
                        <span className="text-sm">PinkVan request sent successfully! We'll contact you soon to confirm your transportation.</span>
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
            <div className="sticky bottom-0 p-6 pt-4 border-t border-gray-100 bg-white">
              <p className="text-xs text-gray-500 mb-3 text-center">
                Note: PinkVan rides must be scheduled in advance. Additional fee applies based on distance.
              </p>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}