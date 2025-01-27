import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const VennDiagram = () => {
    const containerRef = useRef(null);
    const lawGroupRef = useRef(null);
    const designGroupRef = useRef(null);
    const techGroupRef = useRef(null);
    const intersectionTextRef = useRef(null);

    useEffect(() => {
        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        // Initial positions (more spread apart)
        const initialPositions = {
            law: { x: -180, y: 50 },
            design: { x: 180, y: 50 },
            tech: { x: 0, y: -150 }
        };

        // Overlapped positions (less overlap for clearer Venn shape)
        const overlappedPositions = {
            law: { x: -100, y: 20 },
            design: { x: 100, y: 20 },
            tech: { x: 0, y: -90 }
        };

        // Create the scroll-triggered animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 90%",
                end: "bottom center",
                scrub: 1,
                markers: false,
            }
        });

        // Animate circle groups (circles with their labels)
        tl.fromTo([lawGroupRef.current, designGroupRef.current, techGroupRef.current],
            {
                x: (i) => i === 0 ? initialPositions.law.x : i === 1 ? initialPositions.design.x : initialPositions.tech.x,
                y: (i) => i === 0 ? initialPositions.law.y : i === 1 ? initialPositions.design.y : initialPositions.tech.y,
                opacity: 0.5
            },
            {
                x: (i) => i === 0 ? overlappedPositions.law.x : i === 1 ? overlappedPositions.design.x : overlappedPositions.tech.x,
                y: (i) => i === 0 ? overlappedPositions.law.y : i === 1 ? overlappedPositions.design.y : overlappedPositions.tech.y,
                opacity: 0.7,
                duration: 1
            }
        );

        // Animate intersection text
        tl.fromTo(intersectionTextRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 },
            0.5
        );

        return () => {
            if (tl.scrollTrigger) {
                tl.scrollTrigger.kill();
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-[800px] flex items-center justify-center">
            <svg viewBox="0 0 500 400" className="w-full max-w-3xl">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Base position at center */}
                <g transform="translate(250, 200)">
                    {/* Law Circle Group */}
                    <g ref={lawGroupRef}>
                        <circle
                            r="100"
                            className="fill-primary-200/30 stroke-primary-200 stroke-[0.5]"
                            filter="url(#softGlow)"
                        />
                        <text
                            className="text-lg font-bold fill-white text-center select-none"
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            Law
                        </text>
                    </g>

                    {/* Design Circle Group */}
                    <g ref={designGroupRef}>
                        <circle
                            r="100"
                            className="fill-primary-200/30 stroke-primary-200 stroke-[0.5]"
                            filter="url(#softGlow)"
                        />
                        <text
                            className="text-lg font-bold fill-white text-center select-none"
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            Design
                        </text>
                    </g>

                    {/* Tech Circle Group */}
                    <g ref={techGroupRef}>
                        <circle
                            r="100"
                            className="fill-primary-200/30 stroke-primary-200 stroke-[0.5]"
                            filter="url(#softGlow)"
                        />
                        <text
                            className="text-lg font-bold fill-white text-center select-none"
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            Tech
                        </text>
                    </g>

                    {/* Center Logo */}
                    <g
                        ref={intersectionTextRef}
                        className="opacity-0"
                        transform="translate(-24, -1) scale(0.4)"
                    >
                        <path
                            d="M0 26H3.56543V19.7264C3.56543 19.0796 3.50176 17.4303 3.46993 16.3632H3.50176C4.17028 18.4328 6.20766 19.8557 9.32741 19.8557C13.8479 19.8557 16.7129 16.4925 16.7129 11.3184C16.7129 6.5 13.8797 3.36318 9.39108 3.36318C6.27133 3.36318 4.17028 4.91542 3.53359 7.3408H3.50176L3.56543 3.62189H0V26ZM8.62706 16.8806C5.57098 16.8806 3.56543 15.1343 3.56543 12.4179V11.5771C3.6291 8.37562 5.60281 6.33831 8.56339 6.33831C11.3966 6.33831 13.1475 8.34328 13.1475 11.4154C13.1475 14.7463 11.3648 16.8806 8.62706 16.8806Z"
                            fill="#C8C3F0" />
                        <path
                            d="M24.5317 19.8557C28.0016 19.8557 29.8799 18.4328 30.3892 16.0721H30.421C30.421 17.3657 30.3255 18.8209 30.2619 19.597H33.8273V9.86318C33.8273 5.6592 31.0259 3.36318 26.2508 3.36318C21.7621 3.36318 19.0244 5.27114 19.0244 8.47264C19.0244 8.76368 19.0562 9.18408 19.0881 9.41045H22.367C22.3352 9.15174 22.3352 8.89304 22.3352 8.79602C22.3352 7.01741 23.704 6.0796 26.1234 6.0796C28.893 6.0796 30.2619 7.14676 30.2619 9.5398V10.6716H24.4362C20.2341 10.6716 18.5469 12.5796 18.5469 15.005C18.5469 18.1095 20.9344 19.8557 24.5317 19.8557ZM25.2639 17.1393C23.0992 17.1393 21.8258 16.2985 21.8258 14.8433C21.8258 13.5821 22.7172 12.8706 24.7546 12.8706H30.2619V13.1617C30.2619 15.6194 28.3518 17.1393 25.2639 17.1393Z"
                            fill="#C8C3F0" />
                        <path
                            d="M44.2448 19.791C45.55 19.791 46.6323 19.5647 47.1099 19.403V16.5249C46.6642 16.6542 45.6455 16.8159 44.7541 16.8159C42.5894 16.8159 41.8254 15.7811 41.8254 13.7114V6.56468H47.2372V3.62189H41.8254V0H38.8648L38.7056 2.39303C38.6101 3.29851 38.3873 3.62189 37.7824 3.62189H35.7769V6.56468H38.26V13.9055C38.26 17.4303 39.9472 19.791 44.2448 19.791Z"
                            fill="#C8C3F0" />
                        <path
                            d="M50.0806 19.597H53.6461V12.6119C53.6461 8.79602 55.3333 6.46766 58.0392 6.46766C60.1402 6.46766 61.1589 7.72885 61.1589 10.4129C61.1589 11.1567 61.0953 11.9652 61.0316 12.5796H64.2787C64.3423 11.9005 64.4378 10.607 64.4378 9.60448C64.4378 5.62687 62.5596 3.36318 59.1534 3.36318C55.9063 3.36318 54.2827 5.33582 53.5506 8.21393H53.5187L53.6461 3.62189H50.0806V19.597Z"
                            fill="#C8C3F0" />
                        <path
                            d="M75.2256 19.8557C80.2554 19.8557 83.4707 16.7189 83.4707 11.6418C83.4707 6.53234 80.2554 3.36318 75.2256 3.36318C70.2277 3.36318 67.0124 6.53234 67.0124 11.6418C67.0124 16.7189 70.2277 19.8557 75.2256 19.8557ZM75.2256 16.8806C72.3287 16.8806 70.5779 14.8756 70.5779 11.6418C70.5779 8.37562 72.3287 6.33831 75.2256 6.33831C78.1225 6.33831 79.9053 8.37562 79.9053 11.6418C79.9053 14.8756 78.1225 16.8806 75.2256 16.8806Z"
                            fill="#C8C3F0" />
                        <path
                            d="M94.2515 19.8557C99.2813 19.8557 102.497 16.7189 102.497 11.6418C102.497 6.53234 99.2813 3.36318 94.2515 3.36318C89.2536 3.36318 86.0383 6.53234 86.0383 11.6418C86.0383 16.7189 89.2536 19.8557 94.2515 19.8557ZM94.2515 16.8806C91.3546 16.8806 89.6038 14.8756 89.6038 11.6418C89.6038 8.37562 91.3546 6.33831 94.2515 6.33831C97.1485 6.33831 98.9312 8.37562 98.9312 11.6418C98.9312 14.8756 97.1485 16.8806 94.2515 16.8806Z"
                            fill="#C8C3F0" />
                        <path
                            d="M105.542 19.597H109.107V11.8682C109.107 8.37562 111.081 6.46766 114.201 6.46766C117.034 6.46766 118.435 7.89054 118.435 10.4129V19.597H122V9.60448C122 5.6592 119.549 3.36318 115.569 3.36318C111.909 3.36318 109.871 5.01244 109.012 7.89055H108.98L109.107 3.62189H105.542V19.597Z"
                            fill="#C8C3F0" />
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default VennDiagram;