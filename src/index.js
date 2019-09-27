import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route} from "react-router-dom"
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {generalReducer} from './reducers/GeneralReducer';
import {modelReducer} from "./reducers/ModelReducer";
import {graphReducer} from "./reducers/GraphReducer";

const allReducers = combineReducers({
    generalReducer: generalReducer,
    modelReducer: modelReducer,
    graphReducer: graphReducer
});

export const store = createStore(allReducers);

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
