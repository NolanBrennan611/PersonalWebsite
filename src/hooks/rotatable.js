import { useEffect, useState } from "react";
import { gsap } from "gsap";

export function useRotation(card, glare) {
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {

        const handleMouseEnter = () => setIsHovering(true);

        const handleMouseLeave = () => {
            setIsHovering(false);
            gsap.killTweensOf(glare);

            gsap.to(card, {
                duration: 0.5,
                rotateY: 0,
                rotateX: 0,
                ease: "power1.out"
            });

            gsap.to(glare, {
                duration: 0.5,
                opacity: 0,
                ease: "power1.out"
            });
        };

        const handleMouseMove = (e) => {
            if (!isHovering) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const w = card.offsetWidth;
            const h = card.offsetHeight;

            const centerX = w / 2;
            const centerY = h / 2;

            const rotateY = ((x - centerX) / centerX) * 8;
            const rotateX = -((y - centerY) / centerY) * 8;

            gsap.to(card, {
                duration: 0.5,
                rotateY,
                rotateX,
                ease: "power1.out"
            });

            const glareX = -rotateY * 10 + centerX;
            const glareY = rotateX * 10 + centerY;

            gsap.to(glare, {
                duration: 1,
                opacity: 1,
                x: glareX - 100,
                y: glareY - 100,
                ease: "power1.out"
            });
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            card.removeEventListener("mouseenter", handleMouseEnter);
            card.removeEventListener("mousemove", handleMouseMove);
            card.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [isHovering, card, glare]);
}
