import React from "react";

function ChatMessage(props){
    const messageClass = props.who === props.sender ? 'sent' : 'received';
    const avatar = `https://avatars.dicebear.com/api/initials/${props.who}.svg`;
    const ts = new Date(props.when);

    return(
        <div className={`message ${messageClass}`}>
            
            <img src={avatar} alt="avatar" />
            <div className="message-text">
                <p>{props.what}</p>
                <time>{ts.toLocaleTimeString()}</time>
            </div>
        </div>
    )
}

export default ChatMessage;