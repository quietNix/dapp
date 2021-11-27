import React from "react";
import { user } from '../utility/user';

function Login() {

    let username;
    let password;

    function login() {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        user.auth(username, password, ({ err }) => err && alert(err));
    }

    //enforce Uniqueness of user
    function signup() {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        user.create(username, password, ({ err }) => {
            if (err) {
                alert(err);
            } else {
                login();
            }
        });
    }

    return (
        <div>
            <label htmlFor="username">Username</label>
            <input className="credential" id="username" name="username" value={username} minLength="3" maxLength="16" />
            
            <label htmlFor="password">Password</label>
            <input className="credential" id="password" name="password" value={password} type="password" />
            
            <button className="login" onClick={login}>Login</button>
            <button className="login" onClick={signup}>Sign Up</button>
        </div>
    );
}

export default Login;