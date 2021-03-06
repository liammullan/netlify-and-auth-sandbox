import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthProvider} from "./contexts/AuthContext";
import {BrowserRouter as Router} from "react-router-dom";
import {ApiProvider} from "./contexts/ApiContext";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <ApiProvider>
                    <App/>
                </ApiProvider>
            </AuthProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// ReactDOM.render(
//         <AuthProvider>
//             <App />
//         </AuthProvider>,
//     document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
