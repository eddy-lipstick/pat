import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Maximize2 } from 'lucide-react';

const VideoPlayer = ({ src, poster, title, autoPlay = true, className = '' }) => {
    const [isClient, setIsClient] = useState(false);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const videoRef = useRef(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient && videoRef.current && autoPlay) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    videoRef.current.muted = true;
                    videoRef.current.play().catch(error => {
                        setIsPlaying(false);
                    });
                });
            }
        }
    }, [isClient, autoPlay]);

    const handlePlayPause = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    setIsPlaying(false);
                });
            }
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleFullscreen = () => {
        if (!videoRef.current) return;
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            videoRef.current.requestFullscreen();
        }
    };

    if (!isClient) {
        return (
            <div className="relative w-full aspect-video bg-muted animate-pulse rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                        <Play className="w-8 h-8 text-muted-foreground/40" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative aspect-video group ${className}`}>
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster={poster}
                loop
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls={false}
            >
                <source src={src} type="video/mp4" />
            </video>

            <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="p-4 flex items-center gap-4">
                    <button
                        onClick={handlePlayPause}
                        className="p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? (
                            <Pause className="w-5 h-5 text-white" />
                        ) : (
                            <Play className="w-5 h-5 text-white" />
                        )}
                    </button>

                    <div className="text-white text-sm font-medium truncate">
                        {title}
                    </div>

                    <button
                        onClick={handleFullscreen}
                        className="ml-auto p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors"
                        aria-label="Fullscreen"
                    >
                        <Maximize2 className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;