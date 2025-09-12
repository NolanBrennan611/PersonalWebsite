import { projects } from "../constants"
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useTitle } from "../hooks/useTitle";

const Projects = () => {
    const rowTitles = ["Technical Projects", "Family Projects", "Music Projects"]
    const cardRefs = useRef([]);

    useTitle("Projects | Nolan Brennan");

    useGSAP(() => {
        cardRefs.current.forEach((cardElement) => {
            if (!cardElement) return;

            const hoverText = cardElement.querySelector(".hover-text");
            const projectContent = cardElement.querySelector(".project-content");

            if (!hoverText || !projectContent) return;

            const tl = gsap.timeline({
                paused: true,
                reversed: true,
            });

            gsap.set(hoverText, {
                clipPath: "circle(0% at 50% 50%)"
            });

            gsap.set(projectContent, {
                clipPath: "circle(100% at 50% 50%)"
            });

            tl
            .to(projectContent, {
                clipPath: "circle(0% at 50% 50%)",
                duration: 0.2,
            })
            .to(hoverText, {
                clipPath: "circle(100% at 50% 50%)",
                duration: 0.2,
            });

            cardElement.addEventListener('mouseover', () => tl.play());
            cardElement.addEventListener('mouseleave', () => tl.reverse());
        });
    });

    const getCumulativeIndex = (rowIndex, projectIndex) => {
        let index = 0;
        for (let i = 0; i < rowIndex; i++) {
            index += projects[i].length;
        }
        return index + projectIndex;
    };

    return (
        <section className="projects-section">
            <div className="projects-container">
                {projects.map((row, rowIndex) => (
                    <div key={ rowIndex }>
                        <h2 className="row-titles">{`${ rowTitles[rowIndex] }`}</h2>
                        <div  className="project-row">
                            {row.map((project, projectIndex) => {
                                const uniqueIndex = getCumulativeIndex(rowIndex, projectIndex);
                                return (
                                    <Link
                                        ref={(el) => cardRefs.current[uniqueIndex] = el}
                                        to={project.link}
                                        key={projectIndex}
                                        className={`project-card col-center drop-shadow ${project.skillImages.includes("images/construction.png") ? "pointer-events-none" : "cursor-pointer"}`}
                                    >
                                        {
                                            !project.skillImages.includes("images/construction.png") && (
                                                <div className="hover-text absolute col-center text-xl text-shadow-silver-md">
                                                    <h1>View Details</h1>
                                                </div>
                                            )
                                        }
                                        <div className="project-content col-center">
                                            <h3 className="project-title">{project.name}</h3>
                                            <div className="skill-images">
                                                {project.skillImages.map((skillImage, i) => (
                                                    <img src={`${skillImage}`} key={i} alt="skill icon" />
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/" className="home-button">Go Home</Link>
        </section>
    )
}

export default Projects;
