import Gun from "gun";
import 'gun/sea';
import 'gun/axe';
import { store } from "../index";
import { setUsername } from "../state/action";

// Database
export const db = Gun({
    peers: [
        'http://localhost:3030/gun'
    ]
});


// Gun User
export const user = db.user().recall({ sessionStorage: true });


//set global state here named username
export function SetUsername(username) {
    store.dispatch(setUsername(username))
    // store.dispatch({
    //     type: "USER_AUTH_STATUS",
    //     payload: username
    // })
}

user.get('alias').on(v => SetUsername(v))

db.on('auth', async (event) => {
    const alias = await user.get('alias'); // username string
    SetUsername(alias);
    console.log(`signed in as ${alias}`);
});