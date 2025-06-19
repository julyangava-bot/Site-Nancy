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

const petHotelFormSchema = z.object({
  ownerName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  petType: z.enum(["dog", "cat", "both"], {
    required_error: "Please select your pet type",
  }),
  breeds: z.string().min(1, "Please enter your pet's breed(s)"),
  numberOfPets: z.string().min(1, "Please enter number of pets"),
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
}

export function PetHotelBookingForm({ children, variant = 'default' }: PetHotelBookingFormProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const { setIsAnyModalOpen } = useModal();

  // Generate time options based on business hours
  const generateTimeOptions = (date: string) => {
    if (!date) return [];
    
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    let startHour = 8;
    let startMinute = 30;
    let endHour = 17;
    let endMinute = 0;
    
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
      
      options.push({ value: timeString, label: displayTime });
      
      // Increment by 30 minutes
      currentMinute += 30;
      if (currentMinute >= 60) {
        currentMinute = 0;
        currentHour += 1;
      }
    }
    
    return options;
  };

  const form = useForm<PetHotelFormValues>({
    resolver: zodResolver(petHotelFormSchema),
    defaultValues: {
      ownerName: "",
      email: "",
      phone: "",
      petType: undefined,
      breeds: "",
      numberOfPets: "",
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
        data-testid="pet-hotel-booking-trigger"
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
                  <h2 className="text-2xl font-bold text-gray-900">Pet Hotel Booking</h2>
                </div>
                <p className="text-gray-600">
                  Let us know about your furry friend&apos;s stay! We&apos;ll get back to you as soon as possible.
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
                    name="petType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">What kind of pet(s)? *</FormLabel>
                        <FormControl>
                          <select 
                            {...field} 
                            className="flex h-9 w-full rounded-[6px] border-[0.5px] border-[#E5E5E5] bg-[#F2F2F2] px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E73992] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          >
                            <option value="">Select pet type</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="both">Both Dogs and Cats</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="breeds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Breed(s) *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Golden Retriever, Maine Coon" 
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
                    name="numberOfPets"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">How many pets will be staying? *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., 1, 2, 3" 
                            {...field} 
                            className="border-gray-200 focus:border-[#E73992] focus:ring-[#E73992]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="checkInDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Check-in Date *</FormLabel>
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
                      name="checkOutDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Check-out Date *</FormLabel>
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="checkInTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Check-in Time *</FormLabel>
                          <FormControl>
                            <select 
                              {...field} 
                              className="flex h-9 w-full rounded-[6px] border-[0.5px] border-[#E5E5E5] bg-[#F2F2F2] px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E73992] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            >
                              <option value="">Select time</option>
                              {generateTimeOptions(form.watch('checkInDate')).map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-gray-500 mt-1">
                            Mon-Sat: 8:30 AM - 5:00 PM | Sun: 12:00 PM - 4:00 PM
                          </p>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="checkOutTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Check-out Time *</FormLabel>
                          <FormControl>
                            <select 
                              {...field} 
                              className="flex h-9 w-full rounded-[6px] border-[0.5px] border-[#E5E5E5] bg-[#F2F2F2] px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E73992] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            >
                              <option value="">Select time</option>
                              {generateTimeOptions(form.watch('checkOutDate')).map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-gray-500 mt-1">
                            Mon-Sat: 8:30 AM - 5:00 PM | Sun: 12:00 PM - 4:00 PM
                          </p>
                        </FormItem>
                      )}
                    />
                  </div>

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
                    name="specialNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Special notes about care or personality (optional)</FormLabel>
                        <FormControl>
                          <textarea 
                            placeholder="Tell us anything special we should know about your pet's care or personality..."
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
                      <span>Booking request sent successfully! We&apos;ll contact you soon.</span>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800">
                      <XCircle className="w-5 h-5" />
                      <span>{errorMessage || 'Failed to send booking request. Please try again.'}</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-100">
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
                          Send Booking Request
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