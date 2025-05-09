"use client";

import { useState, useEffect } from 'react';

export type DriveVideo = {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  createdTime: string;
  directUrl: string;
  videoUrl: string;
  embedUrl: string;
  iframeUrl: string;
};

export function useStoriesVideos() {
  const [videos, setVideos] = useState<DriveVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/refresh-stories');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch videos: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setVideos(data.videos || []);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError(err instanceof Error ? err.message : 'Failed to load videos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
    
    // We don't need to set up a polling mechanism here since our API handles caching
  }, []);

  return { videos, isLoading, error };
} 