import React from 'react';
import { Card } from '@/components/ui/card';

const AboutNameCard = ({ lang }) => {
  const content = {
    en: {
      title: 'Our name',
      text: 'Our name, Patroon [pah·trohn], comes from the Dutch language and carries two meaningful interpretations: Pattern — representing our structured, systematic approach to legal design and communication. Patroon — a traditional Dutch legal term referring to the collaborative relationship between experienced and junior lawyers, reflecting our belief in making law more accessible through partnership. This dual meaning captures our essence: combining creative, systematic design with legal expertise to create more accessible and human-centered legal communication.',
    },
    nl: {
      title: 'Onze naam',
      text: 'De naam Patroon verwijst naar twee betekenissen die ons werk kenmerken: een systematische ordening die structuur en helderheid brengt en een historische term uit de advocatuur die staat voor kennisdeling en samenwerking. Deze naam weerspiegelt hoe wij creativiteit en juridische expertise samenbrengen.',
    },
  };

  const { title, text } = content[lang];

  return (
    <div className="relative w-fit max-w-2xl my-12">
      <Card className="bg-surface-1 hover:bg-surface-2 transition-all duration-300 transform hover:-translate-y-1">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-3 h-3 rounded-full bg-feitlijn-purple mt-2 flex-shrink-0" />

            <div className="space-y-3">
              <h3 className="text-xl font-roc-grotesk text-primary">{title}</h3>
              <p className="text-text-secondary leading-relaxed">{text}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="absolute -z-10 w-full h-full top-2 left-2 bg-feitlijn-purple/10 rounded-lg" />
    </div>
  );
};

export default AboutNameCard;
