import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from "./supabaseClient";
import Navbar from './components/Navbar';
import Notes from "./components/Notes";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  async function checkUserOnStartUp() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log(user)
      setUser(user);
      
    } catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    checkUserOnStartUp();

  }, [])

  useEffect(() => {
    if(user != null){
      setLoggedIn(true)
    }
  }, [user])

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

      setLoggedIn(false)
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <div className="app">
      <Navbar user={user} loggedIn={loggedIn} onLoginClick={handleLoginClick} onLogoutClick={handleLogoutClick}/>
      
      {loggedIn ? (
        <div>
          <h3>Welcome {user.identities[0].identity_data.name}</h3>
          <Notes user={user}/>
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
