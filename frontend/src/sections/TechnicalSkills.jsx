import SkillSlider from "../components/SkillSlider.jsx";
import SkillTitle from "../components/SkillTitle.jsx";

const TechnicalSkills = () => {
    return (
        <section className="technical-skill-section">
            <div className="h-full flex lg:flex-row flex-col items-center relative">
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
