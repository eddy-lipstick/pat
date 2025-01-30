import React from 'react';

const VideoEmbed = ({ url }) => {
  // Function to determine video platform and return appropriate embed URL
  const getEmbedUrl = (url) => {
    if (!url) return null;

    // Handle Vimeo URLs
    if (url.includes('vimeo.com')) {
      // If already an embed URL, return as is
      if (url.includes('player.vimeo.com')) return url;

      // Convert regular Vimeo URL to embed URL
      const vimeoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${vimeoId}`;
    }

    // Handle YouTube URLs
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      // If already an embed URL, return as is
      if (url.includes('youtube.com/embed/')) return url;

      // Extract YouTube video ID
      const youtubeId = url.includes('youtu.be')
        ? url.split('/').pop()
        : url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${youtubeId}`;
    }

    // Handle Loom URLs
    if (url.includes('loom.com')) {
      // If already an embed URL, return as is
      if (url.includes('loom.com/embed/')) return url;

      // Extract Loom video ID
      const loomId = url.split('/share/')[1]?.split('?')[0];
      return `https://www.loom.com/embed/${loomId}`;
    }

    return url;
  };

  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) return null;

  return (
    <div className="relative w-full aspect-video">
      <iframe
        src={embedUrl}
        className="absolute top-0 left-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video player"
      />
    </div>
  );
};

export default VideoEmbed;
