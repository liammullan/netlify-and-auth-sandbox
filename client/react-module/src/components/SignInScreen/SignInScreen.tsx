import React from 'react';
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import {StyledFirebaseAuth} from "react-firebaseui";
import {IAuthContext, useAuth} from "../../contexts/AuthContext";

function SignInScreen() {

    const authContext: IAuthContext = useAuth();

    const uiConfig: firebaseui.auth.Config = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
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
            {/* can only render the form if we have a firebase auth in the auth context,
                and this is done in an effect, i.e. after the first render. Is this approach
                ok/sensible? Perhaps this component should be aware of the details of the
                auth context? E.g. should the AuthProvider display a Loading screen? */}
            {authContext.firebaseAuth
                ? <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={authContext.firebaseAuth}/>
                : <h1>Loading...</h1>};
        </div>
    );
}

export default SignInScreen;