import React, { useEffect, useRef } from "react";

function Sidebar({ chatRoom, setChatRoom }) {

    const commonBtnRef = useRef(null);
    const gamesBtnRef = useRef(null);
    const academicsBtnRef = useRef(null);

    function handleChatRoom(room) {
        console.log(room)
        setChatRoom(room)
    }

    useEffect(()=>{
        switch (chatRoom) {
            case "common":
                commonBtnRef.current.classList.add("sidebar__btn--selected")
                gamesBtnRef.current.classList.remove("sidebar__btn--selected")
                academicsBtnRef.current.classList.remove("sidebar__btn--selected")
                break;
            case "games":
                gamesBtnRef.current.classList.add("sidebar__btn--selected")
                commonBtnRef.current.classList.remove("sidebar__btn--selected")
                academicsBtnRef.current.classList.remove("sidebar__btn--selected")
                break;
            case "academics":
                academicsBtnRef.current.classList.add("sidebar__btn--selected")
                commonBtnRef.current.classList.remove("sidebar__btn--selected")
                gamesBtnRef.current.classList.remove("sidebar__btn--selected")
                break;
            default:
                break;
        }
    })

    return (
        <aside className="sidebar">
            <nav>
                <p className="sidebar__btn" ref={commonBtnRef} onClick={() => { handleChatRoom("common") }}>Common</p>
                <p className="sidebar__btn" ref={gamesBtnRef} onClick={() => { handleChatRoom("games") }}>Games</p>
                <p className="sidebar__btn" ref={academicsBtnRef} onClick={() => { handleChatRoom("academics") }}>Academics</p>
            </nav>
        </aside>
    );
}

export default Sidebar;