// src/components/CaseStudyMeta.jsx
import React from 'react';
import { CalendarDays, Tags, Link } from 'lucide-react';

const MetaItem = ({ icon, label, children }) => (
  <div className="p-6 space-y-1.5">
    <div className="flex items-center gap-2 text-sm">
      {icon}
      <span>{label}</span>
    </div>
    {children}
  </div>
);

const CaseStudyMeta = ({
  client,
  date,
  relatedSkills = [],
  website,
  translations = {},
  lang = 'nl',
}) => {
  // Debug: Log incoming props
  console.log('CaseStudyMeta props:', { translations, lang });

  // Use translations with more explicit default handling
  const t = {
    client: {
      label: translations?.client?.label || (lang === 'en' ? 'Client' : 'Opdrachtgever'),
    },
    date: {
      label: translations?.date?.label || (lang === 'en' ? 'Date' : 'Datum'),
    },
    services: {
      label: translations?.services?.label || (lang === 'en' ? 'Services' : 'Diensten'),
    },
    website: {
      label: translations?.website?.label || 'Website',
    },
  };

  // Debug: Log processed translations
  console.log('Processed translations:', t);

  return (
    <div className="w-full mb-8">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border/20">
          <MetaItem label={t.client.label}>
            <p className="font-medium">{client}</p>
          </MetaItem>

          <MetaItem icon={<CalendarDays className="w-4 h-4" />} label={t.date.label}>
            <p className="font-medium">{date}</p>
          </MetaItem>

          {relatedSkills && relatedSkills.length > 0 && (
            <MetaItem icon={<Tags className="w-4 h-4" />} label={t.services.label}>
              <div className="flex flex-wrap gap-2">
                {relatedSkills.map((skill, index) => (
                  <a
                    key={index}
                    href={`/${lang}/approach/${skill.toLowerCase().replace(/\s+/g, '-')}`}
                    className="transition-all duration-300 rounded-full px-2 py-0.5 text-xs bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    {skill}
                  </a>
                ))}
              </div>
            </MetaItem>
          )}

          {website && (
            <MetaItem icon={<Link className="w-4 h-4" />} label={t.website.label}>
              <a
                href={website.startsWith('http') ? website : `https://${website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-primary transition-colors"
              >
                {website}
              </a>
            </MetaItem>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyMeta;
