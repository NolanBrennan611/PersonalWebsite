import { useState, useRef, useEffect } from "react";

const INITIAL_TEXTAREA_HEIGHT_PIXELS = 24;
const MAX_TEXTAREA_HEIGHT_PIXELS = 120;

const ChatBot = ({ ws, chatBotRef, closeChatBotRef }) => {
    const [ textAreaContent, setTextAreaContent ] = useState("");
    const [ , setTextAreaHeight ] = useState(INITIAL_TEXTAREA_HEIGHT_PIXELS);
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ messages, setMessages ] = useState([
        { id: 1, content: "Don't have time to dig around? No worries, ask away! This chatbot uses the RAG Pattern to answer questions about me.", isUser: false }
    ]);
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

    const addMessage = (message) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { id: prevMessages.length + 1, content: message.content , isUser: message.isUser }
        ]);
    };

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
            addMessage({ content: textAreaContent, isUser: true });
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

    useEffect(() => {
        if (ws) {
            ws.onmessage = (event) => {
                // setWarningVisible(false);
                const data = JSON.parse(event.data);
                if (data?.message) {
                    if (data.message.status === "error") {
                        // setWarningVisible(true);
                    } else {
                        addMessage({ content: data.message.content, isUser: false });
                        setIsSubmitting(false);
                    }
                }
            };
        }
    }, [ ws ]);

    return (
        <div ref={ chatBotRef } className="chatbot-container drop-shadow" data-lenis-prevent>
            <div className="x-button border-gradient-bottom">
                <a ref={ closeChatBotRef } className="col-center">X</a>
            </div>
            <div className="messages scrollbar-custom">
                {
                    messages.map((message) => (
                        <div key={ message.id } className={message.isUser ? "user bg-blue-message" : "bot bg-orange-message"}>
                            { message.content }
                        </div>
                    ))
                }
            </div>
            <div className="chat-input-container border-gradient-top">
                <textarea
                    ref={ textAreaRef }
                    onChange={ handleTextAreaOnChange }
                    onKeyDown={ enterToSubmit }
                    value={ textAreaContent }
                    name="userMessage"
                    className="input-box"
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
