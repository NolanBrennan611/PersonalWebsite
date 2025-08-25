import { useState } from "react";

const Hero = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => setIsChatOpen(!isChatOpen);

    return (
        <section>
            <div className="hero-container">
                <div className="hero-content">
                    <div className="main-titles overflow-hidden">
                        <h1 className="hero-title">Nolan Brennan</h1>
                        <h3 className="hero-subtitle">Full-Stack Developer</h3>
                    </div>
                    <div className="tag-lines">
                        <h3 className="first-tag-line">Always on the initiative</h3>
                        <h3 className="second-tag-line">Strong communication</h3>
                        <h3 className="third-tag-line">Quick to a solution</h3>
                    </div>
                    <div className="long-arrow-container">
                        <img className="headshot" src="/images/Headshot.png" alt="headshot"/>
                        <h4 className="question-title">have a quick question?</h4>
                        <img className="long-arrow" src="/images/LongArrow.png" alt="long arrow" />
                        <a className="chat-button" onClick={ toggleChat }>?</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Hero
