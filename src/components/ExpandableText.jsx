import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const ExpandableText = ({
    title,
    subtitle,
    firstParagraph,
    remainingText = [],  // Default to empty array
    className = "",
    translations = { readMore: 'Lees meer', readLess: 'Lees minder' }
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Check if remainingText exists and has content
    const hasRemainingText = remainingText && remainingText.length > 0 && remainingText.some(text => text.trim() !== '');

    return (
        <div className={`w-full md:w-3/5 space-y-8 ${className}`}>
            <div className="space-y-4">
                <h2 className="text-4xl font-roc-grotesk font-medium text-background">
                    {title}
                </h2>
                {subtitle && (
                    <h3 className="text-xl text-background/80 font-light">
                        {subtitle}
                    </h3>
                )}
            </div>

            <p className="text-xl text-background font-light leading-relaxed">
                {firstParagraph}
            </p>

            {hasRemainingText && (
                <>
                    <div
                        className={`transform transition-all duration-500 ease-in-out space-y-6 ${isExpanded ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'
                            }`}
                    >
                        {remainingText.map((paragraph, index) => (
                            <p key={index} className="text-xl text-background font-light leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="transition-all duration-300 rounded-full px-3 py-1 text-sm 
                            bg-primary/10 text-primary hover:bg-primary/20 flex items-center"
                    >
                        <span className="mr-2">{isExpanded ? translations.readLess : translations.readMore}</span>
                        <ChevronDown
                            className={`h-4 w-4 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''
                                }`}
                        />
                    </Button>
                </>
            )}
        </div>
    );
};

export default ExpandableText;