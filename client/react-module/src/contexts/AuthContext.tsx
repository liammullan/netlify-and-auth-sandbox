import firebase from 'firebase';
import React, {useContext, useEffect, useState} from 'react';
import {auth} from "../firebase";

// The auth context - i.e. the type that components will have access to

// export interface IUser{
//     name: string
// }

export interface IAuthContext {
    firebaseAuth: firebase.auth.Auth | undefined,
    user: firebase.User
}

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

// A convenience for components to get the auth context from the wrapping provider tag

export function useAuth(): IAuthContext {
    return useContext(AuthContext);
}

// The context provider - wrap all children of the "AuthProvider" tag
// with the context provider
export const AuthProvider = ({children}: any) => {

    console.log("Rendering AuthProvider")

    const [currentUser, setCurrentUser] = useState<firebase.User | null>();
    const [firebaseAuth, setFirebaseAuth] = useState<firebase.auth.Auth>();

    // Want this to happen only once
    useEffect(() => {
        setFirebaseAuth(auth);
        // Returns an unsubscribe function
        const unsubscribe = auth.onAuthStateChanged(user =>
            setCurrentUser(user));
        // ...which we return so it gets called on unmount
        return unsubscribe;
    }, []);

    const authContextValue = {firebaseAuth: firebaseAuth, user: currentUser} as IAuthContext;

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );


    // useEffect(() => {
    //     console.log("Using effect on startup")
    //     const _firebaseAuth = firebase.initializeApp(firebaseConfig).auth();
    //     console.log("Firebase auth:");
    //     console.log(_firebaseAuth);
    //     setFirebaseAuth(_firebaseAuth);
    //     _firebaseAuth.onAuthStateChanged(user => setCurrentUser(user));
    // }, []);


    // useEffect(() => {
    //     console.log("Using effect when firebaseAuth has changed!")
    //
    //
    //     // console.log("firebaseApp inside useeffect");
    //     // console.log(firebaseApp);
    //
    //
    // }, [firebaseAuth]);

    //let firebaseAuth: firebase.auth.Auth | undefined;
    // console.log("firebaseApp outside useeffect");
    // console.log(firebaseApp);
    // if (firebaseApp) {
    //     firebaseAuth = firebaseApp.auth();
    // }
    // console.log("firebaseAuth");
    // console.log(firebaseAuth);
    //const firebaseAuth = (firebaseApp === null) ? null : firebaseApp.


}