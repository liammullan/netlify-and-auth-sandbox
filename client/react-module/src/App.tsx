import React from 'react';
import './App.css';
import {useAuth} from "./contexts/AuthContext";
import {HomeScreen} from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import SignInScreen from "./components/SignInScreen/SignInScreen";

function App() {
    const authContext = useAuth();
    const signInScreen = !authContext.user ? <SignInScreen/> : <h1>Go For A Bath Livia Poo Poo Yacky Yack</h1>;
    return (
        <>
            <NavBar/>
            <HomeScreen/>
            {signInScreen}
        </>
    );
}

export default App;
