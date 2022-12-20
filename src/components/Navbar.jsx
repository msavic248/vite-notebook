import { Link } from "react-router-dom";

function Navbar(props) {
    const {user, loggedIn, onLoginClick, onLogoutClick} = props;

    return (<nav>
        <h1>Vite Notebook</h1>
        <div className="nav-options">
            {loggedIn ? (
                <>
                <h2>
                    <Link to="/">Home</Link>
                </h2>
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
                <div className="dropdown">
                    <button onClick={onLoginClick}>Sign in with Google</button>
                </div>
            )}
        </div>
    </nav>
    )
}

export default Navbar