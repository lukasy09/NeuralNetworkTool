import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route} from "react-router-dom"
import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger'
import {Provider} from 'react-redux';
import {generalReducer} from './reducers/GeneralReducer';
import {modelReducer} from "./reducers/ModelReducer";
import {graphReducer} from "./reducers/GraphReducer";
import {alertsReducer} from "./reducers/AlertsReducer";
import {dataReducer} from "./reducers/DataReducer";
import {getApplicationEnv} from "./utils/EnvironmentDetector";

export const env = getApplicationEnv();

const allReducers = combineReducers({
    generalReducer: generalReducer,
    modelReducer: modelReducer,
    graphReducer: graphReducer,
    dataReducer: dataReducer,
    alertsReducer: alertsReducer
});

export const store = createStore(allReducers,
                     applyMiddleware(logger));

ReactDOM.render(
    <Provider store = {store}>
        <Router>
            <Route path ="/" component ={App}/>
        </Router>
    </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
