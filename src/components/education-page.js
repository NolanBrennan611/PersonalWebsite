import "../styles/education-page.css";
import "../styles/images.css";
import { Card } from "./card";
import microsoftLogo from "../images/microsoftlogo.svg";
import universityLogo from "../images/universitylogo.svg";
import codingDojoLogo from "../images/codingdojologo.svg";

export function EducationPage() {
    return (
        <div className="education-wrapper">
            <div className="education-container">
                <h1 id="education-page-title">Education</h1>
                <div id="card-container">
                    <Card width={"20vw"} height={"45vh"} xRotation={"15deg"} yRotation={"2deg"} still glareOn>
                        <img className="education-icon" id="microsoft-logo" src={microsoftLogo} alt="Microsoft Logo"/>
                        <h5>C# Certification Microsoft</h5>
                    </Card>
                    <Card width={"30vw"} height={"60vh"} glareOn>
                        <img className="education-icon" id="university-logo" src={universityLogo} alt="University of Winnipeg Logo"/>
                        <h4>Bachelor of Honours ACS</h4>
                        <h5>University of Winnipeg</h5>
                    </Card>
                    <Card width={"20vw"} height={"45vh"} xRotation={"-15deg"} yRotation={"2deg"} still glareOn>
                        <img className="education-icon" id="coding-dojo-logo" src={codingDojoLogo} alt="Coding Dojo Logo"/>
                        <h5 id="coding-dojo-title">Development Black Belts Coding Dojo</h5>
                    </Card>
                </div>
            </div>
        </div>
    );
} 