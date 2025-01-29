import React, { useEffect, useRef, useState } from 'react';

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

      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
          },
        },
      );
    };

    initGSAP();

    return () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  const isEven = index % 2 === 0;

  if (!isClient) {
    return <div className="h-48" />;
  }

  const Content = () => (
    <div className="space-y-4">
      <span className="bg-primary transition-all duration-300 rounded-full px-3 py-1 text-sm text-background inline-block">
        {phase}
      </span>
      <p className="text-background text-lg leading-relaxed">{description}</p>
      {imageUrl && (
        <div className="relative rounded-lg overflow-hidden">
          <img src={imageUrl} alt={`Phase ${phase}`} className="object-cover w-full h-full" />
        </div>
      )}
    </div>
  );

  return (
    <div ref={entryRef} className="relative pb-24">
      {/* Mobile Layout (single column) */}
      <div className="md:hidden grid grid-cols-[auto_1fr] gap-4">
        <div className="relative w-12">
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <div className="w-4 h-4 rounded-full bg-primary/20 ring-2 ring-primary relative z-10 transition-all duration-300" />
          </div>
        </div>
        <div className="pt-2">
          <Content />
        </div>
      </div>

      {/* Desktop Layout (alternating) */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4">
        {/* Left content */}
        <div className={`pt-2 ${!isEven ? 'pr-8' : ''}`}>{!isEven && <Content />}</div>

        {/* Center timeline */}
        <div className="relative w-12">
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <div className="w-4 h-4 rounded-full bg-primary/20 ring-2 ring-primary relative z-10 transition-all duration-300" />
          </div>
        </div>

        {/* Right content */}
        <div className={`pt-2 ${isEven ? 'pl-8' : ''}`}>{isEven && <Content />}</div>
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
      {/* Vertical line */}
      <div className="absolute left-6 md:left-1/2 top-0 h-full w-px bg-primary/20 transform md:-translate-x-1/2" />

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
