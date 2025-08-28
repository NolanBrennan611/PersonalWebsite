import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Card = ({ id, title, subtitle, image, altTag }) => {
    const cardRef = useRef();

    useGSAP(() => {
        const container = cardRef.current;
        const glare = container?.querySelector('.glare');

        gsap.set(container, {
            transformStyle: "preserve-3d",
            transformPerspective: 1000
        });

        let isHovering = false;

        const handleMouseEnter = () => {
            isHovering = true;
        };

        const handleMouseMove = (e) => {
            if (!isHovering) return;

            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const { offsetWidth: w, offsetHeight: h } = container;

            const centerX = w / 2;
            const centerY = h / 2;

            // 2.5D tilt
            const rotateY = ((x - centerX) / centerX) * 8;
            const rotateX = -((y - centerY) / centerY) * 8;


            gsap.to(container, {
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

        const handleMouseLeave = () => {
            isHovering = false;

            gsap.killTweensOf([container, glare]);

            gsap.to(container, {
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

        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        // Cleanup function (if using React)
        return () => {
            container.removeEventListener("mouseenter", handleMouseEnter);
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
            gsap.killTweensOf([container, glare]);
        };
    }, { scope: cardRef });

    return (
        <div className={`${ id }-card drop-shadow education-card`} ref={ cardRef }>
            <div className="glare"></div>
            <img className="education-icon" src={ image }
                 alt={ altTag } />
            <h1 className="col-center">{ title }</h1>
            <h2 className="col-center">{ subtitle }</h2>
        </div>
    )
}
export default Card
