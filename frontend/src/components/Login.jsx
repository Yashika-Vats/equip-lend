import { useState } from "react";
import axios from "axios";

function Login({ setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if(!username || !password) return alert("Enter username and password");
    axios.post("http://localhost:8080/api/users/login", { username, password })
      .then(res => {
        if(res.data !== "invalid") setRole(res.data);
        else alert("Invalid credentials");
      })
      .catch(err => console.error(err));
  };

  const signup = () => {
    if(!username || !password) return alert("Enter username and password");
    axios.post("http://localhost:8080/api/users/signup", { username, password, role: "student" })
      .then(res => {
        if(res.data === "exists") alert("User exists");
        else alert("Signup successful! You can now login.");
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="card">
      <h1>Login</h1>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <button onClick={signup}>Signup</button>
    </div>
  );
}

export default Login;
