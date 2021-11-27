import React, { Fragment } from "react";
import { connect } from "react-redux";
import { user, SetUsername } from "../utility/user";

const mapStateToProps = (state) => {
    return {
        username: state.username
    }
}

function Header({ username }) {

    function signout() {
        user.leave();
        SetUsername('')
    }

    return (
        <header>
            <h1>💬</h1>
            {(username === '') ?
                <h3>Dapp Chat</h3>
                :
                <Fragment>
                    <div className="user-bio">
                        <span><strong>{username}</strong></span>
                        <img src={`https://avatars.dicebear.com/api/initials/${username}.svg`} alt="avatar" />
                    </div>
                    <button className="signout-button" onClick={signout}>Sign Out</button>
                </Fragment>
            }
        </header>

    )
}

export default connect(mapStateToProps)(Header);