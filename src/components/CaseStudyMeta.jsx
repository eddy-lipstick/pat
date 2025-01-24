import React from 'react';
import { CalendarDays, Briefcase, Tags, Link } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CaseStudyMeta = ({
    client = "Ministerie van Economische Zaken",
    date = "2024",
    services = ["Web Development", "UX Design"],
    website = "xxx.com"
}) => {
    return (
        <div className="w-full mb-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border/20">
                    {/* Client Section */}
                    <div className="p-6 space-y-1.5">
                        <div className="flex items-center gap-2 text-sm">
                            <span>Opdrachtgever</span>
                        </div>
                        <p className="font-medium">{client}</p>
                    </div>

                    {/* Date Section */}
                    <div className="p-6 space-y-1.5">
                        <div className="flex items-center gap-2 text-sm">
                            <CalendarDays className="w-4 h-4" />
                            <span>Datum</span>
                        </div>
                        <p className="font-medium">{date}</p>
                    </div>

                    {/* Services Section */}
                    <div className="p-6 space-y-1.5">
                        <div className="flex items-center gap-2 text-sm">
                            <Tags className="w-4 h-4" />
                            <span>Diensten</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {services.map((service, index) => (
                                <span
                                    key={index}
                                    className="transition-all duration-300 rounded-full px-2 py-0.5 text-xs
                    bg-primary/10 text-primary hover:bg-primary/20"
                                >
                                    {service}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Website Section */}
                    <div className="p-6 space-y-1.5">
                        <div className="flex items-center gap-2 text-sm">
                            <Link className="w-4 h-4" />
                            <span>Website</span>
                        </div>
                        <a
                            href={`https://${website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium hover:text-primary transition-colors"
                        >
                            {website}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaseStudyMeta;