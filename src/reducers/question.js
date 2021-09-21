import {
    GET_QUESTIONS_FAILED,
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    SAVE_ANSWER_FAILED,
    SAVE_ANSWER_REQUEST,
    SAVE_ANSWER_SUCCESS,
} from '../actions/questions'

const initialState = {
    loading: false,
    requesting: false,
    error : null,
    questions : null,
};

const questionReducer = (state= initialState, action) =>{
    switch(action.type){
        case GET_QUESTIONS_REQUEST :
            return {
                ...state,
                loading: true,
            };
        case GET_QUESTIONS_FAILED :
            return {
                ...state,
                loading:false,
                questions: action.question
            };
        case GET_QUESTIONS_SUCCESS :
            return{
                ...state,
                loading: false,
                questions:action.question

            };
        case SAVE_ANSWER_REQUEST :
            return{
                ...state,
                requesting:true,
            };
        case SAVE_ANSWER_FAILED :
            return{
                ...state,
                requesting: false,
                error: action.error,
            };
        case SAVE_ANSWER_SUCCESS :
            return{
                ...state,
                requesting:false,
                question : {
                    ...state.question, 
                    [action.id]: action.id,
                },
            };
        default:
            return state;
    }
};

export default questionReducer;