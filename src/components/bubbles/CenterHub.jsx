import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { bubbleMapTranslations } from '@/i18n/translations/bubble-map';

const FloatingLabel = ({ children, position, delay = 0 }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={position}
    initial={{ opacity: 0, y: 10 }}
    animate={{
      opacity: 1,
      y: [0, -5, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut',
          delay,
        },
        opacity: {
          duration: 0.5,
          delay,
        },
      },
    }}
  >
    {children}
  </motion.div>
);

export const CenterHub = ({ lang }) => {
  const beamRef = useRef(null);
  const translations = bubbleMapTranslations[lang].centerHub;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!beamRef.current) return;

      const beam = beamRef.current;
      const rect = beam.parentElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angleRadians = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const angleDeg = (angleRadians * 180) / Math.PI + 90;

      beam.style.transform = `rotate(${angleDeg}deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {/* Legal counsel label */}
      <FloatingLabel
        position={{
          bottom: '-50px',
          left: '-30%',
          transform: 'translateX(-50%)',
          width: '200px',
        }}
        delay={0.3}
      >
        <div className="bg-feitlijn-yellow backdrop-blur-sm rounded-sm px-3 py-2 text-center">
          <p className="text-accent-foreground text-sm font-medium">{translations.legalCounsel}</p>
        </div>
      </FloatingLabel>

      {/* Example stakeholder label */}
      <FloatingLabel
        position={{
          top: '-100px',
          right: '-200px',
        }}
        delay={0.6}
      >
        <div className="bg-white/10 backdrop-blur-[6px] text-white px-3 py-2 text-center font-medium rounded-sm">
          <p className="text-white/80 text-sm">{translations.stakeholders}</p>
        </div>
      </FloatingLabel>

      <div className="bg relative">
        {/* Core - Inner circle with icon */}
        <div className="inner_circle relative z-30">
          <div
            className="bg-feitlijn-yellow rounded-full w-[120px] h-[120px] 
                        flex items-center justify-center
                        shadow-[0_0_30px_rgba(225,255,76,0.3)]"
          >
            <div className="w-16 h-16 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="57"
                height="113"
                viewBox="0 0 57 113"
                fill="none"
              >
                {/* SVG paths */}
                <path
                  d="M7.33813 16.1017C7.33813 16.1017 9.40091 1.96806 25.3368 0.596385C25.3368 0.596385 34.8148 0.347601 40.7402 9.3509C40.7402 9.3509 44.5085 14.414 43.4367 21.1648L42.3581 34.1016C42.3581 34.1016 41.8188 46.4802 46.6657 54.9187L19.3642 52.3569C19.3642 52.3569 18.6901 47.6502 18.6497 47.7107L13.2636 47.0383C13.2636 47.0383 9.49528 46.4735 8.95599 43.6629L8.41671 37.4769C8.41671 37.4769 4.64844 36.9121 4.64844 35.7892C4.64844 34.6664 6.2663 31.291 6.2663 31.291C6.2663 31.291 8.05943 28.0164 7.14938 24.0224C6.92018 23.0206 6.873 21.9784 6.96063 20.9563L7.34487 16.1017H7.33813Z"
                  fill="#C7C3EC"
                />
                <path
                  d="M7.33789 16.1017C7.33789 16.1017 9.40067 1.96806 25.3366 0.596385C25.3366 0.596385 34.8146 0.347601 40.74 9.3509C40.74 9.3509 44.5083 14.414 43.4364 21.1648L42.3579 36.3541C42.3579 36.3541 31.0463 31.8558 28.8892 25.6631C29.4284 22.8525 27.2713 21.7229 27.2713 21.7229C27.2713 21.7229 25.1142 20.0352 22.4245 22.2877L21.8852 22.8525C21.8852 22.8525 20.2673 25.6631 18.1169 23.4173L7.34463 16.1017H7.33789Z"
                  fill="#231E6E"
                />
                <path
                  d="M39.0868 46.3702L23.7262 50.8451C22.121 51.3142 20.9892 52.7268 20.8913 54.382L15.6914 69.007L0.664062 99.0235L3.30876 100.275C20.0544 108.197 39.4459 108.311 56.2834 100.586C56.2834 100.586 55.4991 70.0133 42.4495 46.8986C41.4701 46.23 40.2349 46.0467 39.0977 46.3756L39.0868 46.3702Z"
                  fill="#030236"
                />
                <path
                  d="M24.3031 51.2544V77.054H9.72461L19.099 52.8345L24.3031 51.2544Z"
                  fill="white"
                />
                <path
                  d="M47.6758 29.8389C51.585 29.8389 54.7539 26.678 54.7539 22.7788C54.7539 18.8797 51.585 15.7188 47.6758 15.7188C43.7667 15.7188 40.5977 18.8797 40.5977 22.7788C40.5977 26.678 43.7667 29.8389 47.6758 29.8389Z"
                  fill="#231E6E"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Rotating beam */}
        <div
          ref={beamRef}
          className="beam absolute top-1/2 left-1/2 w-[200px] h-[200px] z-20 origin-center"
          style={{
            transformOrigin: '50% 50%',
            marginLeft: '-100px',
            marginTop: '-100px',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1062"
            height="1062"
            viewBox="0 0 1062 1062"
            fill="none"
            style={{
              transform: 'translate(-50%, -50%)',
              position: 'absolute',
              left: '50%',
              top: '50%',
              opacity: '20%',
            }}
          >
            <g clipPath="url(#clip0_4030_6200)">
              <path
                d="M531 -2.32107e-05C644.884 -2.81888e-05 755.752 36.6141 847.237 104.438L531 531L531 -2.32107e-05Z"
                fill="url(#paint0_linear_4030_6200)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_4030_6200"
                x1="542.389"
                y1="518.899"
                x2="733.15"
                y2="14.9476"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#C8C3F0" />
                <stop offset="1" stopColor="#C8C3F0" stopOpacity="0" />
              </linearGradient>
              <clipPath id="clip0_4030_6200">
                <rect width="1062" height="1062" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        {/* Expanding concentric circles */}
        <div className="middle-circle-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-white/20 z-10" />
        <div className="middle-circle-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-white/15 z-8" />
        <div className="middle-circle-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-white/10 z-6" />
        <div className="middle-circle-7 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full border border-white/10 z-4" />
        <div className="middle-circle-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/10 z-4" />
      </div>
    </div>
  );
};

export default CenterHub;
