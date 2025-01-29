import React from 'react';
import { Button } from '@/components/ui/button';
import NewsCard from './NewsCard';

const RecentNewsSection = ({ newsItems }) => {
  // Take only the 5 most recent news items
  const recentNews = newsItems.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="grid gap-4">
        {recentNews.map((item) => (
          <NewsCard
            key={item.id}
            title={item.data.title}
            date={item.data.date}
            summary={item.data.summary}
            imageSrc={item.data.image?.src}
            imageAlt={item.data.image?.alt}
            href={`/news/${item.id}`}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          variant="outline"
          size="lg"
          className="bg-surface-1 text-text-primary hover:bg-surface-2"
          asChild
        >
          <a href="/news">Bekijk alle nieuwsberichten</a>
        </Button>
      </div>
    </div>
  );
};

export default RecentNewsSection;
