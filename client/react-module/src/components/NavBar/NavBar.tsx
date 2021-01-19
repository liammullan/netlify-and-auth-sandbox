import React from 'react';
import {useAuth} from "../../contexts/AuthContext";

function NavBar() {

    const auth = useAuth();

    function logout() {
        console.log("* user prior to auth.signout:");
        console.log(auth.user);

        auth.firebaseAuth?.signOut().then(function () {
            console.log("* user immediately after auth.signout:");
            console.log(auth.user);
            console.log("Signed Out!");
        });
    }

    const isLoggedIn: boolean = auth.user != null;

    return (
        <header>
            <div style={{paddingTop: 10}}>
                <span style={{padding: 10}}>Home</span>
                {isLoggedIn
                    ? <>
                          <span style={{padding: 10}} onClick={() => logout()}>Sign Out</span>
                          <span style={{padding: 10}}>{auth.user.displayName}</span>
                      </>
                    : <span style={{padding: 10}}>Sign In</span>
                }
            </div>
        </header>
    )
}

export default NavBar;