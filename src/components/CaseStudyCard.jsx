import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';


const CaseStudyCard = ({ study }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <Card className="h-full bg-background transition-all duration-300">
        <div className="relative aspect-[4/4] overflow-hidden">
          <img
            src={study.data.thumbnail?.url || study.data.cover_image?.url}
            alt={study.data.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="h-60 absolute mx-8 inset-0 translate-y-[180%] bg-background/80 p-6 transition-transform duration-300 group-hover:translate-y-[50%] backdrop-blur-sm">
            <div className="space-y-4 text-white">
              <div>
                <p className="text-sm opacity-60">Used tools</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {study.data.tags.technologies.map(tag => (
                    <span key={tag} className="rounded bg-black/40 px-2 py-1 text-xs backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>


              <Button asChild>
                <a href={`/case-studies/${study.id}`}>Bekijk dit project</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold">{study.data.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{study.data.service_category}</p>
        </div>
      </Card>
    </div>
  );
};

export default CaseStudyCard;