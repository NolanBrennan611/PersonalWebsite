import { projectDetails } from "../constants"
import { useParams } from "react-router-dom"

const ProjectSpecifics = () => {
    const { projectId } = useParams();
    const project = projectDetails.find(p => p.projectId === projectId);

    return (
        <section className="project-specifics">
            <h2>Project Details</h2>
            {project ? (
                <div>
                    <h3>{ project.projectName }</h3>
                    <p>{ project.details }</p>
                </div>
            ) : (
                <p>Project not found</p>
            )}
        </section>
    )
}

export default ProjectSpecifics;