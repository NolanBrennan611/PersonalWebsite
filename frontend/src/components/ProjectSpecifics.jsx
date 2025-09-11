import { projectDetails } from "../constants"
import { Navigate, useNavigate, useParams, Link } from "react-router-dom"
import { useTitle } from "../hooks/useTitle.js";

const ProjectSpecifics = () => {
    const { projectId } = useParams();
    const project = projectDetails.find(p => p.projectId === projectId);
    const navigate = useNavigate();

    useTitle(`${ project.projectName } | Nolan Brennan`);

    const handleClick = (e) => {
        e.preventDefault();
        navigate(-1);
    }

    return (
        <section className="project-specifics col-center">
            {project ? (
                <div className="project-wrapper">
                    <div className="project-container">
                        <h3 className="project-detail-title col-center text-shadow-silver-md">{ project.projectName }</h3>
                        <video src={`${ project.src }`} playsInline muted loop className="project-preview"></video>
                        <p className="project-details">{ project.details }</p>
                        <a className="project-external-link col-center" href={`${ project.link }`}>View Project</a>
                    </div>
                    <div className="col-center m-5">
                        <a onClick={handleClick} className="p-4 border-1 rounded-xl transition-colors duration-300 ease-in-out hover:bg-gradient-to-br hover:from-transparent hover:from-40% hover:to-silver">Go Back</a>
                    </div>
                </div>

            ) : (
                <Navigate to="/projects" replace />
            )}
        </section>
    )
}

export default ProjectSpecifics;
