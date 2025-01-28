import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CalendarDays,
  Clock,
  Users,
  GraduationCap,
  MapPin,
  Languages,
  CheckCircle2,
} from 'lucide-react';

const TrainingLayout = ({ training }) => {
  const {
    title,
    description,
    publishDate,
    duration,
    level,
    maxParticipants,
    language,
    location,
    price,
    learningObjectives,
    modules,
    trainers,
    prerequisites,
    includes,
    testimonials,
    coverImage,
    gallery,
    tags,
    upcomingDates,
  } = training.data;

  const formattedDate = new Date(publishDate).toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const levelColors = {
    beginner: 'bg-success/20 text-success',
    intermediate: 'bg-warning/20 text-warning',
    advanced: 'bg-destructive/20 text-destructive',
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative">
        {coverImage && (
          <div className="w-full h-96 overflow-hidden">
            <img
              src={coverImage}
              alt={`Cover image for ${title}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} className="bg-primary/20 text-primary hover:bg-primary/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-4xl font-bold text-white">{title}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <Card>
              <CardContent className="prose prose-lg dark:prose-invert pt-6">
                <h2 className="text-2xl font-bold mb-4">Over deze training</h2>
                <p>{description}</p>

                {/* Learning Objectives */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Na deze training kun je:</h3>
                  <ul className="space-y-2">
                    {learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Modules */}
            <Card>
              <CardHeader>
                <CardTitle>Programma</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {modules.map((module, index) => (
                  <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                    <h3 className="font-semibold text-lg mb-2">{module.title}</h3>
                    <p className="text-muted-foreground">{module.description}</p>
                    {module.duration && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{module.duration}</span>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Training Content */}
            <Card>
              <CardContent className="prose dark:prose-invert pt-6">
                <slot />
              </CardContent>
            </Card>

            {/* Testimonials */}
            {testimonials && testimonials.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Wat deelnemers zeggen</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="space-y-4">
                      <p className="italic text-lg">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-4">
                        {testimonial.image && (
                          <img
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="w-12 h-12 rounded-full"
                          />
                        )}
                        <div>
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                            {testimonial.company && ` • ${testimonial.company}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Training Info Card */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{duration}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="w-4 h-4" />
                  <Badge className={levelColors[level]}>{level}</Badge>
                </div>

                {maxParticipants && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4" />
                    <span>Max {maxParticipants} deelnemers</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Languages className="w-4 h-4" />
                  <span>{language === 'nl' ? 'Nederlands' : 'English'}</span>
                </div>

                {price && <div className="mt-4 text-xl font-bold">{price}</div>}
              </CardContent>
            </Card>

            {/* Trainers */}
            <Card>
              <CardHeader>
                <CardTitle>Trainers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trainers &&
                  trainers.map((trainer, index) => {
                    if (!trainer) return null;
                    return (
                      <div key={index} className="flex items-center gap-4">
                        {trainer.data?.profileImage && (
                          <img
                            src={trainer.data.profileImage}
                            alt={trainer.data.name || 'Trainer'}
                            className="w-12 h-12 rounded-full"
                          />
                        )}
                        <div>
                          <p className="font-semibold">{trainer.data?.name || 'Trainer'}</p>
                          <p className="text-sm text-muted-foreground">
                            {trainer.data?.role || ''}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </CardContent>
            </Card>

            {/* What's Included */}
            {includes && includes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>What's Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {includes.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Contact Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Interesse?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Neem contact op voor meer informatie over deze training.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md"
                >
                  Contact opnemen
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingLayout;
