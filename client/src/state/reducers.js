const initialState = {
    username: ''
}

export const requestUserReducer = (state = initialState, action={})=>{
    switch(action.type){
        case "USER_AUTH_STATUS":
            return{...state, username: action.payload}
        default:
            return state;
    }
}