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

const CaseStudyCard = ({ study, lang = 'nl' }) => {
  const {
    id,
    data: {
      title,
      introduction,
      cover_image,
      metadata: {
        client,
        date,
        relatedSkills = [], // Default empty array for relatedSkills
      },
    },
  } = study;

  // Extract the part of the ID after the language prefix
  const studyId = id.includes('/') ? id.split('/')[1] : id;

  // Construct the correct URL with the language prefix
  const caseStudyUrl = `/${lang}/case-studies/${studyId}`;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all group">
      <a href={caseStudyUrl} className="block">
        {cover_image?.src && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={cover_image.src}
              alt={cover_image.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <CardHeader>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              {client} • {date}
            </p>
            <CardTitle className="line-clamp-2">{title}</CardTitle>
            <CardDescription className="line-clamp-2">{introduction}</CardDescription>
          </div>
        </CardHeader>

        {relatedSkills && relatedSkills.length > 0 && (
          <CardFooter>
            <div className="flex flex-wrap gap-2">
              {relatedSkills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-primary/10 text-primary hover:bg-primary/20"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardFooter>
        )}
      </a>
    </Card>
  );
};

export default CaseStudyCard;
