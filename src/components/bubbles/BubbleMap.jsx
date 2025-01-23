import React, { useState } from 'react';
import { StakeholderBubble, StakeholderBubbleProvider } from './StakeholderBubble';
import { CenterHub } from './CenterHub';
import { CaseStudyModal } from './CaseStudyModal';

const STAKEHOLDER_CONFIG = [
  { id: 2, name: "Toezichthouders" },
  { id: 3, name: "Rechters en arbiters" },
  { id: 4, name: "Investeerders" },
  { id: 5, name: "Bestuur" },
  { id: 6, name: "Klanten" },
  { id: 7, name: "Sales team" },
  { id: 8, name: "Collega's" },
  { id: 9, name: "Algemene publiek" }
];

const mapCaseStudiesToStakeholders = (caseStudies) =>
  STAKEHOLDER_CONFIG.map(stakeholder => ({
    ...stakeholder,
    caseStudies: caseStudies.filter(study => study.data.stakeholder === stakeholder.name)
  }));

const BubbleMap = ({ caseStudies = [] }) => {
  const [activeStakeholder, setActiveStakeholder] = useState(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const stakeholders = mapCaseStudiesToStakeholders(caseStudies);

  const handleStakeholderClick = (stakeholder) => {
    if (activeStakeholder?.id === stakeholder.id) {
      setActiveStakeholder(null);
    } else {
      setActiveStakeholder(stakeholder);
    }
  };

  const handleCaseStudyClick = (study) => {
    setSelectedCaseStudy(study);
  };

  return (
    <div className="relative w-full h-[800px]">
      <CenterHub />
      <StakeholderBubbleProvider>
        {stakeholders.map((stakeholder) => (
          <StakeholderBubble
            key={stakeholder.id}
            stakeholder={stakeholder}
            isActive={activeStakeholder?.id === stakeholder.id}
            onClick={handleStakeholderClick}
            onCaseStudyClick={handleCaseStudyClick}
          />
        ))}
      </StakeholderBubbleProvider>

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