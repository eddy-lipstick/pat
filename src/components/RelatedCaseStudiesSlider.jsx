import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { caseStudiesTranslations } from '@/i18n/translations/case-studies';

const RelatedCaseStudiesSlider = ({ studies, currentStudyId, lang = 'nl' }) => {
  const t = caseStudiesTranslations[lang];
  const sliderRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Copy the date parsing function from the case-studies/index.astro page
  const getDateForSorting = (dateStr) => {
    if (!dateStr) return new Date(0); // Handle missing dates
    
    // Maps for both English and Dutch month names
    const monthMap = {
      // English months
      'january': 1, 'jan': 1,
      'february': 2, 'feb': 2,
      'march': 3, 'mar': 3,
      'april': 4, 'apr': 4,
      'may': 5,
      'june': 6, 'jun': 6,
      'july': 7, 'jul': 7,
      'august': 8, 'aug': 8,
      'september': 9, 'sep': 9, 'sept': 9,
      'october': 10, 'oct': 10,
      'november': 11, 'nov': 11,
      'december': 12, 'dec': 12,
      
      // Dutch months
      'januari': 1,
      'februari': 2,
      'maart': 3,
      'april': 4,
      'mei': 5,
      'juni': 6,
      'juli': 7,
      'augustus': 8,
      'september': 9,
      'oktober': 10,
      'november': 11,
      'december': 12
    };
    
    // Split the date into parts and standardize
    const parts = dateStr.split(' ');
    if (parts.length !== 2) {
      console.warn(`Date format issue with: ${dateStr}`);
      return new Date(0); // Return earliest possible date for invalid formats
    }
    
    const monthName = parts[0].toLowerCase();
    const year = parseInt(parts[1], 10);
    const month = monthMap[monthName];
    
    if (!month || isNaN(year)) {
      console.warn(`Invalid date: ${dateStr} (month: ${monthName}, year: ${year})`);
      return new Date(0);
    }
    
    // Create a standardized date string (YYYY-MM-01)
    const monthStr = month.toString().padStart(2, '0');
    return new Date(`${year}-${monthStr}-01T00:00:00Z`);
  };
  
  // Filter out the current study and sort by date (newest first)
  let filteredStudies = studies
    .filter((study) => study.id !== currentStudyId)
    .sort((a, b) => {
      // Use the same date parsing logic as the main case studies page
      const dateA = getDateForSorting(a.data.metadata?.date);
      const dateB = getDateForSorting(b.data.metadata?.date);
      
      // Sort newest first
      return dateB.getTime() - dateA.getTime();
    });

  // Early exit if no related studies
  if (!filteredStudies.length) {
    return null;
  }

  const handleScroll = (direction) => {
    if (!sliderRef.current) return;

    const { scrollWidth, clientWidth } = sliderRef.current;
    const scrollAmount = clientWidth * 0.9; // Almost a full viewport

    let newPosition =
      direction === 'left'
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(scrollWidth - clientWidth, scrollPosition + scrollAmount);

    sliderRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth',
    });

    setScrollPosition(newPosition);
  };

  // Update scroll buttons state on scroll
  const handleScrollUpdate = () => {
    if (!sliderRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setScrollPosition(scrollLeft);
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px tolerance for rounding errors
  };

  // Set up scroll event listener
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScrollUpdate);
      // Initial check
      handleScrollUpdate();

      return () => {
        slider.removeEventListener('scroll', handleScrollUpdate);
      };
    }
  }, []);

  return (
    <div className="py-20 pb-28 mt-10 mb-[-128px] bg-surface-1 text-foreground">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className={`bg-white border-none hover:bg-white/30 text-background h-8 w-12 ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className={`bg-white/20 border-none hover:bg-white/30 text-background h-8 w-12 ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={handleScrollUpdate}
        >
          {filteredStudies.map((study) => {
            const {
              id,
              data: {
                title,
                introduction,
                cover_image,
                metadata: { client, date, relatedSkills = [] },
              },
            } = study;

            // Extract the filename without language prefix and extension
            const baseId = id
              .split('/')
              .pop()
              ?.replace(/\.[^/.]+$/, '');

            return (
              <a
                href={`/${lang}/case-studies/${baseId}`}
                key={id}
                className="flex-none w-[90%] lg:w-[30%] group cursor-pointer transition-all relative hover:translate-y-[-4px] duration-300"
              >
                <div className="relative flex flex-col transition-all duration-500 overflow-hidden">
                  {/* Image container with hover effect */}
                  <div className="relative aspect-[3/2] overflow-hidden mb-4 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-70"></div>
                    {cover_image?.src && (
                      <img
                        src={cover_image.src}
                        alt={cover_image.alt || title}
                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col h-full">
                    <div>
                      <div className="mb-2">
                        <p className="text-sm">{client}</p>
                        <h3 className="mb-10 text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                          {title}
                        </h3>
                      </div>

                      {relatedSkills && relatedSkills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {relatedSkills.slice(0, 3).map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-primary/10 text-primary hover:bg-primary/20 border-none"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {relatedSkills.length > 3 && (
                            <Badge
                              variant="outline"
                              className="bg-background/10 text-background/70 border-none"
                            >
                              +{relatedSkills.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Add subtle hover effect to indicate clickability */}
              </a>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button
            className="bg-primary text-white hover:bg-primary-700 transition-all"
            asChild
            size="lg"
          >
            <a href={`/${lang}/case-studies`}>
              {t.relatedCaseStudies?.viewAll || 'View all case studies'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RelatedCaseStudiesSlider;
