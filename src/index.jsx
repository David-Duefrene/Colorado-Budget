import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Dashboard from './containers/Dashboard/Dashboard';
import reportWebVitals from './reportWebVitals';
import store from './store';

import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}><Dashboard /></Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
