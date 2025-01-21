import React, { useState } from 'react';

const CaseStudyFilters = ({ industries, technologies }) => {
  const [activeFilters, setActiveFilters] = useState(new Set());
  const [activeTab, setActiveTab] = useState('industries');

  const toggleFilter = (tag) => {
    setActiveFilters(prev => {
      const newFilters = new Set(prev);
      if (newFilters.has(tag)) {
        newFilters.delete(tag);
      } else {
        newFilters.add(tag);
      }
      updateCaseStudies(newFilters);
      return newFilters;
    });
  };

  const clearFilters = () => {
    setActiveFilters(new Set());
    updateCaseStudies(new Set());
  };

  const updateCaseStudies = (filters) => {
    const caseStudies = document.querySelectorAll('.case-study');

    caseStudies.forEach(study => {
      const studyTags = JSON.parse(study.getAttribute('data-tags') || '[]');

      if (filters.size === 0) {
        study.classList.remove('hidden');
        return;
      }

      const hasMatchingTags = Array.from(filters).some(tag =>
        studyTags.includes(tag)
      );

      if (hasMatchingTags) {
        study.classList.remove('hidden');
      } else {
        study.classList.add('hidden');
      }
    });
  };

  return (
    <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Filter by:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('industries')}
                className={`text-sm font-medium transition-colors ${activeTab === 'industries' ? 'text-foreground' : 'text-muted-foreground'
                  }`}
              >
                Industries
              </button>
              <span className="text-muted-foreground">•</span>
              <button
                onClick={() => setActiveTab('technologies')}
                className={`text-sm font-medium transition-colors ${activeTab === 'technologies' ? 'text-foreground' : 'text-muted-foreground'
                  }`}
              >
                Technologies
              </button>
            </div>
            {activeFilters.size > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {activeTab === 'industries' && industries.map(tag => (
              <button
                key={tag}
                onClick={() => toggleFilter(tag)}
                className={`transition-all duration-300 rounded-full px-2 py-1 text-xs ${activeFilters.has(tag)
                    ? 'bg-primary/20 text-primary'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                  }`}
              >
                {tag}
              </button>
            ))}

            {activeTab === 'technologies' && technologies.map(tag => (
              <button
                key={tag}
                onClick={() => toggleFilter(tag)}
                className={`transition-all duration-300 rounded-full px-2 py-1 text-xs ${activeFilters.has(tag)
                    ? 'bg-primary/20 text-primary'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyFilters;