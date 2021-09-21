import {getUsers} from './users'
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../api/_DATA'

export const GET_QUESTIONS_REQUEST = 'GET_QUESTIONS_REQUEST'
export const GET_QUESTIONS_FAILED = 'GET_QUESTIONS_FAILED'
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS'

export const SAVE_QUESTIONS_REQUEST = 'SAVE_QUESTIONS_REQUEST'
export const SAVE_QUESTIONS_FAILED = 'SAVE_QUESTIONS_FAILED'
export const SAVE_QUESTIONS_SUCCESS = 'SAVE_QUESTIONS_SUCCESS'

export const SAVE_USER_QUESTIONS = 'SAVE_USER_QUESTIONS'

export const SAVE_ANSWER_REQUEST = 'SAVE_ANSWER_REQUEST'
export const SAVE_ANSWER_FAILED = 'SAVE_ANSWER_FAILED'
export const SAVE_ANSWER_SUCCESS = 'SAVE_ANSWER_SUCCESS'


export const getQuestionsRequest = (promise) => {
  return {
    type: GET_QUESTIONS_REQUEST,
    promise
  }
}

export const getQuestionsSuccess = (question) => {
   return {
    type: GET_QUESTIONS_SUCCESS,
    question
   }
}

export const getQuestionsFailed = (error) => {
   return{
    type: GET_QUESTIONS_FAILED,
    error
   }
}

export const getQuestions = () => {
    return (dispatch) => {
        const promise = _getQuestions();
        dispatch(getQuestionsRequest(promise));
        promise.then((question) =>{
            dispatch(getQuestionsSuccess(question));
        })
        .catch((error) =>{
            dispatch(getQuestionsFailed(error))
        });
        return promise;
    }
}

export const saveQuestionRequest = (question) =>{
    return {
        type: SAVE_QUESTIONS_REQUEST,
        question
    }
}

export const saveQuestionSuccess = (question) =>{
    return {
        type: SAVE_QUESTIONS_SUCCESS,
        question
    }
}

export const saveUserQuestion = (question) =>{
    return {
        type: SAVE_USER_QUESTIONS,
        question
    }
}

export const saveQuestionFailed = (error) =>{
    return {
        type: SAVE_QUESTIONS_FAILED,
        error
    }
}

export const saveQuestion = (question) =>{
    return (dispatch) =>{
    const promise =  _saveQuestion(question);
    dispatch(saveQuestionRequest(promise));
    promise
    .then((question) =>{
        dispatch(saveQuestionSuccess(question))
        dispatch(saveUserQuestion(question))
    })
    .catch((error) =>{
        dispatch(saveQuestionFailed(error))
    })

    return promise;
    };
};

export const saveAnswerRequest = (promise) =>{
    return {
        type: SAVE_ANSWER_REQUEST,
        promise

    }
}

export const saveAnswerSuccess = (answer) =>{
    return {
        type: SAVE_ANSWER_SUCCESS,
        answer
    }
}

export const saveAnswerFailed = (error) =>{
    return {
        type: SAVE_ANSWER_SUCCESS,
        error
    }
}

export const saveAnswer = (answer) =>{
    return (dispatch) =>{
        const promise = _saveQuestionAnswer(answer);
        dispatch(saveAnswerRequest(promise))
        promise
        .then((answer) =>{
            dispatch(saveAnswerSuccess(answer))
            getQuestions()(dispatch);
            getUsers()(dispatch)
        })
        .catch((error) =>{
            dispatch(saveQuestionFailed(error))
        });
        return promise;
    };
};