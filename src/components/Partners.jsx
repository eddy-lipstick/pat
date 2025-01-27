import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const Partners = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        gsap.registerPlugin(ScrollTrigger);
    }, []);

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

    if (!isClient) {
        return null;
    }

    return (
        <div className="w-full py-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
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

export default Partners;