import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import './App.css';

function App() {
  const [role, setRole] = useState(null);
  return (
    <div>
      {!role 
        ? <Login setRole={setRole} />
        : <Dashboard role={role} setRole={setRole} />}
    </div>
  );
}

export default App;
