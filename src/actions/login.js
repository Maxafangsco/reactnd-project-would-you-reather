export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOG_OUT = 'LOG_OUT'

export function loginUserRequest (userId){
   return{
    type: LOGIN_SUCCESS,
    payload: userId,
   }
}

export const loginUser = (userId) =>{
    return (dispatch, getState) => {
        const user = getState().users.users[userId];
        return new Promise((resolve, reject) => {
            if (userId){
                localStorage.setItem("user", JSON.stringify(user));
                dispatch(loginUserRequest(user))
                // dispatch(logOutRequest(user));
                resolve(userId);
            }else{
                reject('User not found')
            }
        });
    };
};

export function logOutRequest (){
    return {
        type: LOG_OUT,
        payload: null,
    }
}

export const logOut = () => {
    return (dispatch) => {
        return new Promise((resolve,reject) =>{
            localStorage.removeItem("user");
            dispatch(logOutRequest());
            resolve();
        })
    }
}
