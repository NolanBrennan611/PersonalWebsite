import Card from "../components/Card";
import { educationList } from "../constants/index.js";

const Education = () => {
    return (
        <section className="education-section">
            <div className="education-title general-title col-center">
                Education
            </div>
            <div className="education-content">
                <div className="education-card-container">
                    {educationList.map(({ id, title, subtitle, image, altTag }) => (
                        <Card
                            key={ id }
                            id={ id }
                            title={ title }
                            subtitle={ subtitle }
                            image={ image }
                            altTag={ altTag }
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
export default Education
