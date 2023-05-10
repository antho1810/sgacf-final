import './App.css';
import { Routes, Route, Navigate } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"

import Login from "./components/login/Login";
import Dashboard from "./components/App/dashboard/Dashboard.jsx"

function App() {
const user = localStorage.getItem("token")
  return (
    <Routes>
      <Route path="/login" exact element={<Login />} />
      {user && <Route path="/" exact element={<Dashboard />} />}
      <Route path="/" exact element={<Navigate to="/login" replace={true} />} />
    </Routes>

  );
}

export default App;
