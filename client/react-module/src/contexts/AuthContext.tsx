import firebase from 'firebase';
import React, {useContext, useState} from 'react';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

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

    // for some reason calling firebase.initializeApp(firebaseConfig) causes
    // a re-render
    if (!firebase.apps.length) {
        // console.log("Initialising firebase auth");
        const auth = firebase.initializeApp(firebaseConfig).auth();

        // Upon initialisation I'm getting the onAuthStateChanged triggered
        // with a null user for some reason (how is that a state change??)
        auth.onAuthStateChanged((user) =>
            setCurrentUser(user)
        );

        setFirebaseAuth(auth);

        console.log("Finished initialising firebase auth");
        return (
            <p>Loading Authentication...</p>
        );
    } else {
        // console.log("Firebase auth initialised already...");
        // console.log("Firebase auth:");
        // console.log(firebaseAuth);
        // console.log("User:");
        // console.log(currentUser);
        const authContextValue = {firebaseAuth: firebaseAuth, user: currentUser} as IAuthContext;
        return (
            <AuthContext.Provider value={authContextValue}>
                {children}
            </AuthContext.Provider>
        );
    }

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