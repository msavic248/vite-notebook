import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Expand } from "@theme-toggles/react";

function Navbar(props) {
    const {user, loggedIn, onLoginClick, onLogoutClick} = props;
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const prefersLight = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if(prefersLight) {
            setIsDarkTheme(true);
        }
    }, []);

    useEffect(() => {
        if(isDarkTheme) {
            document.body.classList.add("dark");
            document.querySelector("nav").classList.add("dark");

        } else {
            document.body.classList.remove("dark");
            document.querySelector("nav").classList.remove("dark");
        }
    }, [isDarkTheme]);

    return (<nav>
        <h1>Vite Notebook</h1>
        <div className="nav-options">
            {loggedIn ? (
                <>
                <h2>
                    <Link to="/">Home</Link>
                </h2>
                <Expand toggled={isDarkTheme} toggle={setIsDarkTheme} />
                <div className="dropdown">
                    <img src={user.identities[0].identity_data.avatar_url} width="32px" height="32px"/>
                    <div className="dropdown-content">
                        <p>Profile</p>
                        <p>Settings</p>
                        <button onClick={onLogoutClick}>Sign out</button>
                    </div>
                </div>
                </>
            ) : (
                <>
                <Expand toggled={isDarkTheme} toggle={setIsDarkTheme} />
                <div className="dropdown">
                    <button onClick={onLoginClick}>Sign in with Google</button>
                </div>
                </>
            )}
        </div>
    </nav>
    )
}

export default Navbar