import React from 'react';
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import {StyledFirebaseAuth} from "react-firebaseui";
import {IAuthContext, useAuth} from "../../contexts/AuthContext";

function SignInScreen() {

    console.log("SignInScreen");
    const authContext: IAuthContext = useAuth();

    const uiConfig: firebaseui.auth.Config = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: () => false,
        },
    }

    return (
        <div>
            <p>Please sign-in:</p>
            {authContext.firebaseAuth
                ? <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={authContext.firebaseAuth}/>
                : <h1>Loading...</h1>};
        </div>
    );
}

export default SignInScreen;