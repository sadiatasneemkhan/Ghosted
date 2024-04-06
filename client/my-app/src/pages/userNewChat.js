import React, { useEffect, useRef, useState } from 'react';
import './userChat.css';
import './pages.css';
import NavBar from '../components/Navbar';

function UserNewChat() {
    const textareaRef = useRef(null);
    const chatAreaRef = useRef(null);
    const typeMessageRef = useRef(null); 
    const [initialChatAreaHeight, setInitialChatAreaHeight] = useState(0);

    useEffect(() => {
        const setInitialSizes = () => {
            if (chatAreaRef.current) {
                setInitialChatAreaHeight(chatAreaRef.current.offsetHeight);
            }
        };

        const adjustTextareaAndChatArea = () => {
            const textarea = textareaRef.current;
            const typeMessage = typeMessageRef.current;
            if (!textarea || !initialChatAreaHeight || !typeMessage) return;

            const currentTextLength = textarea.value.length;
            if (currentTextLength >= 200) {
                textarea.style.overflowY = "scroll";
                return;
            } else {
                textarea.style.overflowY = "hidden";
            }

            textarea.style.height = 'auto';
            const currentTextareaHeight = textarea.scrollHeight;
            let newChatAreaHeight = initialChatAreaHeight;

            if (currentTextareaHeight > textarea.offsetHeight) {
                textarea.style.height = `${currentTextareaHeight}px`;
                typeMessage.style.height = `auto`; 
                newChatAreaHeight = Math.max(0, initialChatAreaHeight - (currentTextareaHeight - 40));
            } else {
                textarea.style.height = `40px`;
                typeMessage.style.height = `auto`; 
            }

            if (chatAreaRef.current) {
                chatAreaRef.current.style.height = `${newChatAreaHeight}px`;
            }
        };

        setInitialSizes();

        const textarea = textareaRef.current;
        textarea.addEventListener('input', adjustTextareaAndChatArea);
        textarea.addEventListener('paste', adjustTextareaAndChatArea); 

        return () => {
            textarea.removeEventListener('input', adjustTextareaAndChatArea);
            textarea.removeEventListener('paste', adjustTextareaAndChatArea); 
        };
    }, [initialChatAreaHeight]);

    return (
        <div>
            <header className="new_msg_header">
                <div className="back_button">
                    <button>
                        <img src={"/arrow.svg"} className="arrow" alt="back button" />
                    </button>
                </div>
                <div className="business_name">
                    <h2>Business Name</h2>
                </div>
                <div className="business-pfp">
                    <img src={'/business-logo.svg'} className="sender_pfp" alt="business logo" />
                </div>
            </header>
            <div className="chat_container">
                <div ref={chatAreaRef} className="chat_area">
                    {/* Chat messages */}
                </div>
                <div ref={typeMessageRef} className="type_message">
                    <textarea ref={textareaRef} className="type_message_input" placeholder="Type Message" maxLength="200"></textarea>
                    <button className="send_message">
                    <img src={'/Send.svg'} alt="Send message" />
                    </button>
                </div>
            </div>

            <NavBar />
        </div>
    );
}

export default UserNewChat;
