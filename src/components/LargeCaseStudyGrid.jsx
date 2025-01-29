import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const LargeCaseStudyGrid = ({ studies }) => {
  return (
    <div className="space-y-16 md:space-y-32">
      {studies.map((study, index) => {
        const {
          id,
          data: {
            title,
            introduction,
            cover_image,
            metadata: { client, date, relatedSkills = [] },
          },
        } = study;

        return (
          <div
            key={id}
            className={`relative group grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center ${
              index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
            }`}
          >
            {/* Image container with optimized mobile display */}
            <div
              className={`
                            relative overflow-hidden rounded-2xl
                            transition-transform duration-500 ease-out group-hover:scale-[1.02]
                            shadow-xl shadow-primary-600/10
                            aspect-[16/12] sm:aspect-[16/10] lg:aspect-[16/9]
                            ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}
                        `}
            >
              <div className="absolute inset-0 z-10" />
              {cover_image?.src && (
                <div className="absolute inset-0">
                  <img
                    src={cover_image.src}
                    alt={cover_image.alt || title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              )}
            </div>

            {/* Content container with improved spacing */}
            <div
              className={`
                            flex flex-col space-y-4 lg:space-y-6
                            transition-transform duration-500 ease-out group-hover:translate-y-[-4px]
                            ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}
                        `}
            >
              <div className="space-y-2 lg:space-y-3">
                <p className="text-sm text-muted-foreground">
                  {client} • {date}
                </p>
                <h3 className="text-2xl lg:text-3xl font-bold">{title}</h3>
                <p className="text-base lg:text-lg text-text-secondary">{introduction}</p>
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

              <div className="pt-2 lg:pt-4 w-full">
                <Button className="group relative overflow-hidden bg-feitlijn-yellow text-black hover:bg-feitlijn-yellow-400 transition-colors duration-300 w-full sm:w-auto">
                  <a
                    href={`/case-studies/${id}`}
                    className="inline-flex items-center justify-center w-full"
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
