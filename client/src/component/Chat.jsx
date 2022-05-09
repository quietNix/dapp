import React, { Fragment, useEffect, useState } from "react";
import { db, user } from "../utility/user";
import { connect } from "react-redux";
import debounce from 'lodash.debounce';
import ChatMessage from './ChatMessage';
import Login from "./Login";

import GUN from "gun";
import Sidebar from "./Sidebar";
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
    const [chatRoom, setChatRoom] = useState("common")
    const [canAutoScroll, setAutoScroll] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState({
        "common": [],
        "games": [],
        "academics": []
    });

    const rooms = {
        "common": [],
        "games": [],
        "academics": []
    }

    //ACCESSING DATA
    useEffect(() => {
        if (username === '') return;

        Object.keys(rooms).map(room => {
            db.get(room)
                .map()
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

                            rooms[room] = [...rooms[room].slice(-50), message].sort((a, b) => a.when - b.when); //will keep only latest 100 in array
                            setMessages((prev) => {
                                return {
                                    ...prev,
                                    [room]: rooms[room]
                                }
                            })

                            if (canAutoScroll) { autoScroll(); setAutoScroll(false) }
                            else unreadMessages = true;
                        }
                    }
                })
        })

        console.log(messages)

    }, [username]);

    function handleChange(event) {
        const { value } = event.target;
        setNewMessage(value);
    }

    //SENDING DATA
    async function sendMessage(event) {
        event.preventDefault();
        const secret = await SEA.encrypt(newMessage, '#Nikhil');
        const index = new Date().toISOString();
        const message = user.get('all').set({ what: secret });
        db.get(chatRoom).get(index).put(message);
        setNewMessage('');
        setAutoScroll(true);
        autoScroll();
    }

    return (
        <div className="container">
            {
                username !== ''
                &&
                <Sidebar
                    chatRoom={chatRoom}
                    setChatRoom={setChatRoom}
                />
            }
            {(username === '') ?
                <div className="div-main">
                    <Login />
                </div>
                :
                <Fragment>
                    {/* <main onScroll={debouncedWatchScroll} id="cont"> */}
                    <main onScroll={() => { console.log("scroll"); }} id="cont">
                        {messages[chatRoom].map(message => {
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
                                {unreadMessages ? "💬" : "👇"}
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