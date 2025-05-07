"use client";

import { useState, useEffect } from 'react';

interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  permalink: string;
  timestamp: string;
}

export function useInstagramFeed(accessToken: string) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInstagramPosts() {
      if (!accessToken) {
        setError('No access token provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp&access_token=${accessToken}`
        );

        if (!response.ok) {
          throw new Error(`Instagram API error: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch Instagram posts');
        console.error('Instagram feed error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchInstagramPosts();
  }, [accessToken]);

  return { posts, loading, error };
} 