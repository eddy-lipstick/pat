import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaseStudyBubble } from './CaseStudyBubble';

export const StakeholderBubble = ({
  stakeholder,
  isActive,
  onClick,
  onCaseStudyClick
}) => {
  // Configuration for positions and sizes
  const config = {
    "Politici": { x: 100, y: -150, size: 100 },
    "Toezichthouders": { x: 350, y: -100, size: 120 },
    "Rechters en arbiters": { x: 300, y: 100, size: 130 },
    "Investeerders": { x: 150, y: 200, size: 110 },
    "Bestuur": { x: -150, y: 150, size: 100 },
    "Klanten": { x: -300, y: 50, size: 110 },
    "Sales team": { x: -250, y: -100, size: 100 },
    "Collega's": { x: -100, y: -200, size: 110 },
    "Algemene publiek": { x: 50, y: -250, size: 120 }
  };

  // Get position and size for this bubble, with defaults
  const bubbleConfig = config[stakeholder.name] || { x: 0, y: 0, size: 100 };

  // Calculate positions for sub-bubbles in a circle
  const getSubBubblePosition = (index, total) => {
    // Make sub-bubble radius relative to main bubble size
    const radius = bubbleConfig.size * 1.2;
    const angle = (index * (2 * Math.PI)) / total;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <div
      className="absolute"
      style={{
        left: `calc(50% + ${bubbleConfig.x}px)`,
        top: `calc(50% + ${bubbleConfig.y}px)`,
        transform: 'translate(-50%, -50%)',
        zIndex: isActive ? 50 : 1
      }}
    >
      {/* Main bubble */}
      <motion.div
        className="bg-white/10 backdrop-blur-[6px] rounded-full 
                  text-white text-center border border-white/20
                  flex items-center justify-center font-medium
                  hover:bg-white/15 transition-all duration-300
                  cursor-pointer relative z-10"
        style={{
          width: `${bubbleConfig.size}px`,
          height: `${bubbleConfig.size}px`,
          padding: `${bubbleConfig.size * 0.16}px`,
          fontSize: `${bubbleConfig.size * 0.14}px` // Scale font size with bubble
        }}
        whileHover={{ scale: 1.05 }}
        onClick={() => onClick(stakeholder)}
      >
        {stakeholder.name}
      </motion.div>

      {/* Case study sub-bubbles */}
      <AnimatePresence>
        {isActive && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {stakeholder.caseStudies.map((study, index) => {
              const pos = getSubBubblePosition(
                index,
                stakeholder.caseStudies.length
              );

              return (
                <motion.div
                  key={study.id}
                  className="absolute"
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: 1,
                    x: pos.x,
                    y: pos.y,
                  }}
                  exit={{ scale: 0, x: 0, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    delay: index * 0.05
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCaseStudyClick(study);
                  }}
                >
                  <CaseStudyBubble
                    study={study}
                    size={bubbleConfig.size * 0.75} // Sub-bubbles are 75% of main bubble size
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};