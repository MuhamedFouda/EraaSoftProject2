import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./Pages/LoginPage/Login.jsx";

export default function App() {
  return (
    <div className="col-12 App">
      <Login />
    </div>
  );
}
