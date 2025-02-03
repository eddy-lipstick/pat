// src/components/NewsList.jsx
import React from 'react';
import NewsCard from './NewsCard';

const NewsList = ({ newsItems, lang }) => {
  console.log('NewsItems received:', newsItems);
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
