import { useRef } from 'react'
import { skillCards } from "../constants/index.js";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const SkillSlider = () => {
    const sliderRef = useRef();
    const cardTimelines = useRef(new Map());
    const openCardRef = useRef(null);

    const isLargeScreen = useMediaQuery({
        query: "(min-width: 1024px)",
    });

    useGSAP(() => {
        const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

        if (isLargeScreen) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".technical-skill-section",
                    start: "2% top",
                    end: `+=${ scrollAmount + 1500 }px`,
                    scrub: true,
                    pin: true,
                },
            });

            tl.to(".technical-skill-section", {
                x: `-${ scrollAmount + 2000 }px`,
                ease: "power1.inOut",
            });

            const titleTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".technical-skill-section",
                    start: "top top",
                    end: "bottom 80%",
                    scrub: true,
                },
            });

            titleTl
                .to(".first-text-split", {
                    xPercent: -22,  // Title moves independently too
                    ease: "power1.inOut",
                })
                .to(".text-scroll", {
                    xPercent: -30,
                    ease: "power1.inOut",
                }, "<")
                .to(".second-text-split", {
                    xPercent: -10,
                    ease: "power1.inOut",
                }, "<")
                .to(".rounded-arrow-container", {
                    clipPath: "polygon(-20% -20%, 120% -20%, 120% 120%, -20% 120%)",
                });
        }

        // Set up 3D transforms for containers
        gsap.set(".card-container", {
            transformStyle: "preserve-3d",
            transformPerspective: 1000
        });

        // Set up 3D transforms for individual cards
        gsap.set(".card-front, .card-back", {
            transformStyle: "preserve-3d",
            transformOrigin: "50% 50%",
            backfaceVisibility: "hidden"
        });

        // Position back cards (rotated 180 degrees initially)
        gsap.set(".card-back", {
            rotationY: 180
        });

        const timing = 0.8;

        // Create animations for each card
        const containers = gsap.utils.toArray(".card-container");

        containers.forEach((container) => {
            const cardFront = container.querySelector('.card-front');
            const cardBack = container.querySelector('.card-back');
            const flipTl = gsap.timeline({ paused: true });

            cardTimelines.current.set(container, flipTl);

            flipTl.to([cardFront, cardBack], {
                rotationY: "+=180",
                duration: 1,
                ease: "power2.inOut"
            });

            flipTl.to(container, {
                width: "720px",
                height: "480px",
                duration: timing * 0.3,
                ease: "power2.out"
            }, timing * 0.3)


            flipTl.to(container, {
                z: 200,
                duration: timing/2,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            }, 0);

            const handleClick = () => {
                if (flipTl.progress() === 0) {
                    if (openCardRef.current && openCardRef.current !== container) {
                        const previousTimeline = cardTimelines.current.get(openCardRef.current);
                        previousTimeline.reverse();
                    }

                    openCardRef.current = container;
                    flipTl.play();
                } else {
                    flipTl.reverse();
                    openCardRef.current = null;
                }
            };

            container.addEventListener("click", handleClick);
        });

    }, { dependencies: [isLargeScreen], revertOnUpdate: true });

    return (
        <div ref={ sliderRef } className="slider-wrapper">
            <div className="rounded-arrow-container absolute top-35 -translate-x-10" style={{ clipPath: "polygon(-20% -20%, -20% -20%, -20% 120%, -20% 120%)" }}>
                <div className="rotate-10 -translate-y-3 translate-x-6 text-medium-gray text-shadow-medium-gray-sm">tap on a card!</div>
                <span><img className="rotate-10" src="/images/rounded-arrow.png" alt="Rounded arrow" /></span>
            </div>
            <div className="skill-cards-container">
                { skillCards.map(({ name, usage, logo, backgroundGradient }) => (
                    <div className="card-container" key={ name } id={ name } >
                        <div
                            className="card-front drop-shadow"
                            style={{ background: "linear-gradient(#0A0A0A 0%, #303030 100%)" }}
                        >
                            <img
                                src={ logo }
                                alt={`${ name } logo`}
                                className="w-16 h-16 md:w-32 md:h-32 object-contain rounded-lg"
                            />
                        </div>
                        <div className="card-back drop-shadow" style={{ background: backgroundGradient }}>
                            <div className="card-back-description">
                                <h1 className="text-shadow-silver-md">{ name }</h1>
                                <br />
                                <p>{ usage }</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SkillSlider
