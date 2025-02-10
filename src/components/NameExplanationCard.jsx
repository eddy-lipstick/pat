import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const NameExplanationCard = () => {
  return (
    <div className="relative w-full lg:w-fit lg:max-w-[400px] lg:ml-auto">
      <Card className="bg-surface-1 hover:bg-surface-2 transition-all duration-300 transform hover:-translate-y-1">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-feitlijn-purple mt-2 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-text-secondary text-sm">
                <span className="text-feitlijn-purple font-medium">Patroon</span> [pah·trohn]
                combines the Dutch word for pattern (systematic design) with a traditional Dutch
                legal term referring to the collaborative relationship between experienced and
                junior lawyers, reflecting our belief in making law more accessible through
                partnership.
              </p>
              <a
                href="/en/about"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Learn more about our story
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Card>

      <div className="absolute -z-10 w-full h-full top-2 left-2 bg-feitlijn-purple/10 rounded-lg" />
    </div>
  );
};

export default NameExplanationCard;
