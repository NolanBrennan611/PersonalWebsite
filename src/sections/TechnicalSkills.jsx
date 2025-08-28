import SkillSlider from "../components/SkillSlider.jsx";
import SkillTitle from "../components/SkillTitle.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TechnicalSkills = () => {
    // useGSAP(() => {
    //     gsap.set(".technical-skill-section", {
    //         marginTop: "-140vh",
    //     })
    //
    //     const pinTl = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: ".technical-skill-section",
    //             start: "10% top",
    //             end: "200% top",
    //             scrub: 1.5,
    //             pin: true
    //         }
    //     })
    //
    //     pinTl.from(".technical-skill-container", {
    //         yPercent: 150,
    //         stagger: 0.2,
    //         ease: "power1.inOut"
    //     })
    // })

    return (
        <section className="technical-skill-section">
            <div className="technical-skill-container h-full flex lg:flex-row flex-col items-center relative">
                <div className="lg:w-[57%] flex-none h-80 lg:h-full md:mt-20 xl:mt-0">
                    <SkillTitle />
                </div>
                <div className="h-full">
                    <SkillSlider />
                </div>
            </div>
        </section>
    )
}

export default TechnicalSkills
