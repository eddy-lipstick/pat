import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scale, Paintbrush, Code, ArrowRight } from "lucide-react";

const DisciplineCard = ({ icon: Icon, title, description, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      rotate: Math.random() * 10 - 5,
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
          <Icon className="w-6 h-6 text-purple-300" />
        </div>
        <div>
          <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

const PartnerLogo = ({ name, index }) => {
  const logoRef = useRef(null);

  useEffect(() => {
    gsap.from(logoRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      delay: index * 0.1,
      scrollTrigger: {
        trigger: logoRef.current,
        start: "top bottom-=50",
        toggleActions: "play none none reverse",
      },
    });
  }, [index]);

  return (
    <div
      ref={logoRef}
      className="bg-white/5 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
    >
      <div className="w-24 h-8 flex items-center justify-center text-gray-400 text-sm">
        {name}
      </div>
    </div>
  );
};

const OurFormula = () => {
  useEffect(() => {
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

  const partners = [
    "Partner 1",
    "Partner 2",
    "Partner 3",
    "Partner 4",
    "Partner 5",
    "Partner 6",
    "Partner 7",
    "Partner 8",
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Central content */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Onze formule
            </h2>
            <h3 className="text-2xl font-semibold mb-4 text-gray-300">
              Juristen, ontwerpers en techneuten
            </h3>
            <p className="text-lg text-gray-300 mb-8">
              Ons team bestaat uit een unieke mix van mensen, die samenwerken om
              juridische complexiteit om te zetten in heldere, toegankelijke en
              overtuigende communicatie.
            </p>
            <a
              href="/team"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
            >
              <span className="text-lg">Lees meer over ons team</span>
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Discipline cards in triangular formation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {disciplines.map((discipline, index) => (
              <DisciplineCard key={index} {...discipline} index={index} />
            ))}
          </div>

          {/* Partners section */}
          <div className="text-center mb-16">
            <h3 className="text-2xl font-semibold text-white mb-2">
              Onze partners
            </h3>
            <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
              We werken samen met toonaangevende organisaties die onze visie op
              innovatieve juridische communicatie delen.
            </p>

            {/* Partner logo grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {partners.map((partner, index) => (
                <PartnerLogo key={index} name={partner} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurFormula;
