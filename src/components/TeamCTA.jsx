import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TeamCTA = ({ teamMember }) => {
    return (
        <div className="w-full bg-background text-foreground py-24 px-6 rounded-sm overflow-hidden relative">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* Content Column */}
                <div className="space-y-6">
                    <h2 className="text-4xl font-bold">
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

                {/* Image Column */}
                <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-feitlijn-purple/20 to-feitlijn-yellow/20 rounded-full blur-3xl" />
                    <Card className="relative bg-surface-2 border-0 overflow-hidden rounded-2xl aspect-square">
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        <img
                            src={teamMember.imageUrl}
                            alt={`${teamMember.name} - ${teamMember.role}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-6 left-6 right-6">
                            <p className="font-medium text-lg">{teamMember.name}</p>
                            <p className="text-text-secondary">{teamMember.role}</p>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-0 w-24 h-24 bg-feitlijn-purple/10 rounded-full blur-xl" />
                <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-feitlijn-yellow/10 rounded-full blur-xl" />
            </div>
        </div>
    );
};

export default TeamCTA;