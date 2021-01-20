import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {useAuth} from "../../contexts/AuthContext";

function NavBar() {

    const auth = useAuth();
    const history = useHistory();

    function logout() {
        auth.firebaseAuth?.signOut().then(() => {
            history.push("/");
        });
    }

    const isLoggedIn: boolean = auth.user != null;

    return (
        <header>
            <div style={{paddingTop: 10}}>
                <span style={{padding: 10}}>
                    <Link to={'/'}>Home</Link>
                </span>
                {isLoggedIn
                    ? <>
                          <span style={{padding: 10}} onClick={() => logout()}>Sign Out</span>
                          <span style={{padding: 10}}>{auth.user.displayName}</span>
                      </>
                    : <span style={{padding: 10}}>
                        <Link to={"/login"}>Sign In</Link>
                      </span>
                }
            </div>
        </header>
    )
}

export default NavBar;