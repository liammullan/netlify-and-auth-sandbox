import React from 'react';
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import {StyledFirebaseAuth} from "react-firebaseui";
import {IAuthContext, useAuth} from "../../contexts/AuthContext";
import {useHistory} from "react-router-dom";

function SignInScreen() {

    const authContext: IAuthContext = useAuth();
    const history = useHistory();

    const uiConfig: firebaseui.auth.Config = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        signInSuccessUrl: "/",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            //signInSuccessWithAuthResult: () => false,
        },
    }

    return (
        <div>
            <p>Please sign-in:</p>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={authContext.firebaseAuth}/>
        </div>
    );
}

export default SignInScreen;