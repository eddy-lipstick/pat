import React from 'react';
import { toolsTranslations } from '@/i18n/translations/tools';

/**
 * Simplified grid component for displaying tools products on the homepage
 * 2-column grid with large cover images and hover effect for more info
 */
const ToolsGrid = ({ products, lang = 'nl' }) => {
  // Get translations for the current language
  const t = toolsTranslations[lang] || toolsTranslations.en;

  // Early return if no products
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">No tools products found.</p>
      </div>
    );
  }

  // Function to get slug from product ID
  const getSlug = (id) => {
    return id
      .split('/')
      .pop()
      ?.replace(/\.[^/.]+$/, '');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {products.map((product) => {
        const {
          id,
          data: {
            title,
            introduction,
            coverImage,
            metadata: { relatedSkills = [] },
          },
        } = product;

        const slug = getSlug(id);
        const productUrl = `/${lang}/tools/${slug}`;

        return (
          <a
            key={id}
            href={productUrl}
            className="group relative overflow-hidden rounded-xl bg-surface-1 border border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg block h-full"
          >
            {/* Card Content */}
            <div className="h-full flex flex-col">
              {/* Cover Image - Large and Centered */}
              <div className="flex-grow flex items-center justify-center overflow-hidden aspect-video">
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-surface-2">
                    <span className="text-2xl font-bold text-primary">{title}</span>
                  </div>
                )}
              </div>

              {/* Hover Overlay with Text */}
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">{title}</h3>

                <p className="text-text-secondary mb-4 max-w-md">{introduction}</p>

                {/* Skills Tags */}
                {relatedSkills && relatedSkills.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {relatedSkills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* View Product Button */}
                <span className="inline-flex items-center text-primary font-medium mt-2">
                  {t.buttons.goToProduct}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default ToolsGrid;
