import React from 'react';

const VimeoPlayer = ({ videoUrl, title }) => {
  // Extract Vimeo ID from URL
  const getVimeoId = (url) => {
    const match = url.match(/(?:vimeo.com\/)(\d+)/);
    return match ? match[1] : null;
  };

  const videoId = getVimeoId(videoUrl);

  if (!videoId) {
    return (
      <div className="w-full h-full bg-surface-2 rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Invalid video URL</p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video">
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={`https://player.vimeo.com/video/${videoId}?h=00000000&badge=0&autopause=0&player_id=0&app_id=58479`}
        allow="autoplay; fullscreen; picture-in-picture"
        title={title}
      />
    </div>
  );
};

export default VimeoPlayer;
