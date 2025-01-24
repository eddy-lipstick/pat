import React from 'react';
import PulseLabel from '../components/PulseLabel';


const CaseStudyHero = ({ title, introduction }) => {
    return (
        <div className="container mx-auto px-6 py-16 md:py-24">
            <div className="w-full md:w-4/5">
                <div class="mb-4">
                    <PulseLabel client:load />
                </div>
                <h1 className="text-4xl md:text-6xl font-roc-grotesk font-bold tracking-tight mb-8 text-background">
                    {title}
                </h1>
                <div className="text-xl md:text-2xl text-background font-light">
                    {introduction}
                </div>
            </div>
        </div>
    );
};

export default CaseStudyHero;