import React from 'react';
import './App.css';
import {useAuth} from "./contexts/AuthContext";
import {HomeScreen} from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import SignInScreen from "./components/SignInScreen/SignInScreen";
import {Route, Switch } from 'react-router-dom';

function App() {
    // const authContext = useAuth();
    // const signInScreen = !authContext.user ? <SignInScreen/> : <h1>Go For A Bath Livia Poo Poo Yacky Yack</h1>;
    return (
        <>
            <NavBar/>
            <Switch>
                <Route path = '/login' component={SignInScreen} />
                <Route path = '/' component={HomeScreen} />
            </Switch>
        </>
    );
}

export default App;
