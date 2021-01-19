import firebase from 'firebase';
import React, {useContext, useEffect, useState} from 'react';
import {auth} from "../firebase";

// export interface IUser{
//     name: string
// }

export interface IAuthContext {
    firebaseAuth: firebase.auth.Auth | undefined,
    user: firebase.User
}

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export function useAuth(): IAuthContext {
    return useContext(AuthContext);
}

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

    // Only render the children once the auth object has been added to the context,
    // which will be after the first render
    return (
        <AuthContext.Provider value={authContextValue}>
            {firebaseAuth && children}
        </AuthContext.Provider>
    );

}