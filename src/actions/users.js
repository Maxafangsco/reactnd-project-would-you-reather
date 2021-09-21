import {_getUsers, _saveUser} from '../api/_DATA'

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST'
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const GET_USERS_FAILED = 'GET_USERS_FAILED'

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST'
export const ADD_USER_FAILED = 'ADD_USER_FAILED'
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS'



export function getUsersRequest (user){
    return{
        type: GET_USERS_REQUEST,
        user
    }
}

export function getUsersSuccess (user){
    return{
        type: GET_USERS_SUCCESS,
        user
    }
}

export function getUsersFailed (error){
    return{
        type: GET_USERS_FAILED,
        error
    }
}


export const getUsers = () => {
    return (dispatch) => {
        const promise = _getUsers();
        dispatch(getUsersRequest(promise));
        promise.then((users) => {
            dispatch(getUsersSuccess(users));
        })
        .catch((error) =>{
            dispatch(getUsersFailed(error))
        });

        return promise;
    };
};

export function addUsersRequest (users){
    return{
        type: ADD_USER_REQUEST,
        users
    }
}

export function addUsersSuccess (user){
    return{
        type: ADD_USER_SUCCESS,
        user
    }
}

export function addUsersFailed (error){
    return{
        type: ADD_USER_FAILED,
        error
    }
}


export const addUser = (data) => {
    return (dispatch) => {
        const promise = _saveUser(data);
        dispatch(addUsersRequest(promise));
        promise.then((user) => {
            dispatch(addUsersSuccess(user));
        })
        .catch((error) =>{
            dispatch(addUsersFailed(error))
        });

        return promise;
    };
};