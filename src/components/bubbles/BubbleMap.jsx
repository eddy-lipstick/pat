import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StakeholderBubble } from './StakeholderBubble';
import { CenterHub } from './CenterHub';
import { CaseStudyModal } from './CaseStudyModal';

const STAKEHOLDERS = [
  {
    id: 1,
    name: "Politici",
    caseStudies: [
      { id: 1, title: "Case Study 1" },
      { id: 2, title: "Case Study 2" }
    ]
  },
  {
    id: 2,
    name: "Toezichthouders",
    caseStudies: [
      { id: 3, title: "Case Study 3" }
    ]
  },
  {
    id: 3,
    name: "Rechters en arbiters",
    caseStudies: [
      { id: 4, title: "Case Study 4" }
    ]
  },
  {
    id: 4,
    name: "Investeerders",
    caseStudies: [
      { id: 5, title: "Case Study 5" }
    ]
  },
  {
    id: 5,
    name: "Bestuur",
    caseStudies: [
      { id: 6, title: "Case Study 6" }
    ]
  },
  {
    id: 6,
    name: "Klanten",
    caseStudies: [
      { id: 7, title: "Case Study 7" }
    ]
  },
  {
    id: 7,
    name: "Sales team",
    caseStudies: [
      { id: 8, title: "Case Study 8" }
    ]
  },
  {
    id: 8,
    name: "Collega's",
    caseStudies: [
      { id: 9, title: "Case Study 9" }
    ]
  },
  {
    id: 9,
    name: "Algemene publiek",
    caseStudies: [
      { id: 10, title: "Case Study 10" }
    ]
  }
];

const BubbleMap = () => {
  const [activeStakeholder, setActiveStakeholder] = useState(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [focusedBubbleId, setFocusedBubbleId] = useState(null);

  const handleStakeholderClick = (stakeholder) => {
    setActiveStakeholder(stakeholder.id === activeStakeholder?.id ? null : stakeholder);
  };

  const handleCaseStudyClick = (study) => {
    setSelectedCaseStudy(study);
  };

  return (
    <div className="relative w-full h-[800px]">
      {/* Center hub */}
      <CenterHub />

      {/* Stakeholder bubbles */}
      {STAKEHOLDERS.map((stakeholder) => (
        <StakeholderBubble
          key={stakeholder.id}
          stakeholder={stakeholder}
          isActive={activeStakeholder?.id === stakeholder.id}
          onClick={handleStakeholderClick}
          onCaseStudyClick={handleCaseStudyClick}
          isFocused={focusedBubbleId === stakeholder.id}
          isAnyFocused={focusedBubbleId !== null}
        />
      ))}

      {/* Case study modal */}
      {selectedCaseStudy && (
        <CaseStudyModal
          isOpen={true}
          onClose={() => setSelectedCaseStudy(null)}
          study={selectedCaseStudy}
        />
      )}
    </div>
  );
};

export default BubbleMap;