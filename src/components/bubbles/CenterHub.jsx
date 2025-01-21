import React from 'react';

export const CenterHub = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="relative">
        {/* Main yellow circle */}
        <div className="bg-[#E1FF4C] rounded-full w-[120px] h-[120px] 
                      flex items-center justify-center relative z-10
                      shadow-[0_0_30px_rgba(225,255,76,0.3)]">
          {/* Lawyer icon - you'll need to replace this with your actual icon */}
          <div className="w-16 h-16 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#020733]">
              <path d="M12 4a4 4 0 100 8 4 4 0 000-8zM6 8a6 6 0 1112 0A6 6 0 016 8zm2 10a3 3 0 00-3 3 1 1 0 11-2 0 5 5 0 015-5h8a5 5 0 015 5 1 1 0 11-2 0 3 3 0 00-3-3H8z" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Rotating text ring */}
        <div className="absolute -inset-8">
          <div className="relative w-full h-full animate-spin-slow">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full rounded-full border border-white/10 flex items-center justify-center">
                <span className="text-xs tracking-[0.2em] text-white/40 uppercase">
                  LEGAL COUNSEL • LEGAL COUNSEL • LEGAL COUNSEL •
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterHub;