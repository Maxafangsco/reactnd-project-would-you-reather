import {LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS,LOG_OUT} from '../actions/login'

const initialState = {
    loading: false,
    error : null,
    user : null,
};

const loginReducer = (state= initialState, action) =>{
      switch(action.type){
          case LOGIN_REQUEST :
              return {
                  ...state,
                  loading: true
              };
          case LOGIN_SUCCESS :
              return{
                  ...state,
                  loading: false,
                  user: action.payload,
              };
          case LOGIN_FAILED :
              return{
                  ...state,
                  loading:false,
                  user: action.error
              };
          case LOG_OUT :
              return{
                  ...state,
                  loading: false,
                  user: action.user
              };
          default:
              return state
      }
};

export default loginReducer;