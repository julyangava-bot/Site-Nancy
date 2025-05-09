"use client";

import React from 'react';
import { useStoriesVideos } from '@/hooks/useStoriesVideos';

export function StoriesGrid() {
  const { videos, isLoading, error } = useStoriesVideos();

  if (isLoading) {
    return (
      <div className="w-full py-10 flex justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-36 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-10 text-center">
        <p className="text-red-500">Failed to load videos: {error}</p>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="w-full py-10 text-center">
        <p className="text-gray-500">No videos available at the moment</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">Our Stories</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="rounded-lg overflow-hidden shadow-lg bg-white">
            <div className="relative pt-[75%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={video.embedUrl}
                title={video.name}
                allow="autoplay"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg truncate">{video.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(video.createdTime).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 