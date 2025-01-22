import React from 'react';
import { motion } from 'framer-motion';

export const CaseStudyBubble = ({ study, size = 90, onClick }) => {
  const handleClick = (e) => {
    e.stopPropagation(); // Stop event bubbling
    onClick && onClick(study);
  };

  return (
    <motion.div

      className="relative"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 15
        }
      }}
      onClick={handleClick}

    >
      {/* Glow effect */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <div className="absolute inset-0 bg-primary-500 opacity-20 blur-xl rounded-full"></div>
      </div>

      {/* Main bubble */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                  bg-white/10 backdrop-blur-[6px] rounded-full
                  text-white text-center text-sm
                  border border-white/20 shadow-lg
                  hover:bg-white/15 cursor-pointer
                  flex items-center justify-center
                  transition-colors duration-300"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          padding: `${size * 0.1}px`,
        }}
      >
        <div className="pointer-events-none relative z-10">
          {study.data.stakholder_bubble_title} {/* Changed from study.title */}
        </div>
      </div>
    </motion.div>
  );
};