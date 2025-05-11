// RotatingCard.jsx
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import "../styles/card.css";

export function Card({children, width, height, still=false, glareOn=false, xRotation=0, yRotation=0}) {
    const cardRef = useRef(null);
    const glareRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const card = cardRef.current;
        const glare = glareRef.current;

        if(still) {
            gsap.to(card, {
                duration: 0.5,
                rotateY: xRotation,
                rotateX: yRotation,
                ease: "power1.out"
            });
            return;
        }

        const handleMouseEnter = () => setIsHovering(true);

        const handleMouseLeave = () => {
            setIsHovering(false);
            gsap.killTweensOf(glare);

            if(!still) {
                gsap.to(card, {
                    duration: 0.5,
                    rotateY: 0,
                    rotateX: 0,
                    ease: "power1.out"
                });
            }

            if(glareOn && !still) {
                gsap.to(glare, {
                    duration: 0.5,
                    opacity: 0,
                    ease: "power1.out"
                });
            }
        };

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const w = card.offsetWidth;
            const h = card.offsetHeight;

            const centerX = w / 2;
            const centerY = h / 2;

            const rotateY = ((x - centerX) / centerX) * 8;
            const rotateX = -((y - centerY) / centerY) * 8;
            if(!still) {
                gsap.to(card, {
                    duration: 0.5,
                    rotateY: still ? xRotation : rotateY,
                    rotateX: still ? yRotation : rotateX,
                    ease: "power1.out"
                });
            }

            if(glareOn && !still) {
                const glareX = -rotateY * 10 + centerX;
                const glareY = rotateX * 10 + centerY;

                gsap.to(glare, {
                    duration: 1,
                    opacity: 1,
                    x: glareX - 100,
                    y: glareY - 100,
                    ease: "power1.out"
                });
            } else if(glareOn){
                gsap.to(glare, {
                    duration: 1,
                    opacity: 1,
                    x: xRotation,
                    y: yRotation
                })
            }
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            card.removeEventListener("mouseenter", handleMouseEnter);
            card.removeEventListener("mousemove", handleMouseMove);
            card.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [isHovering, still, glareOn, xRotation, yRotation]);

    return (
        <div className="card-container">
            <div
                className="card"
                ref={cardRef}
                style={{
                    width: width,
                    height: height,
                    rotateX: xRotation,
                    rotateY: yRotation
            }}>
                <div className="glare" ref={glareRef}></div>
                <div className="card-content">{children}</div>
            </div>
        </div>
    );
}