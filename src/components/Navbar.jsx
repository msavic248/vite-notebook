import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Expand } from "@theme-toggles/react";

function Navbar(props) {
    const {user, loggedIn, onLoginClick, onLogoutClick} = props;
    const [isLightTheme, setIsLightTheme] = useState(false);

    useEffect(() => {
        const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

        if(prefersLight) {
            setIsLightTheme(true);
        }
    }, []);

    useEffect(() => {
        if(isLightTheme) {
            document.body.classList.add("light");
            document.querySelector("nav").classList.add("light");
            document.querySelector(".notetext").classList.add("light");
        } else {
            document.body.classList.remove("light");
            document.querySelector("nav").classList.remove("light");
            document.querySelector(".notetext").classList.remove("light");
        }
    }, [isLightTheme]);

    return (<nav>
        <h1>Vite Notebook</h1>
        <div className="nav-options">
            {loggedIn ? (
                <>
                <h2>
                    <Link to="/">Home</Link>
                </h2>
                <Expand reversed toggled={isLightTheme} toggle={setIsLightTheme} />
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
                <Expand toggled={isLightTheme} toggle={setIsLightTheme} />
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