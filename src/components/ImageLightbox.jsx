import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Maximize2, X } from 'lucide-react';

const ImageLightbox = ({
  src,
  alt,
  title,
  className,
  aspectRatio = '16/9', // Default aspect ratio
  objectFit = 'cover', // Allow control of object-fit
  objectPosition = 'center', // Allow control of object-position
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`relative group overflow-hidden ${className}`}
        style={{
          aspectRatio,
          position: 'relative',
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full absolute inset-0"
          style={{
            objectFit,
            objectPosition,
          }}
        />
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
          <img src={src} alt={alt} className="w-full h-full object-contain" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageLightbox;
