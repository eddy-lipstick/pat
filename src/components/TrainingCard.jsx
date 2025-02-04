import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays } from 'lucide-react';

const TrainingCard = ({ training, lang = 'nl' }) => {
  const {
    id,
    data: { title, description, publishDate, author, tags = [], coverImage },
  } = training;

  // Format the URL correctly based on the content ID and language
  const trainingId = id.split('/').pop()?.replace('.md', '');
  const href = `/${lang}/learn/training/${trainingId}`;

  // Use the provided language for date formatting
  const formattedDate = new Date(publishDate).toLocaleDateString(lang, {
    year: 'numeric',
    month: 'long',
  });

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all group">
      <a href={href} className="block">
        {coverImage && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={coverImage}
              alt={`Cover image for ${title}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <CardHeader>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {publishDate && (
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
              )}
            </div>
            <CardTitle className="line-clamp-2">{title}</CardTitle>
            <CardDescription className="line-clamp-2">{description}</CardDescription>
          </div>
        </CardHeader>

        {tags && tags.length > 0 && (
          <CardFooter>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-primary/10 text-primary hover:bg-primary/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardFooter>
        )}
      </a>
    </Card>
  );
};

export default TrainingCard;
