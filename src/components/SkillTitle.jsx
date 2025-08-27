import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

const SkillTitle = () => {
    useGSAP(() => {
        document.fonts.ready.then(() => {
            const firstTextSplit = SplitText.create(".first-text-split h1", {
                type: "chars"
            })
            const secondTextSplit = SplitText.create(".second-text-split h1", {
                type: "chars"
            })

            gsap.from(firstTextSplit.chars, {
                yPercent: 200,
                stagger: 0.02,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: ".technical-skill-section",
                    start: "top 30%",
                },
            });

            gsap.to(".text-scroll", {
                duration: 1,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                scrollTrigger: {
                    trigger: ".technical-skill-section",
                    start: "top 10%",
                },
            });

            gsap.from(secondTextSplit.chars, {
                yPercent: 200,
                stagger: 0.02,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: ".technical-skill-section",
                    start: "top 1%",
                },
            });
        })
    });

    return (
        <div className="general-title col-center h-full xl:gap-16 gap-8">
            <div className="2xl:py-0 py-3 first-text-split">
                <h1 className="text-shadow-silver-lg">Current</h1>
            </div>
            <div style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }} className="text-scroll">
                <div className="pb-5 2xl:pt-0 pt-3 2xl:px-5 px-3">
                    <h2 className="text-shadow-silver-lg">Technical</h2>
                </div>
            </div>
            <div className="2xl:py-0 py-3 second-text-split">
                <h1 className="text-shadow-silver-lg">skills</h1>
            </div>
        </div>
    )
}
export default SkillTitle;
