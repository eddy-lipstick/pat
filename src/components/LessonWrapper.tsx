import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Lock, CheckCircle2 } from 'lucide-react';
import Paywall from './Paywall';
import VideoEmbed from '@/components/VideoEmbed';

const LessonWrapper = ({ lesson, course, lessonIndex, videoUrl, children }) => {
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    // Check for course access and update state
    const checkAccess = () => {
      try {
        const accessCodes = JSON.parse(localStorage.getItem('courseAccess') || '{}');
        console.log('Checking access for course:', course.id);
        console.log('Current access codes:', accessCodes);
        setHasAccess(!!accessCodes[course.id]);
      } catch (error) {
        console.error('Error checking course access:', error);
        setHasAccess(false);
      }
    };

    // Check initially
    checkAccess();

    // Add storage event listener to handle changes
    const handleStorageChange = () => {
      checkAccess();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [course.id]);

  // Determine if content should be paywalled
  const isPaywalled =
    course.data.paywall?.enabled &&
    lessonIndex >= (course.data.paywall?.freeVideos || 10) &&
    !hasAccess;

  console.log('Paywall check:', {
    courseId: course.id,
    enabled: course.data.paywall?.enabled,
    lessonIndex,
    freeVideos: course.data.paywall?.freeVideos,
    hasAccess,
    isPaywalled,
  });

  if (!isPaywalled) {
    return (
      <>
        <div className="w-full">
          {videoUrl && (
            <Card>
              <div className="p-2">
                <div className="aspect-video w-full">
                  <VideoEmbed url={videoUrl} />
                </div>
              </div>
            </Card>
          )}
        </div>
        <Card className="mt-8">
          <div className="p-6 prose prose-invert max-w-none">{children}</div>
        </Card>
      </>
    );
  }

  return (
    <>
      {/* Blurred Video Preview */}
      <div className="relative w-full">
        <Card>
          <div className="p-2">
            <div className="aspect-video w-full filter blur-lg">
              <VideoEmbed url={videoUrl} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-4 rounded-lg bg-background/80 backdrop-blur-sm">
                <Lock className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Premium</h3>
                <p className="text-sm text-muted-foreground">
                  Scroll naar beneden om deze les te ontgrendelen
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Premium Content Information & Paywall */}
      <Card className="mt-8">
        <div className="p-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
              Krijg volledige toegang tot {course.data.title}
            </h2>

            {/* Course Value Proposition */}

            {/* Course Progress Indicator */}
            <div className="mb-8">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Je voortgang</h4>
                <div className="w-full bg-background rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2"
                    style={{
                      width: `${(course.data.paywall?.freeVideos / course.data.lessonsCount) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Je hebt {lessonIndex} van de {course.data.paywall?.freeVideos} gratis lessen
                  afgerond
                </p>
              </div>
            </div>

            {/* Paywall Form */}
            <div className="max-w-md mx-auto">
              <Paywall
                price={course.data.paywall?.price || '€199'}
                courseTitle={course.data.title}
              />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default LessonWrapper;
