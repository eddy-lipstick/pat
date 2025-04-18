import React from 'react';

const PulseLabel = ({ text, className = '' }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="relative flex">
                <div className="w-3 h-3 bg-feitlijn-purple rounded-full"></div>
                <div className="absolute animate-ping w-3 h-3 bg-feitlijn-purple rounded-full"></div>
            </div>
            <span className="text-sm font-medium text-feitlijn-purple uppercase tracking-wider">
                {text}
            </span>
        </div>
    );
};

export default PulseLabel;