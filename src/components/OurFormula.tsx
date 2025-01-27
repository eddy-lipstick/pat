import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scale, Paintbrush, Code, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PulseLabel from "../components/PulseLabel";
import Partners from "./Partners";

const DisciplineCard = ({ icon: Icon, title, description, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: index * 0.2,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom-=100",
        end: "top center",
        toggleActions: "play none none reverse",
      },
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl transform hover:scale-105 transition-transform duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl"></div>
      <div className="relative flex flex-col items-start gap-4">
        <div className="p-3 bg-white/10 rounded-lg">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

const OurFormula = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  const disciplines = [
    {
      icon: Scale,
      title: "Juristen",
      description:
        "Vertalen complexe juridische materie naar begrijpelijke taal en waarborgen juridische correctheid.",
    },
    {
      icon: Paintbrush,
      title: "Ontwerpers",
      description:
        "Maken juridische informatie visueel aantrekkelijk en intuïtief begrijpelijk voor verschillende doelgroepen.",
    },
    {
      icon: Code,
      title: "Techneuten",
      description:
        "Bouwen digitale oplossingen die juridische communicatie interactief en toegankelijk maken.",
    },
  ];

  if (!isClient) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-background">
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="flex justify-center mb-4">
              <PulseLabel text="Onze formule" />
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-gray-300">
              Juristen, ontwerpers en techneuten
            </h3>
            <p className="text-lg text-gray-300 mb-8">
              Ons team bestaat uit een unieke mix van mensen, die samenwerken om
              juridische complexiteit om te zetten in heldere, toegankelijke en
              overtuigende communicatie.
            </p>
          </div>

          {/* Discipline cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {disciplines.map((discipline, index) => (
              <DisciplineCard key={index} {...discipline} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="default" asChild>
              <a href="/team" className="inline-flex items-center text-lg">
                Lees meer over ons team
                <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
          <Partners />
        </div>
      </div>
    </div>
  );
};

export default OurFormula;
