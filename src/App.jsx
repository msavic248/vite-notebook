import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from "./supabaseClient";
import Notes from "./components/Notes";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  

  async function checkUserOnStartUp() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUserEmail(user.email)
    } catch(error) {
      console.error(error)
    } finally {
      if(userEmail != "") {
        setLoggedIn(true);
      }
    }
  }

  useEffect(() => {
    checkUserOnStartUp();
  })

  

  async function handleLoginClick() {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      setLoggedIn(true);
      
    } catch(error) {
      console.error(error)
    }
  };

  async function handleLogoutClick() {
    try {
      await supabase.auth.signOut();

      setLoggedIn(false);
      setUserEmail("");
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <div className="app">
      <h1>Vite Notebook</h1>
      
      {loggedIn ? (
        <div>
          <p>Welcome {userEmail}</p>
          <button onClick={handleLogoutClick}>Sign out</button>
          <Notes />
        </div>
      ) : (
        <button onClick={handleLoginClick}>Sign in with Google</button>
      )}

    </div>
  )
}

export default App
