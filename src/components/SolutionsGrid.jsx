import React, { useState } from 'react';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { solutionsTranslations } from '@/i18n/translations/solutions';

const ProblemSolutionCard = ({ title, items, isHovered, type, onHover, onLeave, id }) => {
  const isProblem = type === 'problem';

  return (
    <Card
      className={`relative overflow-hidden group cursor-pointer transition-all duration-300 ${
        isHovered ? 'shadow-lg ring-2 ring-feitlijn-purple' : ''
      }`}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onLeave()}
    >
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
        ${
          isProblem
            ? 'bg-gradient-to-r from-destructive/10 via-surface-2 to-surface-2'
            : 'bg-gradient-to-r from-success/10 via-surface-2 to-surface-2'
        }`}
      />

      <div className="relative p-6 space-y-4">
        <div className="flex items-center space-x-3">
          {isProblem ? (
            <AlertCircle className="w-6 h-6 text-red-400" />
          ) : (
            <CheckCircle className="w-6 h-6 text-success" />
          )}
          <h4 className={`text-lg font-bold ${isProblem ? 'text-red-400' : 'text-success'}`}>
            {title}
          </h4>
        </div>

        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className={`flex items-start space-x-3 transition-all duration-300 ${
                isHovered ? 'transform translate-x-2' : ''
              }`}
            >
              <span className={`mt-1 ${isProblem ? 'text-destructive' : 'text-success'}`}>
                {isProblem ? '•' : '→'}
              </span>
              <span className="text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

const CategoryRow = ({ category, problem, solution, hoveredId, setHoveredId }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-feitlijn-purple">{category}</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
      <div className="relative">
        <ProblemSolutionCard
          {...problem}
          type="problem"
          isHovered={hoveredId === problem.id}
          onHover={setHoveredId}
          onLeave={() => setHoveredId(null)}
        />
      </div>

      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className={`transition-all duration-300 ${
            hoveredId === problem.id || hoveredId === solution.id
              ? 'scale-125 text-feitlijn-purple'
              : 'text-text-secondary'
          }`}
        >
          <ArrowRight className="w-12 h-12" />
        </div>
      </div>

      <div className="relative">
        <ProblemSolutionCard
          {...solution}
          type="solution"
          isHovered={hoveredId === solution.id}
          onHover={setHoveredId}
          onLeave={() => setHoveredId(null)}
        />
      </div>
    </div>
  </div>
);

const SolutionsGrid = ({ lang = 'nl' }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const { categories } = solutionsTranslations[lang];

  return (
    <div className="w-full mx-auto">
      <div className="space-y-16">
        {categories.map((category, index) => (
          <CategoryRow
            key={index}
            category={category.title}
            problem={category.problem}
            solution={category.solution}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
};

export default SolutionsGrid;
