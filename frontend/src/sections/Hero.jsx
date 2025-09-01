import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Wisp from "../components/Wisp.jsx";
import ChatBot from "../components/ChatBot.jsx";

const Hero = ({ ws }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => setIsChatOpen(!isChatOpen);

    useGSAP(() => {
        const heroStickTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                endTrigger: ".technical-skill-section",
                end: "top top",
                scrub: true,
                pin: true,
                pinSpacing: false,
            }
        })
    })

    return (
        <section className="hero-section">
            <Wisp />
            <div className="hero-container">
                <div className="hero-content">
                    <div className="main-titles overflow-hidden">
                        <h1 className="hero-title drop-shadow">Nolan Brennan</h1>
                        <h3 className="hero-subtitle drop-shadow">Full-Stack Developer</h3>
                    </div>
                    <div className="tag-lines">
                        <h3 className="first-tag-line drop-shadow">Always on the initiative</h3>
                        <h3 className="second-tag-line drop-shadow">Strong communication</h3>
                        <h3 className="third-tag-line drop-shadow">Quick to a solution</h3>
                    </div>
                    {
                        isChatOpen ? (
                             <ChatBot ws={ ws } toggleChat={ toggleChat } />
                            )
                            : (
                                <div className="long-arrow-container">
                                    <img className="headshot" src="/images/Headshot.png" alt="headshot"/>
                                    <h4 className="question-title drop-shadow">have a quick question?</h4>
                                    <img className="long-arrow" src="/images/LongArrow.png" alt="long arrow" />
                                    <a className="chat-button drop-shadow" onClick={ toggleChat }>?</a>
                                </div>
                            )
                    }

                </div>
            </div>
        </section>
    )
}
export default Hero
