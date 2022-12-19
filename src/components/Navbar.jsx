import { Link } from "react-router-dom";

function Navbar(props) {
    const {user, loggedIn, onLoginClick, onLogoutClick} = props;

    return (<nav>
        <h1>
            <Link to="/">Home</Link>
        </h1>
        {loggedIn ? (
            <div className="dropdown">
                <img src={user.identities[0].identity_data.avatar_url} width="32px" height="32px"/>
                <div className="dropdown-content">
                    <p>Profile</p>
                    <p>Settings</p>
                    <button onClick={onLogoutClick}>Sign out</button>
                </div>
            </div>
            
        ) : (
            <button onClick={onLoginClick}>Sign in with Google</button>
        )}
    </nav>
    )
}

export default Navbar