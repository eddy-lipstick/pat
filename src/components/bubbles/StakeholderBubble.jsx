import React, { useState, useContext, createContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaseStudyBubble } from './CaseStudyBubble';

const HoverContext = createContext({
  hoveredBubble: null,
  setHoveredBubble: () => {},
});

export const StakeholderBubbleProvider = ({ children }) => {
  const [hoveredBubble, setHoveredBubble] = useState(null);
  return (
    <HoverContext.Provider value={{ hoveredBubble, setHoveredBubble }}>
      {children}
    </HoverContext.Provider>
  );
};

const BUBBLE_CONFIG = {
  Toezichthouders: {
    x: -170,
    y: -300,
    size: 80,
    tooltip: 'Bekijk onze aanpak voor communicatie met toezichthouders',
  },
  'Rechters en arbiters': {
    x: -300,
    y: -250,
    size: 130,
    tooltip: 'Lees over onze communicatiestrategie in juridische procedures',
  },
  Investeerders: {
    x: 10,
    y: -260,
    size: 80,
    tooltip: 'Ontdek hoe wij juridische communicatie met investeerders aanpakken',
  },
  Bestuur: {
    x: -10,
    y: -150,
    size: 120,
    tooltip: 'Bekijk onze juridische communicatieaanpak op bestuursniveau',
  },
  Klanten: {
    x: 160,
    y: 30,
    size: 110,
    tooltip: 'Bekijk hoe wij juridische zaken communiceren met klanten',
  },
  'Sales team': {
    x: -320,
    y: -60,
    size: 100,
    tooltip: 'Ontdek onze juridische communicatiestrategie voor het sales team',
  },
  "Collega's": {
    x: -200,
    y: -40,
    size: 110,
    tooltip: 'Lees over onze interne juridische communicatiepraktijken',
  },
  'Algemene publiek': {
    x: -50,
    y: 250,
    size: 80,
    tooltip: 'Bekijk onze aanpak voor juridische communicatie met het publiek',
  },
};

export const StakeholderBubble = ({ stakeholder, isActive, onClick, onCaseStudyClick }) => {
  const { hoveredBubble, setHoveredBubble } = useContext(HoverContext);
  const isHovered = hoveredBubble === stakeholder.name;
  const shouldDim = !isActive && !isHovered && hoveredBubble !== null;

  const config = BUBBLE_CONFIG[stakeholder.name] || { x: 0, y: 0, size: 100, tooltip: '' };

  const getSubBubblePosition = (index, total) => {
    const radius = config.size * 1.2;
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
        left: `calc(50% + ${config.x}px)`,
        top: `calc(50% + ${config.y}px)`,
        transform: 'translate(-50%, -50%)',
        zIndex: isActive ? 50 : 1,
      }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && !isActive && (
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
                <p>{config.tooltip}</p>
                <p className="text-white/60 text-xs">Klik om voorbeelden te bekijken.</p>
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900/90 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={`
          bg-white/10 backdrop-blur-[6px] rounded-full 
          text-white text-center border
          flex items-center justify-center font-medium
          transition-all duration-300 cursor-pointer relative z-10
          ${isActive ? 'border-white bg-white/20' : 'border-white/20 hover:bg-white/15'}
        `}
        style={{
          width: `${config.size}px`,
          height: `${config.size}px`,
          padding: `${config.size * 0.16}px`,
          fontSize: `${config.size * 0.14}px`,
          opacity: shouldDim ? 0.3 : 1,
          transition: 'opacity 0.3s ease',
        }}
        whileHover={{ scale: 1.05 }}
        onClick={() => onClick(stakeholder)}
        onMouseEnter={() => setHoveredBubble(stakeholder.name)}
        onMouseLeave={() => (isActive ? null : setHoveredBubble(null))}
      >
        {stakeholder.name}
      </motion.div>

      <AnimatePresence>
        {isActive && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {stakeholder.caseStudies.map((study, index) => {
              const pos = getSubBubblePosition(index, stakeholder.caseStudies.length);
              return (
                <motion.div
                  key={study.id}
                  className="absolute"
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{ scale: 1, x: pos.x, y: pos.y }}
                  exit={{ scale: 0, x: 0, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                    delay: index * 0.05,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCaseStudyClick(study);
                  }}
                >
                  <CaseStudyBubble
                    study={study}
                    size={config.size * 0.75}
                    onClick={onCaseStudyClick}
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
