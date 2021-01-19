import React from 'react';
import './App.css';
import {AuthProvider, useAuth} from "./contexts/AuthContext";
import {HomeScreen} from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import SignInScreen2 from "./components/SignInScreen/SignInScreen2";

function App() {
    const authContext = useAuth();
    const signInScreen = !authContext.user ? <SignInScreen2/> : <h1>Go For A Bath Livia Poo Poo Yacky Yack</h1>;
    //const signInScreen = <h1>Gogog</h1>;
    console.log("Auth context:");
    // console.log(authContext);
    //console.log("Auth context:");
    return (
        <>
            <NavBar/>
            <HomeScreen/>
            {signInScreen}
        </>
    );
}

export default App;
