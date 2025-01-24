import React, { useEffect, useRef, useState } from 'react';
import { Badge } from "@/components/ui/badge";

const TimelineEntry = ({ phase, description, imageUrl, index }) => {
    const entryRef = useRef(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const initGSAP = async () => {
            const gsap = (await import('gsap')).default;
            const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;

            gsap.registerPlugin(ScrollTrigger);

            const element = entryRef.current;
            if (!element) return;

            gsap.fromTo(element,
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: element,
                        start: "top bottom-=100",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        };

        initGSAP();

        return () => {
            if (window.ScrollTrigger) {
                window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            }
        };
    }, []);

    const isEven = index % 2 === 0;

    if (!isClient) {
        return <div className="h-48" />;
    }

    const Content = () => (
        <div>
            <Badge
                variant="outline"
                className="bg-surface-1 text-primary border-primary mb-4 inline-block"
            >
                {phase}
            </Badge>
            <p className="text-text-primary text-lg mb-6">{description}</p>
            {imageUrl && (
                <div className="relative rounded-lg overflow-hidden bg-surface-2 aspect-video">
                    <img
                        src={imageUrl}
                        alt={`Phase ${phase}`}
                        className="object-cover w-full h-full"
                    />
                </div>
            )}
        </div>
    );

    return (
        <div ref={entryRef} className="relative pb-24 grid grid-cols-[1fr_auto_1fr] gap-4">
            {/* Left content */}
            <div className={`pt-2 ${!isEven ? 'pr-8' : ''}`}>
                {!isEven && <Content />}
            </div>

            {/* Center timeline - Aligned with badge */}
            <div className="relative w-12">
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                    <div className="w-4 h-4 rounded-full bg-primary border-4 border-surface-1 relative z-10" />
                </div>
            </div>

            {/* Right content */}
            <div className={`pt-2 ${isEven ? 'pl-8' : ''}`}>
                {isEven && <Content />}
            </div>
        </div>
    );
};

const CaseStudyTimeline = ({ entries }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div className="h-96" />;
    }

    return (
        <div className="max-w-6xl mx-auto py-16 px-4 relative">
            {/* Continuous vertical line */}
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-primary-300 transform -translate-x-1/2" />

            {/* Timeline entries */}
            <div className="relative">
                {entries.map((entry, index) => (
                    <TimelineEntry
                        key={index}
                        phase={entry.phase}
                        description={entry.description}
                        imageUrl={entry.imageUrl}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default CaseStudyTimeline;