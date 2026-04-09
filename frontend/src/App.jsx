import './App.css'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useState, useEffect } from 'react';

function App() {
  
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);


  if (!user) return <Login setUser={setUser} />;

  return <Dashboard user={user} />;
}


export default App
