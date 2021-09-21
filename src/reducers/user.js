import {
    GET_USERS_FAILED,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    ADD_USER_FAILED,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS
 } from '../actions/users'
 import {SAVE_USER_QUESTIONS} from '../actions/questions'

 const initialState = {
    loading: false,
    registering:false,
    error : null,
    users : null,
};

const userReducer = (state=initialState, action) =>{
switch(action.type){
    case GET_USERS_REQUEST :
        return {
            ...state,
            loading: true,
        };
    case GET_USERS_FAILED :
        return{
            ...state,
            loading:false,
            error: action.error,
        };
    case GET_USERS_SUCCESS :
        return {
            ...state,
            loading:false,
            users: action.user
        };

    case SAVE_USER_QUESTIONS :
        const {author} = action.question
        return{
            ...state,
            users:{
                ...state.users,
                [author]:{
                    ...state.users[author].questions,
                    ...[action.id]
                }
            }
        }
    case ADD_USER_REQUEST:
        return {
            ...state,
            registering: true,
        };

    case ADD_USER_FAILED :
        return {
            ...state,
            registering:false,
            error: action.error
        };
    case ADD_USER_SUCCESS :
        return {
            ...state,
            registering:false,
            users: {
                ...state.users,
                [action.id]:action.user
            },
        };
        default:
            return state;
  }
};
export default userReducer