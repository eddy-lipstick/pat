import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Play, Pause, Maximize2 } from 'lucide-react';

const VideoPlayer = ({ src, poster, title }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        const video = document.getElementById('case-study-video');
        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    return (
        <Card className="relative w-full aspect-video overflow-hidden group">
            <video
                id="case-study-video"
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
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handlePlayPause}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    >
                        {isPlaying ? (
                            <Pause className="w-6 h-6 text-white" />
                        ) : (
                            <Play className="w-6 h-6 text-white" />
                        )}
                    </button>

                    <div className="text-white text-sm font-medium">{title}</div>

                    <button
                        onClick={() => document.getElementById('case-study-video').requestFullscreen()}
                        className="ml-auto p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    >
                        <Maximize2 className="w-6 h-6 text-white" />
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default VideoPlayer;