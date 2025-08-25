import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { skillCards } from "../constants/index.js";

const TechnicalSkills = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
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
            const tl = gsap.timeline({ paused: true });

            tl.to([cardFront, cardBack], {
                rotationY: "+=180",
                duration: 1,
                ease: "power2.inOut"
            });

            tl.to(container, {
                width: "540px",
                height: "360px",
                duration: timing * 0.3,
                ease: "power2.out"
            }, timing * 0.3)
                .to(container, {
                    width: "540px",
                    height: "360px",
                    duration: timing * 0.4,
                    ease: "none"
                })

            tl.to(container, {
                z: 200,
                duration: timing/2,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            }, 0);

            // Add click event listener
            const handleClick = () => {
                if (tl.progress() === 0) {
                    tl.play();
                } else {
                    tl.reverse();
                }
            };

            container.addEventListener("click", handleClick);
        });

    });

    return (
        <section>
            <div className="technical-skill-container">
                { skillCards.map(skill => (
                    <div className="card-container" key={skill.name} id={skill.name} >
                        <div
                            className="card-front"
                            style={{ background: "linear-gradient(#0A0A0A 0%, #303030 100%)" }}
                        >
                            <img
                                src={skill.logo}
                                alt={`${skill.name} logo`}
                                className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-lg"
                                style={{ background: "linear-gradient(to top, #0A0A0A 0%, #303030 100%)" }}
                            />
                        </div>
                        <div className="card-back" style={{ background: skill.backgroundGradient }}>
                            <img
                                src={skill.logo}
                                alt={`${skill.name} logo`}
                                className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-lg"
                                style={{ background: "linear-gradient(to top, #0A0A0A 0%, #303030 100%)" }}
                            />
                            <div style={{ background: "linear-gradient(to top, #0A0A0A 0%, #303030 100%)" }}>
                                <h1>{ skill.name }</h1>
                                <p>{ skill.usage }</p>
                                <a href={ skill.experience }>{ skill.project }</a>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default TechnicalSkills
