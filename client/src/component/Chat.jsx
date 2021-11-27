import React, { Fragment, useEffect, useState } from "react";
import { db, user } from "../utility/user";
import { connect } from "react-redux";
import debounce from 'lodash.debounce';
import ChatMessage from './ChatMessage';
import Login from "./Login";

import GUN from "gun";
const SEA = GUN.SEA;


// let lastScrollTop;
let unreadMessages = false;

function autoScroll() {
    var objDiv = document.getElementById("cont");
    objDiv.scrollTop = objDiv.scrollHeight;
}

// function watchScroll(e) {
//     canAutoScroll = (e.target.scrollTop || Infinity) > lastScrollTop;
//     lastScrollTop = e.target.scrollTop;
// }

// let debouncedWatchScroll = debounce(watchScroll, 1000);



const mapStateToProps = (state) => {
    return {
        username: state.username
    }
}

function Chat({ username }) {

    const[canAutoScroll, setAutoScroll] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);

    let m = [];
    useEffect(() => {
        if(username==='') return;

        db.get("chat")  //if multiple chatrooms, give each one a different name
            .map()
            //   .on()      //since its immutable
            .once(async (data, id) => {
                if (data) {
                    // Key for end-to-end encryption
                    const key = '#Nikhil';
                    var message = {
                        // transform the data
                        who: await db.user(data).get('alias'), // a user might lie who they are! So let the user system detect whose data it is.
                        what: (await SEA.decrypt(data.what, key)) + '', // force decrypt as text.
                        when: GUN.state.is(data, 'what'), // get the internal timestamp for the what property.
                    };

                    if (message.what) {
                        m = [...m.slice(-50), message].sort((a, b) => a.when - b.when); //will keep only latest 100 in array
                        setMessages(m);
                        if (canAutoScroll) {autoScroll(); setAutoScroll(false)}
                        else unreadMessages = true;
                    }
                }
            })
    }, [username]);


    function handleChange(event) {
        const { value } = event.target;
        setNewMessage(value);
    }


    async function sendMessage(event) {
        event.preventDefault();
        const secret = await SEA.encrypt(newMessage, '#Nikhil');
        const index = new Date().toISOString();
        const message = user.get('all').set({ what: secret });
        db.get('chat').get(index).put(message);
        setNewMessage('');
        setAutoScroll(true);
        autoScroll(); 
    }

    return (
        <div className="container">

            {(username === '') ?
                <div className="div-main">
                    <Login />
                </div>
                :
                <Fragment>
                    {/* <main onScroll={debouncedWatchScroll} id="cont"> */}
                    <main onScroll={()=>{console.log("scroll"); }} id="cont">
                        {messages.map(message => {
                            return (
                                <ChatMessage
                                    id={message.when}
                                    key={message.when}
                                    when={message.when}
                                    what={message.what}
                                    who={message.who}
                                    sender={username}
                                />
                            )
                        })}
                    </main>
                    <form onSubmit={sendMessage}>
                        <input type="text" placeholder="Type a message..." onChange={handleChange} value={newMessage} maxLength="100" />
                        <button className="sent-emogy" type="submit" disabled={!newMessage}>🛩️</button>
                    </form>
                    {!canAutoScroll ?
                        <div className="scroll-button">
                            <button onClick={autoScroll}>
                                {unreadMessages ?"💬":"👇"}
                            </button>
                        </div>
                        : ""
                    }
                </Fragment>
            }
        </div >
    )
}

export default connect(mapStateToProps)(Chat);