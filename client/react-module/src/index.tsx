import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {SignInScreen} from "./components/SignInScreen/SignInScreen";
import {AuthProvider} from "./contexts/AuthContext";


// Strict mode doesn't seem to work with the way I'm doing auth...
// it's something to do with re-rendering without the auth being set...
// At some point figure this out because strict mode should work right?

// ReactDOM.render(
//   <React.StrictMode>
//     {/*<SignInScreen />*/}
//       <AuthProvider>
//         <App />
//       </AuthProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
        <AuthProvider>
            <App />
        </AuthProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
