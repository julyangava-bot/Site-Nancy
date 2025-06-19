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

const daycareFormSchema = z.object({
  ownerName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  dogName: z.string().min(1, "Please enter your dog's name"),
  breedAndAge: z.string().min(1, "Please enter breed and age"),
  previousDaycare: z.enum(["yes", "no"], {
    required_error: "Please select if your dog has attended daycare before",
  }),
  socialBehavior: z.string().min(1, "Please describe how your dog is around other dogs"),
  daycareDate: z.string().min(1, "Please select daycare date"),
  dropOffTime: z.string().min(1, "Please select drop-off time"),
  pickUpTime: z.string().min(1, "Please select pick-up time"),
  specialNotes: z.string().optional(),
});

type DaycareFormValues = z.infer<typeof daycareFormSchema>;

interface DaycareBookingFormProps {
  children: React.ReactNode;
  variant?: 'default' | 'cta';
}

export function DaycareBookingForm({ children, variant = 'default' }: DaycareBookingFormProps) {
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

  const form = useForm<DaycareFormValues>({
    resolver: zodResolver(daycareFormSchema),
    defaultValues: {
      ownerName: "",
      email: "",
      phone: "",
      dogName: "",
      breedAndAge: "",
      previousDaycare: undefined,
      socialBehavior: "",
      daycareDate: "",
      dropOffTime: "",
      pickUpTime: "",
      specialNotes: "",
    },
  });

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
          petType: 'dog',
          breeds: values.breedAndAge,
          numberOfPets: '1',
          checkInDate: values.daycareDate,
          checkInTime: values.dropOffTime,
          checkOutDate: values.daycareDate, // Same day for daycare
          checkOutTime: values.pickUpTime,
          specialNotes: `Dog Name: ${values.dogName}\nPrevious Daycare Experience: ${values.previousDaycare === 'yes' ? 'Yes' : 'No'}\nSocial Behavior: ${values.socialBehavior}${values.specialNotes ? `\nAdditional Notes: ${values.specialNotes}` : ''}`,
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
        data-testid="daycare-booking-trigger"
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
                  <h2 className="text-2xl font-bold text-gray-900">🐶 Daycare Request</h2>
                </div>
                <p className="text-gray-600 text-sm">
                  We&apos;re excited to welcome your pup to our daycare! Please fill out the info below so we can schedule their temperament test and get them ready for fun, safe play.
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
                    name="dogName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Dog&apos;s Name *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Buddy" 
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
                    name="breedAndAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Breed & Age *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Golden Retriever, 3 years old" 
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
                    name="previousDaycare"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Has your dog attended daycare before? *</FormLabel>
                        <FormControl>
                          <select 
                            {...field} 
                            className="flex h-9 w-full rounded-[6px] border-[0.5px] border-[#E5E5E5] bg-[#F2F2F2] px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E73992] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          >
                            <option value="">Select an option</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="socialBehavior"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">How is your dog around other dogs? *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Friendly, Shy, Selective, Reactive, etc." 
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
                    name="daycareDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Daycare Date *</FormLabel>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="dropOffTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Drop-off Time *</FormLabel>
                          <FormControl>
                            <select 
                              {...field} 
                              className="flex h-9 w-full rounded-[6px] border-[0.5px] border-[#E5E5E5] bg-[#F2F2F2] px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E73992] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            >
                              <option value="">Select time</option>
                              {generateTimeOptions(form.watch('daycareDate')).map(option => (
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
                      name="pickUpTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Pick-up Time *</FormLabel>
                          <FormControl>
                            <select 
                              {...field} 
                              className="flex h-9 w-full rounded-[6px] border-[0.5px] border-[#E5E5E5] bg-[#F2F2F2] px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E73992] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            >
                              <option value="">Select time</option>
                              {generateTimeOptions(form.watch('daycareDate')).map(option => (
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
                    name="specialNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Additional notes (optional)</FormLabel>
                        <FormControl>
                          <textarea 
                            placeholder="Any special care instructions or behavior notes..."
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
                      <span>Daycare request sent successfully! We&apos;ll contact you soon to schedule a temperament test.</span>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800">
                      <XCircle className="w-5 h-5" />
                      <span>{errorMessage || 'Failed to send daycare request. Please try again.'}</span>
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
                          Send Daycare Request
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