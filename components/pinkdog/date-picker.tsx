"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "@/styles/date-picker.css";

interface DatePickerProps {
  selected: string;
  onSelect: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  placeholderText?: string;
}

export function DatePicker({ selected, onSelect, disabled, placeholderText = "Select date" }: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  // Parse the date string properly to avoid timezone issues
  const selectedDate = selected ? new Date(selected + 'T00:00:00') : undefined;

  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-11 px-4 text-base border-[0.5px] border-[#E5E5E5] bg-[#F2F2F2] rounded-xl focus:border-[#E73992] focus:ring-1 focus:ring-[#E73992] placeholder:text-gray-400 text-left flex items-center justify-between hover:bg-[#F8F8F8] transition-colors"
        style={{ fontSize: '16px' }}
      >
        <span className={selectedDate ? "text-gray-900" : "text-gray-400"}>
          {selectedDate ? format(selectedDate, "MMM dd, yyyy") : placeholderText}
        </span>
        <CalendarIcon className="w-5 h-5 text-gray-400" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-25"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Calendar popup - centered on screen for both mobile and desktop */}
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 md:left-1/2 md:right-auto md:-translate-x-1/2">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-sm mx-auto">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  onSelect(date);
                  setIsOpen(false);
                }}
                disabled={disabled}
                showOutsideDays={false}
                fixedWeeks
                components={{
                  Chevron: ({ orientation }) => 
                    orientation === "left" ? 
                      <ChevronLeft className="w-5 h-5" /> : 
                      <ChevronRight className="w-5 h-5" />
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}