import { projects } from "../constants"

const Projects = () => {
    const rowTitles = ["Technical Projects", "Family Projects", "Music Projects"]

    return (
        <section className="projects-section">
            <div className="projects-container">
                {projects.map((row, rowIndex) => (
                    <div key={ rowIndex }>
                        <h2 className="row-titles">{`${ rowTitles[rowIndex] }`}</h2>
                        <div  className="project-row">
                            {row.map((project, projectIndex) => (
                                <a href={ project.link } key={projectIndex} className="project-card col-center drop-shadow">
                                    <h3 className="project-title">{ project.name }</h3>
                                    <div className="skill-images">
                                        {
                                            project.skillImages.map((skillImage, i) => (
                                                <img src={`${ skillImage }`} key={ i } alt="skill icon" />
                                            ))
                                        }
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <a href="/">Go Home</a>
        </section>
    )
}

export default Projects;
