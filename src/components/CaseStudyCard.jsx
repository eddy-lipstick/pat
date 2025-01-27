// components/CaseStudyCard.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CaseStudyCard = ({ study }) => {
  const {
    id,
    data: {
      title,
      introduction,
      metadata: {
        client,
        date,
        services = [] // Add default empty array
      },
      images
    }
  } = study;

  // Get the first image from the images array for the card thumbnail
  const coverImage = images?.[0]?.src;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      <a href={`/case-studies/${id}`} className="block">
        {coverImage && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
        )}

        <CardHeader>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              {client} • {date}
            </p>
            <CardTitle className="line-clamp-2">
              {title}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {introduction}
            </CardDescription>
          </div>
        </CardHeader>

        {services && services.length > 0 && (
          <CardFooter>
            <div className="flex flex-wrap gap-2">
              {services.map((service, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-primary/10 text-primary hover:bg-primary/20"
                >
                  {service}
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