import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const BeforeAfterSlider = ({ beforeImage, afterImage, alt }) => {
    const [isClient, setIsClient] = useState(false);
    const [position, setPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    // Effect for client-side initialization
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Effect for drag handling
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

        const handleMouseMove = (e) => {
            handleMove(e.clientX);
        };

        const handleTouchMove = (e) => {
            if (isDragging) {
                e.preventDefault();
                handleMove(e.touches[0].clientX);
            }
        };

        const handleEnd = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('touchmove', handleTouchMove, { passive: false });
            window.addEventListener('mouseup', handleEnd);
            window.addEventListener('touchend', handleEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchend', handleEnd);
        };
    }, [isDragging, isClient]);

    const handleMouseDown = (e) => {
        if (!isClient) return;
        e.preventDefault();
        setIsDragging(true);

        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const newPosition = (x / rect.width) * 100;
            setPosition(Math.min(Math.max(0, newPosition), 100));
        }
    };

    const handleTouchStart = (e) => {
        if (!isClient) return;
        setIsDragging(true);

        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const newPosition = (x / rect.width) * 100;
            setPosition(Math.min(Math.max(0, newPosition), 100));
        }
    };

    if (!isClient) {
        return (
            <Card className="relative w-full h-96 overflow-hidden select-none bg-surface-1">
                <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
                    Loading...
                </div>
            </Card>
        );
    }

    return (
        <Card
            ref={containerRef}
            className="relative w-full h-96 overflow-hidden select-none"
        >
            {/* Interactive overlay */}
            <div
                className="absolute inset-0 z-30 cursor-ew-resize"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            />

            {/* After image (base layer) */}
            <img
                src={afterImage}
                alt={`After ${alt}`}
                className="absolute inset-0 w-full h-full object-cover"
                draggable="false"
            />

            {/* Before image (clipped layer) */}
            <div
                className="absolute inset-0 z-10 overflow-hidden"
                style={{
                    width: `${position}%`
                }}
            >
                <img
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

            {/* Slider handle */}
            <div
                className="absolute top-0 bottom-0 z-40 w-1 bg-white cursor-ew-resize"
                style={{ left: `${position}%` }}
            >
                <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        w-8 h-8 bg-white rounded-full flex items-center justify-center 
                        shadow-lg transition-shadow duration-200
                        ${isDragging ? 'shadow-xl' : 'shadow-md'}`}
                >
                    <svg className="w-4 h-4 text-primary-600" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"
                        />
                    </svg>
                </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 z-50 text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                Before
            </div>
            <div className="absolute bottom-4 right-4 z-50 text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                After
            </div>
        </Card>
    );
};

export default BeforeAfterSlider