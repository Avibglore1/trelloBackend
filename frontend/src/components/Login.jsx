import React, { useState } from 'react';
import axios from 'axios';

function Login({setUser}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async() =>{
        const res = await axios.post("http://localhost:5000/login",{
            username,password
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data)
    }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl mb-4 font-bold">Login</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="username (admin / poorti / avinash)"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-4"
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white w-full py-2 rounded"
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login