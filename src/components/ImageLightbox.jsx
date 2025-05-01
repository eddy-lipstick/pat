import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Maximize2, X } from 'lucide-react';

const ImageLightbox = ({
  src,
  alt,
  title,
  className,
  // Removed aspectRatio prop
  objectFit = 'contain', // Changed default to 'contain'
  objectPosition = 'center',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Removed style={{ aspectRatio }} and adjusted classes */}
      <div
        className={`relative group overflow-hidden ${className}`}
        // Removed inline style for aspectRatio
      >
        {/* Adjusted img classes: removed absolute inset-0, added block */}
        <img
          src={src}
          alt={alt}
          className="w-full h-auto block" // Use h-auto and block display
          style={{
            objectFit, // Keep objectFit for flexibility if needed, but default is contain
            objectPosition,
            // Removed width/height 100% as block/h-auto handles it
          }}
        />
        {/* Overlay for button - adjusted positioning */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="p-4 flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors"
              aria-label="View fullscreen"
            >
              <Maximize2 className="w-5 h-5 text-white" />
            </button>
            {title && <div className="text-white text-sm font-medium truncate">{title}</div>}
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-0">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors z-50"
            aria-label="Close fullscreen"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          {/* Ensure lightbox image also uses contain */}
          <img src={src} alt={alt} className="w-full h-full object-contain" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageLightbox;
