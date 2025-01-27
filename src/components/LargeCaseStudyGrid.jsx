import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const LargeCaseStudyGrid = ({ studies }) => {
    return (
        <div className="space-y-32">
            {studies.map((study, index) => {
                const {
                    id,
                    data: {
                        title,
                        introduction,
                        metadata: {
                            client,
                            date,
                            relatedSkills = []
                        },
                        images
                    }
                } = study;

                const coverImage = images?.[0]?.src;

                return (
                    <div
                        key={id}
                        className={`relative group grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                            }`}
                    >


                        {/* Image container */}
                        <div className={`
              relative h-96 rounded-2xl overflow-hidden
              transition-transform duration-500 ease-out group-hover:scale-[1.02]
              shadow-xl shadow-primary-600/10
              ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}
            `}>
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                            {coverImage && (
                                <img
                                    src={coverImage}
                                    alt={title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            )}
                        </div>

                        {/* Content container */}
                        <div className={`
              flex flex-col space-y-6
              transition-transform duration-500 ease-out group-hover:translate-y-[-4px]
              ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}
            `}>
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    {client} • {date}
                                </p>
                                <h3 className="text-3xl font-bold">
                                    {title}
                                </h3>
                                <p className="text-lg text-text-secondary">
                                    {introduction}
                                </p>
                            </div>

                            {relatedSkills && relatedSkills.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {relatedSkills.map((skill, index) => (
                                        <Badge
                                            key={index}
                                            variant="outline"
                                            className="bg-primary/10 text-primary hover:bg-primary/20"
                                        >
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            <div className="pt-4">
                                <Button
                                    className="group relative overflow-hidden bg-feitlijn-yellow hover:bg-primary-600 transition-colors duration-300"
                                >
                                    <a
                                        href={`/case-studies/${id}`}
                                        className="inline-flex items-center"
                                    >
                                        Bekijk dit project
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default LargeCaseStudyGrid;