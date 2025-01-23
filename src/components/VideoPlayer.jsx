import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Play, Pause, Maximize2 } from 'lucide-react';

const VideoPlayer = ({ src, poster, title }) => {
    const [isClient, setIsClient] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handlePlayPause = () => {
        if (!videoRef.current) return;

        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleFullscreen = () => {
        if (!videoRef.current) return;
        videoRef.current.requestFullscreen();
    };

    if (!isClient) {
        return (
            <Card className="relative w-full aspect-video overflow-hidden bg-surface-1">
                <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
                    Loading...
                </div>
            </Card>
        );
    }

    return (
        <Card className="relative w-full aspect-video overflow-hidden group">
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster={poster}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls={false}
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Custom Controls */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-4 flex items-center gap-4">
                    <button
                        onClick={handlePlayPause}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? (
                            <Pause className="w-6 h-6 text-white" />
                        ) : (
                            <Play className="w-6 h-6 text-white" />
                        )}
                    </button>

                    <div className="text-white text-sm font-medium truncate">
                        {title}
                    </div>

                    <button
                        onClick={handleFullscreen}
                        className="ml-auto p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                        aria-label="Fullscreen"
                    >
                        <Maximize2 className="w-6 h-6 text-white" />
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default VideoPlayer;