import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import './index.css';
import reducer from './reducers';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

const initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, applyMiddleware(...middleware));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </ BrowserRouter>
    </Provider>, 
    document.getElementById('root'));
