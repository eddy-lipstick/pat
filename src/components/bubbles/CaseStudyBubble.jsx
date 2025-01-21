import React from 'react';
import { motion } from 'framer-motion';

export const CaseStudyBubble = ({ study, size = 90 }) => {
  return (
    <div className="relative">
      {/* Glow effect */}
      <div
        className="absolute inset-0 pointer-events-none animate-pulse"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="absolute inset-0 bg-primary-500 opacity-20 blur-xl rounded-full"></div>
      </div>

      {/* Main bubble */}
      <motion.div
        className="bg-white/10 backdrop-blur-[6px] rounded-full
                  text-white text-center text-sm
                  border border-white/20 shadow-lg
                  hover:bg-white/15 cursor-pointer
                  flex items-center justify-center
                  transition-all duration-300"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          padding: `${size * 0.1}px`,
        }}
        initial={{
          x: "-50%",
          y: "-50%"
        }}
        animate={{
          x: "-50%",
          y: "-50%"
        }}
        whileHover={{
          x: "-50%",
          y: "-50%",
          scale: 1.05,
        }}
        transition={{
          scale: {
            type: "spring",
            stiffness: 300,
            damping: 15
          }
        }}
      >
        <div className="pointer-events-none relative z-10">
          {study.title}
        </div>
      </motion.div>
    </div>
  );
};