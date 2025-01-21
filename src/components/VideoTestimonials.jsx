import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Play } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const testimonials = [
  {
    id: 1,
    name: "Tobias Glienke",
    company: "Greenfort",
    quote: "The visuals that we used are very powerful and very convincing",
    image: "/images/testimonials/tobias.jpg",
    videoUrl: "https://vimeo.com/933206879",
    videoId: "933206879"
  },
  {
    id: 2,
    name: "Stefan Tuinenga",
    company: "Lindenbaum, Partner antitrust litigation",
    quote: "De visual werd door de rechter gebruikt in het oordeel",
    image: "/images/testimonials/stefan.jpg",
    videoUrl: "https://vimeo.com/921136773",
    videoId: "921136773"
  },
  {
    id: 3,
    name: "Huib-Jan Verhoef",
    company: "Brightminds",
    quote: "Na de eerste presentatie al voor 90% spot-on",
    image: "/images/testimonials/huib-jan.jpg",
    videoUrl: "https://vimeo.com/915877317",
    videoId: "915877317"
  },
  {
    id: 4,
    name: "Sjors Dobbelaar",
    company: "Legalloyd",
    quote: "De kracht van Patroon is dat ze twee disciplines bij elkaar brengen en verenigen",
    image: "/images/testimonials/sjors.jpg",
    videoUrl: "https://vimeo.com/912152094",
    videoId: "912152094"
  }
];

const VideoModal = ({ isOpen, onClose, videoId, name }) => {
  const embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-[#090721] border-none">
        <DialogHeader>
          <DialogTitle className="text-white">{name}</DialogTitle>
        </DialogHeader>
        <div className="relative w-full aspect-video">
          <iframe
            src={embedUrl}
            className="absolute top-0 left-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const VideoTestimonialCard = ({ testimonial, onPlay }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      {
        y: 20,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-lg cursor-pointer"
      onClick={() => onPlay(testimonial)}
    >
      {/* Background image */}
      <img
        src={testimonial.image}
        alt={`${testimonial.name} testimonial`}
        className="w-full h-full object-cover aspect-square"
      />

      {/* Purple overlay with subtle gradient */}
      <div className="absolute inset-0 bg-[#1a0f45]/80 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-70" />

      {/* Additional soft overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
      {/* Play button - slides in from bottom right */}
      <div className="absolute bottom-6 right-0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out">
        <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-200">
          <Play className="w-4 h-4 text-[#090721]" />
        </div>
      </div>

      {/* Content overlay */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
        <blockquote className="text-xl sm:text-2xl font-medium text-white mb-4 leading-relaxed">
          "{testimonial.quote}"
        </blockquote>

        <div className="space-y-1">
          <p className="text-lg font-medium text-white">{testimonial.name}</p>
          <p className="text-sm text-white/80">{testimonial.company}</p>
        </div>
      </div>
    </div>
  );
};

const VideoTestimonials = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handlePlay = (testimonial) => {
    setSelectedVideo(testimonial);
  };

  const handleClose = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((testimonial) => (
          <VideoTestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            onPlay={handlePlay}
          />
        ))}
      </div>

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={handleClose}
        videoId={selectedVideo?.videoId}
        name={selectedVideo?.name}
      />
    </div>
  );
};

export default VideoTestimonials;