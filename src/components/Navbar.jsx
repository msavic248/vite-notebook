
function Navbar(props) {
    const {loggedIn, onLoginClick, onLogoutClick} = props;

    return (<nav>
        <h1>Vite Notebook</h1>
        {loggedIn ? (
            <button onClick={onLogoutClick}>Sign out</button>
        ) : (
            <button onClick={onLoginClick}>Sign in with Google</button>
        )}
    </nav>
    )
}

export default Navbar