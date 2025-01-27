import React, { useState } from 'react';
import { ArrowDown, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";

const ProblemSolutionCard = ({ title, items, isHovered, type, onHover, onLeave, id }) => {
  const isProblem = type === 'problem';

  return (
    <Card
      className={`relative overflow-hidden group cursor-pointer transition-all duration-300 ${isHovered ? 'shadow-lg ring-2 ring-feitlijn-purple' : ''
        }`}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onLeave()}
    >
      {/* Background gradient effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
        ${isProblem ? 'bg-gradient-to-br from-destructive/10 via-surface-2 to-surface-2'
          : 'bg-gradient-to-br from-success/10 via-surface-2 to-surface-2'}`}
      />

      <div className="relative p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          {isProblem ? (
            <AlertCircle className="w-6 h-6 text-destructive" />
          ) : (
            <CheckCircle className="w-6 h-6 text-success" />
          )}
          <h4 className={`text-lg font-bold ${isProblem ? 'text-destructive' : 'text-success'
            }`}>
            {title}
          </h4>
        </div>

        {/* Items list */}
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li
              key={index}
              className={`flex items-start space-x-3 transition-all duration-300 ${isHovered ? 'transform translate-x-2' : ''
                }`}
            >
              <span className={`mt-1 ${isProblem ? 'text-destructive' : 'text-success'
                }`}>
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

const CategoryColumn = ({ category, problem, solution, hoveredId, setHoveredId }) => (
  <div className="flex-1 space-y-8">
    {/* Category Header */}
    <div className="text-center">
      <h3 className="text-2xl font-bold text-feitlijn-purple mb-2">{category}</h3>
      <div className="h-1 w-24 bg-feitlijn-purple mx-auto rounded-full" />
    </div>

    {/* Problem Card */}
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-text-secondary flex items-center justify-center space-x-2">
        <AlertCircle className="w-5 h-5" />
        <span>Uitdaging</span>
      </h4>
      <ProblemSolutionCard
        {...problem}
        type="problem"
        isHovered={hoveredId === problem.id}
        onHover={setHoveredId}
        onLeave={() => setHoveredId(null)}
      />
    </div>

    {/* Arrow */}
    <div className="flex justify-center py-4">
      <div className={`transition-all duration-300 ${hoveredId === problem.id ? 'scale-125 text-feitlijn-purple translate-y-2' : 'text-text-secondary'
        }`}>
        <ArrowDown className="w-8 h-8" />
      </div>
    </div>

    {/* Solution Card */}
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-text-secondary flex items-center justify-center space-x-2">
        <CheckCircle className="w-5 h-5" />
        <span>Oplossing</span>
      </h4>
      <ProblemSolutionCard
        {...solution}
        type="solution"
        isHovered={hoveredId === solution.id}
        onHover={setHoveredId}
        onLeave={() => setHoveredId(null)}
      />
    </div>
  </div>
);

const SolutionsGrid = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const categories = [
    {
      title: "Slimmer & Sneller",
      problem: {
        id: 1,
        title: "Tijdrovend juridisch werk",
        items: [
          "Urenlang handmatig contracten nakijken",
          "Relevante rechtspraak missen door informatieoverload",
          "Steeds dezelfde compliance checks herhalen"
        ]
      },
      solution: {
        id: 2,
        title: "Slimme automatisering",
        items: [
          "Contracten automatisch analyseren met AI",
          "Direct relevante rechtspraak in je inbox",
          "Self-service tools voor compliance teams"
        ]
      }
    },
    {
      title: "Duidelijker",
      problem: {
        id: 3,
        title: "Onbegrijpelijke documenten",
        items: [
          "Contracten vol juridisch jargon",
          "Processtukken die niet overtuigen",
          "Beleid dat niemand naleeft"
        ]
      },
      solution: {
        id: 4,
        title: "Effectieve communicatie",
        items: [
          "Heldere contracten die mensen snappen",
          "Overtuigende visuele processtukken",
          "Beleid dat aanzet tot naleving"
        ]
      }
    }
  ];

  return (
    <div className="w-full space-y-12 py-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-text-primary">
          Van probleem naar oplossing
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          We combineren juridische expertise, technologie en design om dagelijkse uitdagingen van de moderne jurist op te lossen
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mt-12">
        {categories.map((category, index) => (
          <CategoryColumn
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