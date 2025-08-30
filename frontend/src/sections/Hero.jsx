import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Wisp from "../components/Wisp.jsx";

const INITIAL_TEXTAREA_HEIGHT_PIXELS = 24;
const MAX_TEXTAREA_HEIGHT_PIXELS = 120;

const Hero = ({ ws }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => setIsChatOpen(!isChatOpen);

    const [ textAreaContent, setTextAreaContent ] = useState("");
    const [ , setTextAreaHeight ] = useState(INITIAL_TEXTAREA_HEIGHT_PIXELS);
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const textAreaRef = useRef(null); // Reference to the textarea

    const handleTextAreaOnChange = (e) => {
        setTextAreaContent(e.target.value);
        // Reset height before calculating new height
        e.target.style.height = "auto";
        let newHeight = Math.min(e.target.scrollHeight, MAX_TEXTAREA_HEIGHT_PIXELS);
        e.target.style.height = `${ newHeight }px`;
        setTextAreaHeight(newHeight);
    };

    const enterToSubmit = (e) => {
        if(e.key === "Enter" && !e.shiftKey) {
            handleSubmit(e);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting || textAreaContent.trim().length === 0) return;
        
        // Check if WebSocket is available and connected
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            console.error("WebSocket not connected. ReadyState:", ws?.readyState);
            return;
        }

        setIsSubmitting(true);
        
        try {
            console.log("Sending message:", textAreaContent); // Debug log
            ws.send(JSON.stringify({ message: textAreaContent, is_from_user: true }));
            setTextAreaContent("");
            if (textAreaRef.current) {
                textAreaRef.current.style.height = `${INITIAL_TEXTAREA_HEIGHT_PIXELS}px`;
            }
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

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
                            <div className="chatbot-container drop-shadow">
                                <div className="flex justify-end items-center p-10 border-b border-gray-200 z-10">
                                    <a onClick={ toggleChat } className="cursor-pointer text-xl">X</a>
                                </div>
                                <div className="messages scrollbar-custom">
                                    <div className="user bg-blue-message">If the text is a single line within a container of fixed height, setting the line-height of the text element to be equal to the height of its parent container will center the text vertically.</div>
                                    <div className="bot bg-orange-message">Hi</div>
                                    <div className="user bg-blue-message">If the text is a single line within a container of fixed height, setting the line-height of the text element to be equal to the height of its parent container will center the text vertically.</div>
                                    <div className="bot bg-orange-message">Hi</div>
                                    <div className="user bg-blue-message">If the text is a single line within a container of fixed height, setting the line-height of the text element to be equal to the height of its parent container will center the text vertically.</div>
                                    <div className="bot bg-orange-message">Hi</div>
                                    <div className="user bg-blue-message">If the text is a single line within a container of fixed height, setting the line-height of the text element to be equal to the height of its parent container will center the text vertically.</div>
                                    <div className="bot bg-orange-message">Hi</div>
                                </div>
                                <div className="chat-input-container border-gradient-horizontal">
                                    <textarea
                                       ref={ textAreaRef }
                                       onChange={ handleTextAreaOnChange }
                                       onKeyDown={ enterToSubmit }
                                       value={ textAreaContent }
                                       name="userMessage"
                                       className="input-box scrollbar-custom"
                                       data-testid="text_box"
                                       placeholder="Write a message..."
                                       rows="1"
                                       maxLength="256">
                                    </textarea>
                                    <button className="chatbot-submit-button drop-shadow" type="submit">&gt;</button>
                                </div>
                            </div>
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
