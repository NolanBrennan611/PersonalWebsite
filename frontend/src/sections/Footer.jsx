import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <section className="footer-section">
            <div className="links-container">
                <Link to="/projects/PersonalWebsite" className="about-website-link">
                    the creation process
                </Link>
                <Link to="/projects" className="other-projects-link">
                    other works here
                </Link>
                <div className="button-container col-center">
                    <div className="button-text col-center">back to the top?</div>
                    <a className="to-top-button">
                        &#8593;
                    </a>
                </div>
            </div>
            <div className="appreciation col-center">
                seriously, thanks for making it this far!
            </div>
            <hr className="breaker" />
            <div className="outward-links col-center">
                <h2>find me elsewhere</h2>
                <div>
                    <a href="https://www.linkedin.com/in/nolan-brennan-4196aa1b9" target="_blank">LinkedIn</a>
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                    <a href="https://github.com/NolanBrennan611" target="_blank">Github</a>
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                    <a href="https://codepen.io/NolanBrennan611/" target="_blank">Codepen</a>
                </div>
            </div>
        </section>
    )
}
export default Footer
