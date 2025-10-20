import { NextResponse } from 'next/server';

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  createdTime: string;
  webContentLink?: string;
};

// Cache for storing the video files data with a timestamp
let videosCache: {
  timestamp: number;
  data: DriveFile[];
} | null = null;

// Cache validity duration (10 minutes in milliseconds)
const CACHE_DURATION = 10 * 60 * 1000;

// Force dynamic rendering to prevent static generation during build
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check if we have a valid cache
    const now = Date.now();
    if (
      videosCache &&
      now - videosCache.timestamp < CACHE_DURATION &&
      videosCache.data.length > 0
    ) {
      // Return cached data if it's still valid
      return NextResponse.json({
        videos: videosCache.data,
        cached: true,
        timestamp: videosCache.timestamp,
      });
    }

    // Verify that the required environment variables are set
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const folderId = process.env.NEXT_PUBLIC_DRIVE_FOLDER_ID;

    if (!apiKey || !folderId) {
      return NextResponse.json(
        { error: 'Missing required environment variables' },
        { status: 500 }
      );
    }

    // Call Google Drive API to list files in the folder
    const query = `'${folderId}' in parents and (mimeType contains 'video/')`;
    const fields = 'files(id,name,mimeType,thumbnailLink,createdTime,webContentLink)';
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
      query
    )}&fields=${encodeURIComponent(fields)}&key=${apiKey}`;

    const response = await fetch(url, { next: { revalidate: CACHE_DURATION / 1000 } });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Google Drive API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    // Process and format the video files data
    const videoFiles = data.files.map((file: DriveFile) => ({
      ...file,
      // Generate a direct download URL
      directUrl: `https://drive.google.com/uc?id=${file.id}&export=download`,
      // Generate a video URL that can be used in <video> elements - using the embed format
      videoUrl: `https://drive.google.com/file/d/${file.id}/preview`,
      // Alternative video URL formats
      embedUrl: `https://drive.google.com/file/d/${file.id}/preview`,
      iframeUrl: `https://drive.google.com/file/d/${file.id}/preview`,
    }));

    // Update the cache
    videosCache = {
      timestamp: now,
      data: videoFiles,
    };

    return NextResponse.json({
      videos: videoFiles,
      cached: false,
      timestamp: now,
    });
  } catch (error) {
    console.error('Error fetching videos from Google Drive:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 