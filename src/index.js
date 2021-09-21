import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App'
import { createStore,} from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom";
import rootReducer from './reducers'
import middleware from './middleware'

const store = createStore(rootReducer, middleware);

ReactDOM.render(
    <React.StrictMode>
        <Router>
              <Provider store = {store}>
                  <App />
              </Provider>
          </Router>
    </React.StrictMode>,
  document.getElementById('root')
);


