// src/components/NewsList.tsx
import React from 'react';
import NewsCard from './NewsCard';

interface NewsItem {
  id: string;
  data: {
    title: string;
    date: string | Date;
    summary: string;
    image?: {
      src: string;
      alt: string;
    };
  };
}

interface NewsListProps {
  newsItems?: NewsItem[];
  lang: 'nl' | 'en';
}

const NewsList: React.FC<NewsListProps> = ({ newsItems, lang }) => {
  return (
    <div className="grid gap-6">
      {newsItems?.map((item) => (
        <NewsCard
          key={item.id}
          title={item.data.title}
          date={item.data.date}
          summary={item.data.summary}
          imageSrc={item.data.image?.src}
          imageAlt={item.data.image?.alt}
          href={item.id}
          lang={lang}
        />
      ))}
    </div>
  );
};
export default NewsList;