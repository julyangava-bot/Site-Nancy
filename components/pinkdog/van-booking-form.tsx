"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
}

export function VanBookingForm({ children, variant = 'default' }: VanBookingFormProps) {
  const [isOpen, setIsOpen] = React.useState(false);
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

  // Control body scroll when modal is open and reset states when closed
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsAnyModalOpen(true);
    } else {
      document.body.style.overflow = 'unset';
      setIsAnyModalOpen(false);
      // Reset states when modal closes
      setSubmitStatus('idle');
      setErrorMessage('');
      setIsLoading(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
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

      {/* Custom Modal with proper scroll and positioning */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div 
            className="fixed inset-0" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative w-full max-w-md mx-4 mt-16 sm:mt-20 mb-8 bg-white rounded-2xl shadow-2xl max-h-[calc(100vh-100px)] sm:max-h-[calc(100vh-120px)] overflow-hidden">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto max-h-[calc(100vh-100px)] sm:max-h-[calc(100vh-120px)] p-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-[#E73992] mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900">🚐 PinkVan Request</h2>
                </div>
                <p className="text-gray-600 text-sm">
                  Need a lift for your pup? Our PinkVan offers safe and convenient transportation! Please fill out the info below to request service.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="ownerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Your Name *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your full name" 
                            {...field} 
                            className="border-gray-200 focus:border-[#E73992] focus:ring-[#E73992]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="petNames"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Pet&apos;s Name(s) *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Buddy, Luna" 
                            {...field} 
                            className="border-gray-200 focus:border-[#E73992] focus:ring-[#E73992]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="breedAndSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Breed & Size *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Golden Retriever, Large" 
                            {...field} 
                            className="border-gray-200 focus:border-[#E73992] focus:ring-[#E73992]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceNeeded"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Pick-Up, Drop-Off, or Both? *</FormLabel>
                        <FormControl>
                          <select 
                            {...field} 
                            className="flex h-9 w-full rounded-[6px] border-[0.5px] border-[#E5E5E5] bg-[#F2F2F2] px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E73992] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          >
                            <option value="">Select service needed</option>
                            <option value="pickup">Pick-Up Only</option>
                            <option value="dropoff">Drop-Off Only</option>
                            <option value="both">Both Pick-Up & Drop-Off</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Address for Pick-Up/Drop-Off *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Full address including city and zip code" 
                            {...field} 
                            className="border-gray-200 focus:border-[#E73992] focus:ring-[#E73992]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="desiredDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Desired Date *</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            className="border-gray-200 focus:border-[#E73992] focus:ring-[#E73992]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="timeWindow"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Time Window *</FormLabel>
                        <FormControl>
                          <select 
                            {...field} 
                            className="flex h-9 w-full rounded-[6px] border-[0.5px] border-[#E5E5E5] bg-[#F2F2F2] px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E73992] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          >
                            <option value="">Select time window</option>
                            {generateTimeOptions(form.watch('desiredDate')).map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-gray-500 mt-1">
                          Mon-Sat: 8:00 AM - 10:00 AM (Morning Pickup) | 3:00 PM - 5:00 PM (Afternoon Drop-off) | Sun: 12:00 PM - 4:00 PM
                        </p>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requestedService"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Service Type *</FormLabel>
                        <FormControl>
                          <select 
                            {...field} 
                            className="flex h-9 w-full rounded-[6px] border-[0.5px] border-[#E5E5E5] bg-[#F2F2F2] px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E73992] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          >
                            <option value="">Select service type</option>
                            <option value="grooming">Grooming</option>
                            <option value="daycare">Daycare</option>
                            <option value="boarding">Boarding</option>
                            <option value="other">Other</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watchRequestedService === 'other' && (
                    <FormField
                      control={form.control}
                      name="otherServiceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Please specify other service</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Describe the service needed" 
                              {...field} 
                              className="border-gray-200 focus:border-[#E73992] focus:ring-[#E73992]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Email Address *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="your.email@example.com" 
                            {...field} 
                            className="border-gray-200 focus:border-[#E73992] focus:ring-[#E73992]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Phone Number *</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel"
                            placeholder="(555) 123-4567" 
                            {...field} 
                            className="border-gray-200 focus:border-[#E73992] focus:ring-[#E73992]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specialInstructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Special Instructions (optional)</FormLabel>
                        <FormControl>
                          <textarea 
                            placeholder="Gate code, preferred door, pet handling notes, etc..."
                            {...field} 
                            className="flex min-h-[80px] w-full rounded-[6px] border-[0.5px] border-[#E5E5E5] bg-[#F2F2F2] px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E73992] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800">
                      <CheckCircle className="w-5 h-5" />
                      <span>PinkVan request sent successfully! We&apos;ll contact you soon to confirm your transportation.</span>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800">
                      <XCircle className="w-5 h-5" />
                      <span>{errorMessage || 'Failed to send PinkVan request. Please try again.'}</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-3 text-center">
                      🦴 Note: PinkVan rides must be scheduled and confirmed in advance. An additional fee applies based on distance — we&apos;ll let you know the total when confirming your request.
                    </p>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#E73992] hover:bg-[#d3337f] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
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
                </form>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 