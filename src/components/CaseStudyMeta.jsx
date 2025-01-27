// src/components/CaseStudyMeta.jsx
import React from 'react';
import { CalendarDays, Tags, Link } from 'lucide-react';

const MetaItem = ({ icon, label, children }) => (
    <div className="p-6 space-y-1.5">
        <div className="flex items-center gap-2 text-sm">
            {icon}
            <span>{label}</span>
        </div>
        {children}
    </div>
);

const CaseStudyMeta = ({ client, date, relatedSkills = [], website }) => {
    return (
        <div className="w-full mb-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border/20">
                    <MetaItem label="Opdrachtgever">
                        <p className="font-medium">{client}</p>
                    </MetaItem>

                    <MetaItem icon={<CalendarDays className="w-4 h-4" />} label="Datum">
                        <p className="font-medium">{date}</p>
                    </MetaItem>

                    {relatedSkills && relatedSkills.length > 0 && (
                        <MetaItem icon={<Tags className="w-4 h-4" />} label="Diensten">
                            <div className="flex flex-wrap gap-2">
                                {relatedSkills.map((skill, index) => (

                                    <a key={index}
                                        href={`/approach/${skill.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="transition-all duration-300 rounded-full px-2 py-0.5 text-xs bg-primary/10 text-primary hover:bg-primary/20"
                                    >
                                        {skill}
                                    </a>
                                ))}
                            </div>
                        </MetaItem>
                    )}

                    {website && (
                        <MetaItem icon={<Link className="w-4 h-4" />} label="Website">

                            <a href={`https://${website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium hover:text-primary transition-colors"
                            >
                                {website}
                            </a>
                        </MetaItem>
                    )}
                </div>
            </div >
        </div >
    );
};

export default CaseStudyMeta;