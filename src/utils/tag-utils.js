// src/lib/tag-utils.js
import { getCollection } from 'astro:content';

// Get all unique tags across collections for a specific language
export async function getAllTags(lang) {
  const collections = {
    caseStudies: await getCollection('case-studies'),
    news: await getCollection('news'),
    articles: await getCollection('articles'),
  };

  const tags = new Set();

  // Function to process items from a collection
  const processItems = (items) => {
    items
      .filter((item) => item.id.startsWith(`${lang}/`))
      .forEach((item) => {
        if (item.data.tags) {
          item.data.tags.forEach((tag) => tags.add(tag.toLowerCase()));
        }
      });
  };

  // Process each collection
  Object.values(collections).forEach((collection) => {
    processItems(collection);
  });

  return Array.from(tags).sort();
}

// Get all content items with a specific tag
export async function getContentByTag(tag, lang) {
  const collections = {
    caseStudies: await getCollection('case-studies'),
    news: await getCollection('news'),
    articles: await getCollection('articles'),
  };

  const taggedContent = [];

  // Function to process and filter items from a collection
  const processItems = (items, collectionType) => {
    return items
      .filter((item) => {
        return (
          item.id.startsWith(`${lang}/`) &&
          item.data.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
        );
      })
      .map((item) => ({
        ...item,
        collectionType, // Add collection type to help with rendering
        url: `/${lang}/${collectionType}/${item.id.split('/').pop().replace('.md', '')}`, // Generate URL
      }));
  };

  // Process each collection and add to results
  for (const [type, collection] of Object.entries(collections)) {
    const items = processItems(collection, type);
    taggedContent.push(...items);
  }

  // Sort by date if available, fallback to title
  return taggedContent.sort((a, b) => {
    const dateA = a.data.date || a.data.publishDate || new Date(0);
    const dateB = b.data.date || b.data.publishDate || new Date(0);
    return new Date(dateB) - new Date(dateA);
  });
}
