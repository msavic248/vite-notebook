import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from "./supabaseClient";
import Navbar from './components/Navbar';
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
      <Navbar loggedIn={loggedIn} onLoginClick={handleLoginClick} onLogoutClick={handleLogoutClick}/>
      
      {loggedIn ? (
        <div>
          <h3>Welcome {userEmail}</h3>
          <Notes />
        </div>
      ) : (
        <div>
          <h3>Welcome Guest</h3>
          <p>Please sign in to view notes</p>
        </div>
      )}

    </div>
  )
}

export default App
