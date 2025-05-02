import { getCollection } from 'astro:content';

/**
 * Get all unique tags across collections for a specific language
 */
export async function getAllTags(lang) {
  let collections = {};

  try {
    collections = {
      'case-studies': await getCollection('case-studies'),
      news: await getCollection('news'),
      articles: await getCollection('articles'),
      tools: await getCollection('tools'),
    };
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }

  const tags = new Set();

  const processItems = (items) => {
    items
      .filter((item) => {
        // Apply same language filtering logic
        if (item.id.startsWith(`${lang}/`)) {
          return true;
        }
        if (!item.id.includes('/') && item.data.language === lang) {
          return true;
        }
        return false;
      })
      .forEach((item) => {
        const itemTags = item.data.tags || item.data.labels || [];
        itemTags.forEach((tag) => tags.add(tag.toLowerCase()));
      });
  };

  Object.values(collections).forEach((collection) => {
    if (Array.isArray(collection)) {
      processItems(collection);
    }
  });

  return Array.from(tags).sort();
}

/**
 * Get all content items with a specific tag
 */
export async function getContentByTag(tag, lang) {
  let collections = {};

  try {
    collections = {
      'case-studies': await getCollection('case-studies'),
      news: await getCollection('news'),
      articles: await getCollection('articles'),
      tools: await getCollection('tools'),
    };
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }

  const taggedContent = [];

  const getUrlPath = (type) => {
    switch (type) {
      case 'articles':
        return 'learn/articles';
      case 'case-studies':
        return 'case-studies';
      case 'news':
        return 'news';
      default:
        return type;
    }
  };

  const processItems = (items, collectionType) => {
    console.log(`Processing ${collectionType} collection`);

    return items
      .filter((item) => {
        // First check language using same logic as news page
        const isCorrectLanguage =
          item.id.startsWith(`${lang}/`) || (!item.id.includes('/') && item.data.language === lang);

        // Then check tags
        const itemTags = item.data.tags || item.data.labels || [];
        const hasTag = itemTags.some((t) => t.toLowerCase() === tag.toLowerCase());

        // Debug logging for news items
        if (collectionType === 'news') {
          console.log('Processing item:', {
            id: item.id,
            language: item.data.language,
            inFolder: item.id.startsWith(`${lang}/`),
            hasLanguageField: item.data.language === lang,
            isCorrectLanguage,
            hasTag,
            tags: itemTags,
          });
        }

        return isCorrectLanguage && hasTag;
      })
      .map((item) => {
        const id = item.id.includes('/')
          ? item.id
              .split('/')
              .pop()
              .replace(/\.mdx?$/, '')
          : item.id.replace(/\.mdx?$/, '');

        const urlPath = getUrlPath(collectionType);
        const url = `/${lang}/${urlPath}/${id}`;

        if (collectionType === 'news') {
          console.log(`Generated URL for news item: ${url}`);
        }

        return {
          ...item,
          collectionType,
          url,
        };
      });
  };

  // Process each collection
  for (const [type, collection] of Object.entries(collections)) {
    if (Array.isArray(collection)) {
      const items = processItems(collection, type);

      // Debug log for news items
      if (type === 'news') {
        console.log(`Found ${items.length} news items with tag "${tag}"`);
      }

      taggedContent.push(...items);
    }
  }

  // Final sort by date
  return taggedContent.sort((a, b) => {
    const dateA = a.data.date || a.data.publishDate || new Date(0);
    const dateB = b.data.date || b.data.publishDate || new Date(0);
    return new Date(dateB) - new Date(dateA);
  });
}
