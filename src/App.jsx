import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from "./supabaseClient";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  async function checkUserOnStartUp() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUserEmail(user.email)
    if(userEmail != "") {
      setLoggedIn(true);
    }
  }

  useEffect(() => {
    checkUserOnStartUp();
  })

  async function handleLoginClick() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    setLoggedIn(true);
  };

  async function handleLogoutClick() {
    await supabase.auth.signOut();

    setLoggedIn(false);
    setUserEmail("");
  }

  return (
    <div className="App">
      <h1>Notes</h1>
      {loggedIn ? (
        <div>
          <p>Welcome {userEmail}</p>
          <button onClick={handleLogoutClick}>Sign out</button>
        </div>
      ) : (
        <button onClick={handleLoginClick}>Sign in with Google</button>
      )}
    </div>
  )
}

export default App
