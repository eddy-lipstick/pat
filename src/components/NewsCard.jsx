import React from 'react';
import { Card } from '@/components/ui/card';

const NewsCard = ({ title, date, summary, imageSrc, imageAlt, href }) => {
  return (
    <a href={href} className="block group">
      <Card className="bg-surface-1 border-surface-2 overflow-hidden transition-all duration-300 hover:bg-surface-2 hover:scale-[1.01] hover:shadow-lg">
        <div className="grid md:grid-cols-[2fr,1fr] gap-6">
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-tertiary">
                  {new Date(date).toLocaleDateString('nl-NL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <h2 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                {title}
              </h2>
              <p className="text-text-secondary line-clamp-3">{summary}</p>
            </div>
          </div>
          {imageSrc && (
            <div className="relative h-full min-h-[200px]">
              <img
                src={imageSrc}
                alt={imageAlt || ''}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </Card>
    </a>
  );
};

export default NewsCard;
