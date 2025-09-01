import { useState, useRef } from "react";

const INITIAL_TEXTAREA_HEIGHT_PIXELS = 24;
const MAX_TEXTAREA_HEIGHT_PIXELS = 120;

const ChatBot = ({ ws, toggleChat }) => {
    const [ textAreaContent, setTextAreaContent ] = useState("");
    const [ , setTextAreaHeight ] = useState(INITIAL_TEXTAREA_HEIGHT_PIXELS);
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const textAreaRef = useRef(null);

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
            console.log("Sending message:", textAreaContent);
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

    return (
        <div className="chatbot-container drop-shadow" data-lenis-prevent>
            <div className="x-button border-gradient-bottom">
                <a onClick={ toggleChat } className="col-center">X</a>
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
            <div className="chat-input-container border-gradient-top">
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
    );
};

export default ChatBot;
