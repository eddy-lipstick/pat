import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CenterHub } from './CenterHub';
import { bubbleMapTranslations } from '@/i18n/translations/bubble-map';

const STAKEHOLDER_CONFIG = {
  Toezichthouders: {
    id: 2,
    x: -170,
    y: -300,
    size: 80,
  },
  'Rechters en arbiters': {
    id: 3,
    x: -300,
    y: -250,
    size: 130,
  },
  Investeerders: {
    id: 4,
    x: 10,
    y: -260,
    size: 80,
  },
  Bestuur: {
    id: 5,
    x: -10,
    y: -150,
    size: 120,
  },
  Klanten: {
    id: 6,
    x: 160,
    y: 30,
    size: 110,
  },
  'Sales team': {
    id: 7,
    x: -320,
    y: -60,
    size: 100,
  },
  "Collega's": {
    id: 8,
    x: -200,
    y: -40,
    size: 110,
  },
  'Algemene publiek': {
    id: 9,
    x: -50,
    y: 250,
    size: 80,
  },
};

const StakeholderBubble = ({ stakeholderKey, config, isHovered, onHover, lang }) => {
  const translation = bubbleMapTranslations[lang].stakeholders[stakeholderKey];

  return (
    <div
      className="absolute"
      style={{
        left: `calc(50% + ${config.x}px)`,
        top: `calc(50% + ${config.y}px)`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute pointer-events-none"
            style={{
              width: Math.max(config.size * 2, 200),
              zIndex: 100,
              bottom: `${config.size + 20}px`,
              left: -50,
            }}
          >
            <div className="bg-background text-white rounded-lg px-4 py-2 text-sm max-w-xs text-center">
              <div className="flex flex-col gap-1">
                <p>{translation.tooltip}</p>
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-background rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble */}
      <motion.div
        className="bg-white/10 backdrop-blur-[6px] rounded-full 
          text-white text-center border
          flex items-center justify-center font-medium
          transition-all duration-300 cursor-pointer relative z-10
          border-white/20 hover:bg-white/15"
        style={{
          width: `${config.size}px`,
          height: `${config.size}px`,
          padding: `${config.size * 0.16}px`,
          fontSize: `${config.size * 0.14}px`,
        }}
        whileHover={{ scale: 1.05 }}
        onMouseEnter={() => onHover(stakeholderKey)}
        onMouseLeave={() => onHover(null)}
      >
        {translation.name}
      </motion.div>
    </div>
  );
};

const BubbleMap = ({ lang }) => {
  const [hoveredStakeholder, setHoveredStakeholder] = useState(null);

  return (
    <div className="relative w-full h-[800px]">
      {/* Center Hub with radar effect */}
      <CenterHub lang={lang} />

      {/* Stakeholder bubbles */}
      {Object.entries(STAKEHOLDER_CONFIG).map(([key, config]) => (
        <StakeholderBubble
          key={config.id}
          stakeholderKey={key}
          config={config}
          isHovered={hoveredStakeholder === key}
          onHover={setHoveredStakeholder}
          lang={lang}
        />
      ))}
    </div>
  );
};

export default BubbleMap;
