import { projects } from "../constants"
import { Link } from 'react-router-dom';

const Projects = () => {
    return (
        <section className="projects-section">
            <h2>My Projects</h2>
            <div className="projects-container">
                {projects.map(({ name, description, skills, link }) => (
                    <div key={name} className="project-card">
                        <h3>{name}</h3>
                        <p>{description}</p>
                        <p>Skills: {skills.join(", ")}</p>
                        <Link to={link}>View Project</Link>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Projects;