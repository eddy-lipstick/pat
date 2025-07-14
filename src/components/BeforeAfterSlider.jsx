import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const BeforeAfterSlider = ({ beforeImage, afterImage, alt }) => {
    const [isClient, setIsClient] = useState(false);
    const [position, setPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const containerRef = useRef(null);
    const beforeImageRef = useRef(null);
    const afterImageRef = useRef(null);

    // Effect for client-side initialization
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Effect to handle image loading and sizing
    useEffect(() => {
        if (!isClient) return;

        const updateDimensions = () => {
            if (beforeImageRef.current && afterImageRef.current) {
                const beforeImg = beforeImageRef.current;
                const afterImg = afterImageRef.current;

                // Wait for both images to load
                Promise.all([
                    new Promise(resolve => {
                        if (beforeImg.complete) resolve();
                        beforeImg.onload = resolve;
                    }),
                    new Promise(resolve => {
                        if (afterImg.complete) resolve();
                        afterImg.onload = resolve;
                    })
                ]).then(() => {
                    // Use the natural aspect ratio of the images
                    const aspectRatio = beforeImg.naturalWidth / beforeImg.naturalHeight;
                    const containerWidth = containerRef.current?.clientWidth || 0;
                    const height = containerWidth / aspectRatio;

                    setDimensions({
                        width: containerWidth,
                        height: Math.min(height, window.innerHeight * 0.8) // Cap height at 80vh
                    });
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [isClient]);

    // Effect for drag handling with improved touch support
    useEffect(() => {
        if (!isClient) return;

        const handleMove = (clientX) => {
            if (containerRef.current && isDragging) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = Math.min(Math.max(0, clientX - rect.left), rect.width);
                const newPosition = (x / rect.width) * 100;
                setPosition(Math.min(Math.max(0, newPosition), 100));
            }
        };

        const handleMouseMove = (e) => handleMove(e.clientX);
        const handleTouchMove = (e) => {
            if (isDragging) {
                e.preventDefault();
                handleMove(e.touches[0].clientX);
            }
        };

        const handleEnd = () => setIsDragging(false);

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('mouseup', handleEnd);
            document.addEventListener('touchend', handleEnd);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchend', handleEnd);
        };
    }, [isDragging, isClient]);

    const handleStart = (clientX) => {
        if (!isClient || !containerRef.current) return;
        setIsDragging(true);
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        setPosition((x / rect.width) * 100);
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        handleStart(e.clientX);
    };

    const handleTouchStart = (e) => {
        handleStart(e.touches[0].clientX);
    };

    // Handle click on slider handle separately
    const handleHandleClick = (e) => {
        e.stopPropagation(); // Prevent click from propagating to overlay
        handleStart(e.clientX);
    };

    if (!isClient) {
        return (
            <Card className="relative w-full aspect-video overflow-hidden select-none bg-muted animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex gap-2">
                        <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"></div>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card
            ref={containerRef}
            className="relative w-full overflow-hidden select-none rounded-none border-none"
            style={{ height: dimensions.height || 'auto' }}
        >
            {/* Interactive overlay */}
            <div
                className="absolute inset-0 z-30 cursor-ew-resize"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            />

            {/* After image (base layer) */}
            <img
                ref={afterImageRef}
                src={afterImage}
                alt={`After ${alt}`}
                className="absolute inset-0 w-full h-full object-cover"
                draggable="false"
            />

            {/* Before image (clipped layer) */}
            <div
                className="absolute inset-0 z-10 overflow-hidden"
                style={{ width: `${position}%` }}
            >
                <img
                    ref={beforeImageRef}
                    src={beforeImage}
                    alt={`Before ${alt}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        width: `${100 / (position / 100)}%`,
                        maxWidth: 'none'
                    }}
                    draggable="false"
                />
            </div>

            {/* Slider handle with improved interaction */}
            <div
                className="absolute top-0 bottom-0 z-40 w-1 bg-white cursor-ew-resize group"
                style={{ left: `${position}%` }}
                onMouseDown={handleHandleClick}
                onTouchStart={handleTouchStart}
            >
                <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        w-10 h-10 bg-white rounded-full flex items-center justify-center 
                        shadow-lg transition-all duration-200 group-hover:scale-110
                        ${isDragging ? 'scale-110 shadow-xl' : 'shadow-md'}`}
                >
                    <svg className="w-6 h-6 text-background" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6l1.41-1.41z M9.41 16.59L4.83 12l4.58-4.59L8 6l-6 6l6 6l1.41-1.41z"
                        />
                    </svg>
                </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 z-50 text-white text-sm font-medium bg-black/50 px-3 py-1.5 rounded-full">
                Voor
            </div>
            <div className="absolute bottom-4 right-4 z-50 text-white text-sm font-medium bg-black/50 px-3 py-1.5 rounded-full">
                Na
            </div>
        </Card>
    );
};

export default BeforeAfterSlider;