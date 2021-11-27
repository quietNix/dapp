export const setUsername=(verdict)=>{
    return({
        type: "USER_AUTH_STATUS",
        payload: verdict
    })
}