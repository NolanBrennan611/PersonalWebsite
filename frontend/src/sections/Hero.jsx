import {useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Wisp from "../components/Wisp.jsx";
import ChatBot from "../components/ChatBot.jsx";
import { useMediaQuery } from "react-responsive";
import { useTitle } from "../hooks/useTitle.js";

const Hero = ({ ws }) => {
    const arrowContainerRef = useRef(null);
    const chatBotRef = useRef(null);
    const closeChatBotRef = useRef(null);
    const openChatBotRef = useRef(null);

    // for returning to home from inner pages
    useTitle("Home | Nolan Brennan");

    const isTablet = useMediaQuery({
        query: "(max-width: 768px)",
    })

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

        const navItemTween = gsap.timeline({
            paused: true,
            reversed: true,
        })

        const flipAnimation = () => {
            if(navItemTween.reversed()) {
                if(isTablet){
                    gsap.set(".navbar" ,{
                        zIndex: 0
                    })
                }
                navItemTween.play();
            } else {
                if(isTablet){
                    gsap.set(".navbar" ,{
                        zIndex: 9
                    })
                }
                navItemTween.reverse();
            }
        }

        gsap.set(arrowContainerRef.current.children, {
            opacity: 1,
            y: 0,
        })

        gsap.set(arrowContainerRef.current, {
            visibility: "visible",
        })

        gsap.set(chatBotRef.current, {
            visibility: "hidden",
            opacity: 0,
            y: 50
        });

        navItemTween
            .to(arrowContainerRef.current.children, {
                opacity: 0,
                y: 50,
            })
            .to(arrowContainerRef.current, {
                visibility: "hidden",
            })
            .to(chatBotRef.current, {
                visibility: "visible",
                opacity: 1,
                y: 0
            })

        openChatBotRef.current.addEventListener("click", flipAnimation);
        closeChatBotRef.current.addEventListener("click", flipAnimation);
    });

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

                    <div >
                        <ChatBot ws={ ws } chatBotRef={ chatBotRef } closeChatBotRef={ closeChatBotRef } />
                        <div ref={ arrowContainerRef } className="long-arrow-container">
                            <img className="headshot" src="/images/Headshot.png" alt="headshot"/>
                            <h4 className="question-title drop-shadow">have a quick question?</h4>
                            <img className="long-arrow" src="/images/LongArrow.png" alt="long arrow" />
                            <a ref={ openChatBotRef } className="chat-button drop-shadow"><span>?</span></a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
export default Hero
