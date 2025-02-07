import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LessonNavigation = ({ prevLesson, nextLesson, courseId }) => {
  return (
    <Card className="mb-6">
      <div className="p-4">
        <div className="flex justify-between gap-4">
          {prevLesson ? (
            <Button variant="outline" asChild className="w-[120px] justify-start">
              <a
                href={`/learn/courses/${courseId}/lessons/${prevLesson.id.split('/').pop()?.replace('.md', '')}`}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Vorige</span>
              </a>
            </Button>
          ) : (
            <div className="w-[120px]" />
          )}

          {nextLesson && (
            <Button asChild className="w-[120px] justify-end">
              <a
                href={`/learn/courses/${courseId}/lessons/${nextLesson.id.split('/').pop()?.replace('.md', '')}`}
                className="flex items-center gap-2"
              >
                <span>Volgende</span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default LessonNavigation;
