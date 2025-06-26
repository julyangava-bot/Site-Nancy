"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

// Gallery images - updated with actual file names from public/images/gallery/all
const galleryImages = [
  // General images (will appear in All Photos)
  {
    id: 1,
    src: "/images/gallery/all/image-1.JPG",
    alt: "Happy dog enjoying our facility",
    caption: "Happy dog enjoying our facility",
    category: "general"
  },
  {
    id: 2,
    src: "/images/gallery/all/image-2.jpg",
    alt: "Dogs playing together",
    caption: "Dogs enjoying playtime together",
    category: "general"
  },
  {
    id: 3,
    src: "/images/gallery/all/image-3.JPG",
    alt: "Cute dog portrait",
    caption: "One of our adorable guests",
    category: "general"
  },
  {
    id: 4,
    src: "/images/gallery/all/image-4.JPG",
    alt: "Dog enjoying playtime",
    caption: "Playtime at PinkDog",
    category: "general"
  },
  {
    id: 5,
    src: "/images/gallery/all/image-5.JPG",
    alt: "Dog with stylish bandana",
    caption: "Stylish pup with our branded bandana",
    category: "general"
  },
  {
    id: 6,
    src: "/images/gallery/all/image-6.JPG",
    alt: "Dog after grooming",
    caption: "Fresh and clean after grooming",
    category: "general"
  },
  
  // Service images
  {
    id: 7,
    src: "/images/gallery/all/image-17.JPG",
    alt: "Dog grooming service",
    caption: "Professional grooming service",
    category: "services"
  },
  {
    id: 8,
    src: "/images/gallery/all/image-20.JPG",
    alt: "Professional grooming",
    caption: "Our expert groomers provide personalized attention",
    category: "services"
  },
  {
    id: 9,
    src: "/images/gallery/all/image-21.JPG",
    alt: "Professional grooming",
    caption: "Grooming with care and attention",
    category: "services"
  },
  {
    id: 10,
    src: "/images/gallery/all/image-13.JPG",
    alt: "Dog grooming session",
    caption: "Gentle grooming for your pet",
    category: "services"
  },
  {
    id: 28,
    src: "/images/gallery/services/image-50.jpg",
    alt: "Professional pet care service",
    caption: "Our expert team providing professional pet care",
    category: "services"
  },
  
  // Happy Pets images
  {
    id: 12,
    src: "/images/gallery/all/image-7.jpg",
    alt: "Happy dogs playing",
    caption: "Happy pups enjoying outdoor time",
    category: "pets"
  },
  {
    id: 13,
    src: "/images/gallery/all/image-8.JPG",
    alt: "Dog outdoor portrait",
    caption: "Beautiful portrait of our guest",
    category: "pets"
  },
  {
    id: 14,
    src: "/images/gallery/all/image-9.jpg",
    alt: "Dog playtime",
    caption: "Fun and exercise at PinkDog",
    category: "pets"
  },
  {
    id: 15,
    src: "/images/gallery/all/image-10.JPG",
    alt: "Happy dog smiling",
    caption: "The smile says it all!",
    category: "pets"
  },
  {
    id: 16,
    src: "/images/gallery/all/image-11.JPG",
    alt: "Dog enjoying outdoors",
    caption: "Outdoor adventure time",
    category: "pets"
  },
  {
    id: 17,
    src: "/images/gallery/all/image-12.JPG",
    alt: "Happy dog guest",
    caption: "Another happy guest at PinkDog",
    category: "pets"
  },
  {
    id: 18,
    src: "/images/gallery/all/image-14.JPG",
    alt: "Dog with toy",
    caption: "Playtime with favorite toys",
    category: "pets"
  },
  {
    id: 19,
    src: "/images/gallery/all/image-15.JPG",
    alt: "Dog portrait",
    caption: "Professional pet portrait",
    category: "pets"
  },
  {
    id: 20,
    src: "/images/gallery/all/image-16.JPG",
    alt: "Dog enjoying resort",
    caption: "Relaxing at our pet resort",
    category: "pets"
  },
  
  // Facility images
  {
    id: 21,
    src: "/images/gallery/all/image-17.JPG",
    alt: "PinkDog Pet Resort Facility",
    caption: "Our spacious facility",
    category: "facility"
  },
  {
    id: 22,
    src: "/images/gallery/all/image-40.jpg",
    alt: "PinkDog Pet Resort Interior",
    caption: "Modern and clean interior",
    category: "facility"
  },
  {
    id: 23,
    src: "/images/gallery/all/image-41.jpg",
    alt: "PinkDog Pet Resort Entrance",
    caption: "Welcome to PinkDog Pet Resort",
    category: "facility"
  },
  {
    id: 24,
    src: "/images/gallery/all/image-43.PNG",
    alt: "PinkDog Pet Resort Play Area",
    caption: "Dedicated play area for pets",
    category: "facility"
  },
  {
    id: 25,
    src: "/images/gallery/all/image-28.jpg",
    alt: "PinkDog Pet Resort Garden",
    caption: "Beautiful outdoor space",
    category: "facility"
  },
  {
    id: 26,
    src: "/images/gallery/all/image-29.jpg",
    alt: "PinkDog Pet Resort Reception",
    caption: "Our welcoming reception area",
    category: "facility"
  },
  {
    id: 27,
    src: "/images/gallery/all/image-20.JPG",
    alt: "PinkDog Pet Resort Reception",
    caption: "Our welcoming reception area",
    category: "facility"
  },
  
  // Additional images
  {
    id: 29,
    src: "/images/gallery/all/image-18.jpg",
    alt: "Happy pet at PinkDog",
    caption: "Another happy guest",
    category: "pets"
  },
  {
    id: 30,
    src: "/images/gallery/all/image-19.JPG",
    alt: "Pet enjoying our services",
    caption: "Quality pet care",
    category: "pets"
  },
  {
    id: 31,
    src: "/images/gallery/all/image-22.JPG",
    alt: "Dog grooming detail",
    caption: "Attention to every detail",
    category: "services"
  },
  {
    id: 32,
    src: "/images/gallery/all/image-23.jpg",
    alt: "Pet portrait",
    caption: "Beautiful pet portrait",
    category: "pets"
  },
  {
    id: 33,
    src: "/images/gallery/all/image-24.JPEG",
    alt: "Pet at play",
    caption: "Fun times at PinkDog",
    category: "pets"
  },
  {
    id: 34,
    src: "/images/gallery/all/image-24.JPG",
    alt: "Happy pet",
    caption: "All smiles at PinkDog",
    category: "pets"
  },
  {
    id: 35,
    src: "/images/gallery/all/image-25.jpg",
    alt: "Pet care service",
    caption: "Professional pet care",
    category: "services"
  },
  {
    id: 36,
    src: "/images/gallery/all/image-26.jpg",
    alt: "Happy dog guest",
    caption: "Another satisfied guest",
    category: "pets"
  },
  {
    id: 37,
    src: "/images/gallery/all/image-27.jpg",
    alt: "Pet enjoying facilities",
    caption: "Enjoying our facilities",
    category: "pets"
  },
  {
    id: 38,
    src: "/images/gallery/all/image-30.jpg",
    alt: "PinkDog facility",
    caption: "Our modern facility",
    category: "facility"
  },
  {
    id: 39,
    src: "/images/gallery/all/image-31.jpg",
    alt: "Pet care area",
    caption: "Clean and safe environment",
    category: "facility"
  },
  {
    id: 40,
    src: "/images/gallery/all/image-32.jpg",
    alt: "Happy pet moment",
    caption: "Creating happy memories",
    category: "pets"
  },
  {
    id: 41,
    src: "/images/gallery/all/image-35.jpg",
    alt: "Pet playtime",
    caption: "Active and engaged pets",
    category: "pets"
  },
  {
    id: 42,
    src: "/images/gallery/all/image-36.PNG",
    alt: "PinkDog services",
    caption: "Our comprehensive services",
    category: "services"
  },
  {
    id: 43,
    src: "/images/gallery/all/image-37.PNG",
    alt: "Pet care excellence",
    caption: "Excellence in pet care",
    category: "services"
  },
  {
    id: 44,
    src: "/images/gallery/all/image-38.jpg",
    alt: "Happy pets together",
    caption: "Socialization time",
    category: "pets"
  },
  {
    id: 45,
    src: "/images/gallery/all/image-39.jpg",
    alt: "Pet enjoying daycare",
    caption: "Daycare fun",
    category: "pets"
  },
  {
    id: 46,
    src: "/images/gallery/all/image-42.png",
    alt: "PinkDog Pet Resort",
    caption: "Welcome to PinkDog",
    category: "facility"
  },
  // New WhatsApp images
  {
    id: 47,
    src: "/images/gallery/all/image-47.jpg",
    alt: "Happy pet at PinkDog",
    caption: "Another happy moment at PinkDog",
    category: "pets"
  },
  {
    id: 48,
    src: "/images/gallery/all/image-48.jpg",
    alt: "Pet enjoying our services",
    caption: "Quality pet care at its finest",
    category: "pets"
  },
  {
    id: 49,
    src: "/images/gallery/all/image-49.jpg",
    alt: "Playful pet at daycare",
    caption: "Fun times at daycare",
    category: "pets"
  },
  {
    id: 50,
    src: "/images/gallery/all/image-50.jpg",
    alt: "Pet portrait",
    caption: "Beautiful pet portrait",
    category: "pets"
  },
  {
    id: 51,
    src: "/images/gallery/all/image-51.jpg",
    alt: "Happy dog at PinkDog",
    caption: "All smiles at our facility",
    category: "pets"
  },
  {
    id: 52,
    src: "/images/gallery/all/image-52.jpg",
    alt: "Pet grooming session",
    caption: "Professional grooming care",
    category: "services"
  },
  {
    id: 53,
    src: "/images/gallery/all/image-53.jpg",
    alt: "Playful pets together",
    caption: "Socialization and fun",
    category: "pets"
  },
  {
    id: 54,
    src: "/images/gallery/all/image-54.jpg",
    alt: "Pet enjoying outdoor time",
    caption: "Outdoor adventures",
    category: "pets"
  },
  {
    id: 55,
    src: "/images/gallery/all/image-55.jpg",
    alt: "Happy pet guest",
    caption: "Another satisfied guest",
    category: "pets"
  },
  {
    id: 56,
    src: "/images/gallery/all/image-56.jpg",
    alt: "Pet care service",
    caption: "Dedicated pet care",
    category: "services"
  },
  {
    id: 57,
    src: "/images/gallery/all/image-57.jpg",
    alt: "Cute pet portrait",
    caption: "Adorable moments captured",
    category: "pets"
  },
  {
    id: 58,
    src: "/images/gallery/all/image-58.jpg",
    alt: "Pet at play",
    caption: "Active and happy pets",
    category: "pets"
  },
  {
    id: 59,
    src: "/images/gallery/all/image-59.jpg",
    alt: "Grooming excellence",
    caption: "Professional grooming services",
    category: "services"
  },
  {
    id: 60,
    src: "/images/gallery/all/image-60.jpg",
    alt: "Happy pets playing",
    caption: "Playtime fun",
    category: "pets"
  },
  {
    id: 61,
    src: "/images/gallery/all/image-61.jpg",
    alt: "Pet portrait session",
    caption: "Capturing special moments",
    category: "pets"
  },
  {
    id: 62,
    src: "/images/gallery/all/image-62.jpg",
    alt: "Daycare activities",
    caption: "Fun daycare activities",
    category: "pets"
  },
  {
    id: 63,
    src: "/images/gallery/all/image-63.jpg",
    alt: "Pet enjoying facilities",
    caption: "Enjoying our facilities",
    category: "pets"
  },
  {
    id: 64,
    src: "/images/gallery/all/image-64.jpg",
    alt: "Happy pet moment",
    caption: "Creating happy memories",
    category: "pets"
  },
  {
    id: 65,
    src: "/images/gallery/all/image-65.jpg",
    alt: "Pet grooming",
    caption: "Grooming with care",
    category: "services"
  },
  {
    id: 66,
    src: "/images/gallery/all/image-66.jpg",
    alt: "Playful pet",
    caption: "Always playful and happy",
    category: "pets"
  },
  {
    id: 67,
    src: "/images/gallery/all/image-67.jpg",
    alt: "Pet care excellence",
    caption: "Excellence in pet care",
    category: "services"
  },
  {
    id: 68,
    src: "/images/gallery/all/image-68.jpg",
    alt: "Happy dog guest",
    caption: "Happy guest at PinkDog",
    category: "pets"
  },
  {
    id: 69,
    src: "/images/gallery/all/image-69.jpg",
    alt: "Pet outdoor time",
    caption: "Enjoying the outdoors",
    category: "pets"
  },
  {
    id: 70,
    src: "/images/gallery/all/image-70.jpg",
    alt: "Grooming session",
    caption: "Professional grooming",
    category: "services"
  },
  {
    id: 71,
    src: "/images/gallery/all/image-71.jpg",
    alt: "Pet playtime",
    caption: "Fun and games",
    category: "pets"
  },
  {
    id: 72,
    src: "/images/gallery/all/image-72.jpg",
    alt: "Happy pet portrait",
    caption: "Beautiful portrait",
    category: "pets"
  },
  {
    id: 73,
    src: "/images/gallery/all/image-73.jpg",
    alt: "Pet daycare fun",
    caption: "Daycare adventures",
    category: "pets"
  },
  {
    id: 74,
    src: "/images/gallery/all/image-74.jpg",
    alt: "Pet care service",
    caption: "Quality pet care",
    category: "services"
  },
  {
    id: 75,
    src: "/images/gallery/all/image-75.jpg",
    alt: "Happy pets together",
    caption: "Friends at PinkDog",
    category: "pets"
  },
  {
    id: 76,
    src: "/images/gallery/all/image-76.jpg",
    alt: "Pet grooming care",
    caption: "Gentle grooming care",
    category: "services"
  },
  {
    id: 77,
    src: "/images/gallery/all/image-77.jpg",
    alt: "Playful pet moment",
    caption: "Playful moments",
    category: "pets"
  },
  {
    id: 78,
    src: "/images/gallery/all/image-78.jpg",
    alt: "Pet outdoor adventure",
    caption: "Outdoor fun time",
    category: "pets"
  },
  {
    id: 79,
    src: "/images/gallery/all/image-79.jpg",
    alt: "Happy pet at daycare",
    caption: "Daycare happiness",
    category: "pets"
  },
  {
    id: 80,
    src: "/images/gallery/all/image-80.jpg",
    alt: "Pet grooming excellence",
    caption: "Grooming excellence",
    category: "services"
  },
  {
    id: 81,
    src: "/images/gallery/all/image-81.jpg",
    alt: "Pet portrait",
    caption: "Lovely pet portrait",
    category: "pets"
  },
  {
    id: 82,
    src: "/images/gallery/all/image-82.jpg",
    alt: "Happy pet playing",
    caption: "Playtime joy",
    category: "pets"
  },
  {
    id: 83,
    src: "/images/gallery/all/image-83.jpg",
    alt: "Pet care moment",
    caption: "Caring moments",
    category: "services"
  },
  {
    id: 84,
    src: "/images/gallery/all/image-84.jpg",
    alt: "Pet enjoying daycare",
    caption: "Daycare enjoyment",
    category: "pets"
  },
  {
    id: 85,
    src: "/images/gallery/all/image-85.jpg",
    alt: "Happy pet guest",
    caption: "Happy guest",
    category: "pets"
  },
  {
    id: 86,
    src: "/images/gallery/all/image-86.jpg",
    alt: "Pet grooming time",
    caption: "Grooming time",
    category: "services"
  },
  {
    id: 87,
    src: "/images/gallery/all/image-87.jpg",
    alt: "Playful pets",
    caption: "Playful friends",
    category: "pets"
  },
  {
    id: 88,
    src: "/images/gallery/all/image-88.jpg",
    alt: "Pet outdoor play",
    caption: "Outdoor playtime",
    category: "pets"
  },
  {
    id: 89,
    src: "/images/gallery/all/image-89.jpg",
    alt: "Happy pet moment",
    caption: "Happy moments",
    category: "pets"
  },
  {
    id: 90,
    src: "/images/gallery/all/image-90.jpg",
    alt: "Pet care excellence",
    caption: "Care excellence",
    category: "services"
  },
  {
    id: 91,
    src: "/images/gallery/all/image-91.jpg",
    alt: "Pet portrait session",
    caption: "Portrait session",
    category: "pets"
  },
  {
    id: 92,
    src: "/images/gallery/all/image-92.jpg",
    alt: "Daycare fun time",
    caption: "Daycare fun",
    category: "pets"
  },
  {
    id: 93,
    src: "/images/gallery/all/image-93.jpg",
    alt: "Pet grooming care",
    caption: "Grooming care",
    category: "services"
  },
  {
    id: 94,
    src: "/images/gallery/all/image-94.jpg",
    alt: "Happy pets playing",
    caption: "Playing together",
    category: "pets"
  },
  {
    id: 95,
    src: "/images/gallery/all/image-95.jpg",
    alt: "Pet enjoying facility",
    caption: "Enjoying our facility",
    category: "pets"
  },
  {
    id: 96,
    src: "/images/gallery/all/image-96.jpg",
    alt: "Pet care service",
    caption: "Professional care",
    category: "services"
  },
  {
    id: 97,
    src: "/images/gallery/all/image-97.jpg",
    alt: "Happy pet portrait",
    caption: "Happy portrait",
    category: "pets"
  },
  {
    id: 98,
    src: "/images/gallery/all/image-98.jpg",
    alt: "Pet outdoor fun",
    caption: "Outdoor fun",
    category: "pets"
  },
  {
    id: 99,
    src: "/images/gallery/all/image-99.jpg",
    alt: "Daycare activities",
    caption: "Daycare activities",
    category: "pets"
  },
  {
    id: 100,
    src: "/images/gallery/all/image-100.jpg",
    alt: "Pet grooming session",
    caption: "Grooming session",
    category: "services"
  },
  {
    id: 101,
    src: "/images/gallery/all/image-101.jpg",
    alt: "Happy pet at PinkDog",
    caption: "Happy at PinkDog",
    category: "pets"
  },
  {
    id: 102,
    src: "/images/gallery/all/image-102.jpg",
    alt: "Pet playtime fun",
    caption: "Playtime fun",
    category: "pets"
  },
  {
    id: 103,
    src: "/images/gallery/all/image-103.jpg",
    alt: "Pet care moment",
    caption: "Care moment",
    category: "services"
  },
  {
    id: 104,
    src: "/images/gallery/all/image-104.jpg",
    alt: "Happy pets together",
    caption: "Together at PinkDog",
    category: "pets"
  },
  {
    id: 105,
    src: "/images/gallery/all/image-105.jpg",
    alt: "Pet outdoor adventure",
    caption: "Outdoor adventure",
    category: "pets"
  },
  {
    id: 106,
    src: "/images/gallery/all/image-106.jpg",
    alt: "Pet grooming excellence",
    caption: "Grooming excellence",
    category: "services"
  },
  {
    id: 107,
    src: "/images/gallery/all/image-107.jpg",
    alt: "Pet portrait",
    caption: "Beautiful portrait",
    category: "pets"
  },
  {
    id: 108,
    src: "/images/gallery/all/image-108.jpg",
    alt: "Daycare fun",
    caption: "Fun at daycare",
    category: "pets"
  },
  {
    id: 109,
    src: "/images/gallery/all/image-109.jpg",
    alt: "Happy pet playing",
    caption: "Playing happily",
    category: "pets"
  },
  {
    id: 110,
    src: "/images/gallery/all/image-110.jpg",
    alt: "Pet care service",
    caption: "Quality care",
    category: "services"
  },
  {
    id: 111,
    src: "/images/gallery/all/image-111.jpg",
    alt: "Pet enjoying time",
    caption: "Enjoying time at PinkDog",
    category: "pets"
  },
  {
    id: 112,
    src: "/images/gallery/all/image-112.jpg",
    alt: "Pet grooming",
    caption: "Professional grooming",
    category: "services"
  },
  {
    id: 113,
    src: "/images/gallery/all/image-113.jpg",
    alt: "Happy pet moment",
    caption: "Special moments",
    category: "pets"
  },
  {
    id: 114,
    src: "/images/gallery/all/image-114.jpg",
    alt: "Pet outdoor play",
    caption: "Outdoor play",
    category: "pets"
  },
  {
    id: 115,
    src: "/images/gallery/all/image-115.jpg",
    alt: "Daycare happiness",
    caption: "Happy at daycare",
    category: "pets"
  },
  {
    id: 116,
    src: "/images/gallery/all/image-116.jpg",
    alt: "Pet care excellence",
    caption: "Excellence in care",
    category: "services"
  },
  {
    id: 117,
    src: "/images/gallery/all/image-117.jpg",
    alt: "Pet portrait session",
    caption: "Portrait time",
    category: "pets"
  },
  {
    id: 118,
    src: "/images/gallery/all/image-118.jpg",
    alt: "Happy pets playing",
    caption: "Playing together",
    category: "pets"
  },
  {
    id: 119,
    src: "/images/gallery/all/image-119.jpg",
    alt: "Pet grooming care",
    caption: "Caring grooming",
    category: "services"
  },
  {
    id: 120,
    src: "/images/gallery/all/image-120.jpg",
    alt: "Pet enjoying facility",
    caption: "Enjoying facilities",
    category: "pets"
  },
  {
    id: 121,
    src: "/images/gallery/all/image-121.jpg",
    alt: "Happy pet guest",
    caption: "Happy guest",
    category: "pets"
  },
  {
    id: 122,
    src: "/images/gallery/all/image-122.jpg",
    alt: "Pet daycare fun",
    caption: "Daycare fun time",
    category: "pets"
  },
  {
    id: 123,
    src: "/images/gallery/all/image-123.jpg",
    alt: "Pet care service",
    caption: "Dedicated care",
    category: "services"
  },
  {
    id: 124,
    src: "/images/gallery/all/image-124.jpg",
    alt: "Pet outdoor time",
    caption: "Outdoor time",
    category: "pets"
  },
  {
    id: 125,
    src: "/images/gallery/all/image-125.jpg",
    alt: "Happy pet portrait",
    caption: "Happy portrait",
    category: "pets"
  },
  {
    id: 126,
    src: "/images/gallery/all/image-126.jpg",
    alt: "Pet grooming session",
    caption: "Grooming session",
    category: "services"
  },
  {
    id: 127,
    src: "/images/gallery/all/image-127.jpg",
    alt: "Pet playtime",
    caption: "Playtime at PinkDog",
    category: "pets"
  },
  {
    id: 128,
    src: "/images/gallery/all/image-128.jpg",
    alt: "Happy pet at PinkDog",
    caption: "Another happy day at PinkDog",
    category: "pets"
  }
];

// Limit images for mobile to prevent memory issues
const limitedGalleryImages = galleryImages.slice(0, 50);

// YouTube story videos
const storyVideos = [
  { id: "story01", youtubeId: "b7LtoyqQ0aE", name: "Story 1" },
  { id: "story02", youtubeId: "QbPVFsb5CN0", name: "Story 2" },
  { id: "story03", youtubeId: "81Nkq_yWIr8", name: "Story 3" },
  { id: "story04", youtubeId: "OF7InBTZ7ZY", name: "Story 4" },
  { id: "story05", youtubeId: "LA4NwLOhRzU", name: "Story 5" },
  { id: "story06", youtubeId: "dhXjIlTwmtg", name: "Story 6" },
  { id: "story07", youtubeId: "f2dVmgs5w7Q", name: "Story 7" },
  { id: "story08", youtubeId: "YC8NZ7QPn0w", name: "Story 8" },
  { id: "story09", youtubeId: "woqsN0ZDLY0", name: "Story 9" }
];

// Filter categories
const categories = [
  { id: "all", name: "All Photos" },
  { id: "facility", name: "Our Facility" },
  { id: "pets", name: "Happy Pets" },
  { id: "services", name: "Services" },
  { id: "videos", name: "Videos" }
];

// Type definitions
interface ImageItem {
  id: number;
  src: string;
  alt: string;
  caption: string;
  category: string;
}

interface VideoItem {
  id: string;
  youtubeId: string;
  name: string;
}

// Modal component - Fixed for iOS
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  useEffect(() => {
    if (isOpen) {
      // Add class to body instead of directly manipulating style
      document.body.classList.add('overflow-hidden', 'fixed', 'w-full');
    } else {
      document.body.classList.remove('overflow-hidden', 'fixed', 'w-full');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden', 'fixed', 'w-full');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 overscroll-contain"
      onClick={onClose}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-[10000] p-2"
        aria-label="Close modal"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div 
        className="relative max-w-7xl max-h-[90vh] w-full overscroll-contain" 
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [randomAllPhotos, setRandomAllPhotos] = useState<typeof galleryImages>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [videoStartIndex, setVideoStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [photoCount, setPhotoCount] = useState(6);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  
  // Refs for interval cleanup
  const photoIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Detect iOS
  useEffect(() => {
    const checkIOS = () => {
      const userAgent = navigator.userAgent;
      const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !('MSStream' in window);
      setIsIOS(isIOSDevice);
      return isIOSDevice;
    };
    
    if (typeof window !== 'undefined') {
      checkIOS();
    }
  }, []);

  // Use limited images on mobile to prevent crashes
  const getImageSet = useCallback(() => {
    if (isMobile || isIOS) {
      return limitedGalleryImages;
    }
    return galleryImages;
  }, [isMobile, isIOS]);

  // Check screen size and set photo count
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      
      // Always show 6 photos (3 rows x 2 columns) for smaller screens
      if (width < 1024) {
        setPhotoCount(6);
        setIsMobile(true);
      } else {
        setPhotoCount(8);
        setIsMobile(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // First mount flag to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update random photos - optimized for mobile
  useEffect(() => {
    if (!isMounted) return;
    
    // Disable auto-refresh on iOS to prevent crashes
    if (isIOS) {
      const imageSet = getImageSet();
      const allAvailableImages = imageSet.filter(img => img.category !== "videos");
      const shuffled = [...allAvailableImages].sort(() => 0.5 - Math.random());
      const selectedPhotos = shuffled.slice(0, photoCount);
      setRandomAllPhotos(selectedPhotos);
      setIsLoadingImages(false);
      return;
    }

    const imageSet = getImageSet();
    const allAvailableImages = imageSet.filter(img => img.category !== "videos");
    
    const updateRandomPhotos = () => {
      setIsLoadingImages(true);
      
      const shuffled = [...allAvailableImages].sort(() => 0.5 - Math.random());
      const selectedPhotos = shuffled.slice(0, photoCount);
      
      setRandomAllPhotos(selectedPhotos);
      
      setTimeout(() => setIsLoadingImages(false), 300);
    };
    
    updateRandomPhotos();
    
    // Clear any existing interval
    if (photoIntervalRef.current) {
      clearInterval(photoIntervalRef.current);
    }
    
    // Only set interval on non-mobile devices
    if (!isMobile) {
      photoIntervalRef.current = setInterval(updateRandomPhotos, 15000); // Increased to 15s
    }
    
    return () => {
      if (photoIntervalRef.current) {
        clearInterval(photoIntervalRef.current);
      }
    };
  }, [isMounted, photoCount, isMobile, isIOS, getImageSet]);

  // Rotate videos - optimized
  useEffect(() => {
    if (!isMobile || selectedCategory !== "videos") {
      if (videoIntervalRef.current) {
        clearInterval(videoIntervalRef.current);
      }
      return;
    }
    
    videoIntervalRef.current = setInterval(() => {
      setVideoStartIndex((prev) => (prev + 6) % storyVideos.length);
    }, 20000); // Increased to 20s
    
    return () => {
      if (videoIntervalRef.current) {
        clearInterval(videoIntervalRef.current);
      }
    };
  }, [isMobile, selectedCategory]);

  // Get videos to display based on mobile/desktop
  const getDisplayedVideos = () => {
    if (!isMobile) {
      return storyVideos;
    }
    
    // On mobile, show 6 videos starting from videoStartIndex
    const videos = [];
    for (let i = 0; i < 6; i++) {
      const index = (videoStartIndex + i) % storyVideos.length;
      videos.push(storyVideos[index]);
    }
    return videos;
  };

  // Ensure we ALWAYS have exactly the right amount of images for All Photos
  const getAllPhotosImages = useCallback(() => {
    const imageSet = getImageSet();
    
    // During initial server render or before client mount, use a deterministic subset
    // This prevents hydration mismatch errors
    if (!isMounted) {
      // Use first 6 images from all categories in a deterministic order
      return imageSet
        .filter(img => img.category !== "videos")
        .slice(0, 6);
    }
    
    // After client-side mount, use random photos with the correct count
    if (randomAllPhotos.length === photoCount) {
      return randomAllPhotos;
    }
    
    // Fallback to deterministic subset if randomAllPhotos isn't populated yet
    return imageSet
      .filter(img => img.category !== "videos")
      .slice(0, photoCount);
  }, [isMounted, randomAllPhotos, photoCount, getImageSet]);
  
  // Filter based on selected category
  const filteredImages = selectedCategory === "all" 
    ? getAllPhotosImages()
    : getImageSet().filter(image => image.category === selectedCategory);
  
  // For non-All Photos categories, use all available images in that category
  const displayedImages = filteredImages;
  
  const isVideoTab = selectedCategory === "videos";

  // Function to determine if the last row should be centered
  const shouldCenterLastRow = (itemCount: number, itemsPerRow: number) => {
    return itemCount % itemsPerRow !== 0;
  };

  // Function to get grid layout based on screen size
  const getGridLayout = () => {
    if (isVideoTab) {
      return "grid-cols-2 lg:grid-cols-6";
    }
    
    // For photos: always 2 columns on smaller screens, 4 on large screens
    if (selectedCategory === "all") {
      return "grid-cols-2 lg:grid-cols-4";
    }
    
    return "grid-cols-2 lg:grid-cols-4";
  };

  // Function to render video items - optimized for iOS
  const renderVideoItems = (videos: VideoItem[]) => {
    const itemsPerRow = isMobile ? 2 : 6;
    const shouldCenter = shouldCenterLastRow(videos.length, itemsPerRow);
    const lastRowItemCount = videos.length % itemsPerRow;
    const lastRowStartIndex = videos.length - lastRowItemCount;

    return (
      <>
        {/* Regular grid for complete rows */}
        <div className={`grid gap-4 ${getGridLayout()}`}>
          {videos.slice(0, shouldCenter ? lastRowStartIndex : videos.length).map((video) => (
            <div
              key={video.id}
              className="relative aspect-[9/16] overflow-hidden rounded-xl shadow-md cursor-pointer group"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 200px"
                  className="object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = `https://img.youtube.com/vi/${video.youtubeId}/0.jpg`;
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-sm font-medium">{video.name}</p>
                </div>
              </div>
              {/* Play icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Centered last row if needed */}
        {shouldCenter && lastRowItemCount > 0 && (
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            {videos.slice(lastRowStartIndex).map((video) => (
              <div
                key={video.id}
                className="relative aspect-[9/16] overflow-hidden rounded-xl shadow-md cursor-pointer group"
                style={{ width: isMobile ? 'calc(50% - 0.5rem)' : 'calc(16.666% - 0.75rem)', maxWidth: '300px' }}
                onClick={() => setSelectedVideo(video)}
              >
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 200px"
                    className="object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = `https://img.youtube.com/vi/${video.youtubeId}/0.jpg`;
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm font-medium">{video.name}</p>
                  </div>
                </div>
                {/* Play icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  // Skeleton loading component
  const ImageSkeleton = () => (
    <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-md bg-gray-200 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
    </div>
  );

  // Function to render image items - optimized for iOS
  const renderImageItems = (images: ImageItem[]) => {
    const itemsPerRow = isMobile ? 2 : 4;
    const shouldCenter = shouldCenterLastRow(images.length, itemsPerRow);
    const lastRowItemCount = images.length % itemsPerRow;
    const lastRowStartIndex = images.length - lastRowItemCount;

    return (
      <>
          {/* Regular grid for complete rows */}
          <div className={`grid gap-4 ${getGridLayout()}`}>
            {images.slice(0, shouldCenter ? lastRowStartIndex : images.length).map((image) => {
              return (
                <div
                  key={image.id}
                  className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-md cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  {selectedCategory === "all" && isLoadingImages && !isIOS ? (
                    <ImageSkeleton />
                  ) : (
                    <>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        loading={isIOS ? "eager" : "lazy"}
                        quality={isIOS ? 75 : 85}
                        placeholder={isIOS ? undefined : "blur"}
                        blurDataURL={isIOS ? undefined : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjJkN2U1Ii8+PC9zdmc+"}
                        onLoad={() => !isIOS && setIsLoadingImages(false)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#E73992]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <p className="text-white font-medium text-sm">{image.caption}</p>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Centered last row if needed */}
          {shouldCenter && lastRowItemCount > 0 && (
            <div className="flex justify-center gap-4 mt-4 flex-wrap">
              {images.slice(lastRowStartIndex).map((image) => {
                return (
                  <div
                    key={image.id}
                    className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-md cursor-pointer group"
                    style={{ width: isMobile ? 'calc(50% - 0.5rem)' : 'calc(25% - 0.75rem)', maxWidth: '300px' }}
                    onClick={() => setSelectedImage(image)}
                  >
                    {selectedCategory === "all" && isLoadingImages && !isIOS ? (
                      <ImageSkeleton />
                    ) : (
                      <>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          loading={isIOS ? "eager" : "lazy"}
                          quality={isIOS ? 75 : 85}
                          placeholder={isIOS ? undefined : "blur"}
                          blurDataURL={isIOS ? undefined : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjJkN2U1Ii8+PC9zdmc+"}
                          onLoad={() => !isIOS && setIsLoadingImages(false)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#E73992]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <p className="text-white font-medium text-sm">{image.caption}</p>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
    );
  };

  // Get all images for the selected category
  const getCategoryImages = useCallback(() => {
    const imageSet = getImageSet();
    if (selectedCategory === "all") {
      return imageSet.filter(img => img.category !== "videos");
    }
    return imageSet.filter(img => img.category === selectedCategory);
  }, [selectedCategory, getImageSet]);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-[#E73992]">Gallery</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Take a peek at our facilities and the happy pets we care for
          </p>
        </motion.div>
        
        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-[#E73992] text-white"
                  : "bg-[#FCD1E6] bg-opacity-40 text-gray-700 hover:bg-opacity-60"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Gallery content */}
        <div className="relative">
          {selectedCategory === "all" ? (
            renderImageItems(displayedImages as ImageItem[])
          ) : isVideoTab ? (
            renderVideoItems(getDisplayedVideos())
          ) : (
            renderImageItems(displayedImages as ImageItem[])
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 italic">
            We take pride in providing a clean, safe, and fun environment for all our furry guests!
          </p>
        </motion.div>
      </div>

      {/* Image Modal with Swiper - Optimized for iOS */}
      <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
        {selectedImage && (
          <div className="flex items-center justify-center h-full">
            <div className="w-full h-full max-h-[90vh] max-w-6xl">
              {/* Main Swiper */}
              <div className="relative bg-black rounded-lg overflow-hidden h-full">
                {isIOS ? (
                  // Simple image view for iOS
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={selectedImage.src}
                      alt={selectedImage.alt}
                      width={1200}
                      height={900}
                      className="object-contain max-w-full max-h-full"
                      style={{ maxHeight: '85vh' }}
                      priority
                      quality={85}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
                      <p className="text-white text-center text-sm sm:text-lg">{selectedImage.caption}</p>
                    </div>
                    {/* Simple navigation for iOS */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 sm:px-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const currentIndex = getCategoryImages().findIndex(img => img.id === selectedImage.id);
                          const prevIndex = currentIndex > 0 ? currentIndex - 1 : getCategoryImages().length - 1;
                          setSelectedImage(getCategoryImages()[prevIndex]);
                        }}
                        className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                        aria-label="Previous image"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const currentIndex = getCategoryImages().findIndex(img => img.id === selectedImage.id);
                          const nextIndex = currentIndex < getCategoryImages().length - 1 ? currentIndex + 1 : 0;
                          setSelectedImage(getCategoryImages()[nextIndex]);
                        }}
                        className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                        aria-label="Next image"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  // Full Swiper for non-iOS devices
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={10}
                    navigation={true}
                    pagination={{ clickable: true }}
                    initialSlide={getCategoryImages().findIndex(img => img.id === selectedImage.id)}
                    className="h-full w-full"
                    style={{ height: '100%' }}
                  >
                    {getCategoryImages().map((image) => (
                      <SwiperSlide key={image.id} className="flex items-center justify-center">
                        <div className="relative w-full h-full flex items-center justify-center bg-black">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={1600}
                            height={1200}
                            className="object-contain max-w-full max-h-full"
                            style={{ maxHeight: '85vh' }}
                            priority
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                            <p className="text-white text-center text-lg">{image.caption}</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Video Modal - Optimized for iOS */}
      <Modal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)}>
        {selectedVideo && (
          <div className="flex items-center justify-center h-full">
            <div className="relative w-full max-w-[506px]" style={{ aspectRatio: '9/16' }}>
              {isIOS ? (
                // For iOS, use a link to YouTube app/website
                <div className="w-full h-full bg-black rounded-lg flex flex-col items-center justify-center p-6">
                  <Image
                    src={`https://img.youtube.com/vi/${selectedVideo.youtubeId}/hqdefault.jpg`}
                    alt={selectedVideo.name}
                    width={480}
                    height={360}
                    className="rounded-lg mb-4"
                  />
                  <p className="text-white text-lg mb-4">{selectedVideo.name}</p>
                  <a
                    href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#E73992] text-white px-6 py-3 rounded-full font-medium hover:bg-[#d3337f] transition-colors"
                  >
                    Watch on YouTube
                  </a>
                </div>
              ) : (
                // Full iframe for non-iOS devices
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&mute=0&loop=1&playlist=${selectedVideo.youtubeId}&controls=1&showinfo=0&rel=0&modestbranding=1`}
                  className="absolute inset-0 w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}