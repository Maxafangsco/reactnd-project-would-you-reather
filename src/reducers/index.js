import { combineReducers } from "redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import loginReducer from './login';
import userReducer from "./user";
import questionReducer from './question';

 const rootReducer = combineReducers({
    authUser : loginReducer,
    users : userReducer,
    question : questionReducer
});

export default rootReducer;
