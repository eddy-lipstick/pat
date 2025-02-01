import React from 'react';
import NewsCard from './NewsCard';

const NewsList = ({ newsItems }) => {
  return (
    <div className="grid gap-6">
      {newsItems.map((item) => (
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
  );
};

export default NewsList;
