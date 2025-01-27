import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TeamSection = () => {
    const teamMembers = [
        {
            name: "Maurits Fornier",
            role: "Legal Design Lead",
            imageUrl: "/images/team/maurits-fornier.webp"
        },
        {
            name: "Dielis Delen",
            role: "Software Developer",
            imageUrl: "/images/team/dielis-delen.webp"
        },
        {
            name: "Savannah Koomen",
            role: "Strategie Lead",
            imageUrl: "/images/team/savannah-koomen.webp"
        }
    ];

    return (
        <div className="w-full bg-background text-foreground py-24 px-6 rounded-sm overflow-hidden relative">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr,1.5fr] gap-12 items-center">
                {/* Content Column */}
                <div className="space-y-6">
                    <h2 className="text-4xl font-bold font-roc-grotesk">
                        Klaar om je legal design project te starten?
                    </h2>
                    <p className="text-text-secondary text-lg">
                        Plan een vrijblijvend gesprek in met een van onze legal designers.
                        We denken graag met je mee over hoe we jouw juridische communicatie kunnen verbeteren.
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                        <Button
                            size="lg"
                            className="group bg-feitlijn-purple hover:bg-feitlijn-purple-600 text-white transition-all duration-300"
                        >
                            Plan een gesprek
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                    </div>
                </div>

                {/* Team Images Column */}
                <div className="relative grid grid-cols-2 gap-6 h-[500px]">
                    {/* Main (larger) image */}
                    <div className="col-span-1 row-span-2">
                        <div className="absolute -inset-4 bg-gradient-to-r from-feitlijn-purple/20 to-feitlijn-yellow/20 rounded-full blur-3xl" />
                        <Card className="relative bg-surface-2 border-0 overflow-hidden rounded-2xl h-full group">
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                            <img
                                src={teamMembers[0].imageUrl}
                                alt={`${teamMembers[0].name} - ${teamMembers[0].role}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="font-medium text-lg font-roc-grotesk">{teamMembers[0].name}</p>
                                <p className="text-text-secondary">{teamMembers[0].role}</p>
                            </div>
                        </Card>
                    </div>

                    {/* Two smaller images */}
                    <div className="col-span-1 space-y-6">
                        {teamMembers.slice(1, 3).map((member, index) => (
                            <Card key={member.name} className="relative bg-surface-2 border-0 overflow-hidden rounded-2xl h-[235px] group">
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                                <img
                                    src={member.imageUrl}
                                    alt={`${member.name} - ${member.role}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="font-medium font-roc-grotesk">{member.name}</p>
                                    <p className="text-text-secondary text-sm">{member.role}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-0 w-24 h-24 bg-feitlijn-purple/10 rounded-full blur-xl" />
                <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-feitlijn-yellow/10 rounded-full blur-xl" />
                <div className="absolute top-1/4 right-0 w-40 h-40 bg-feitlijn-purple/5 rounded-full blur-2xl" />
            </div>
        </div>
    );
};

export default TeamSection;