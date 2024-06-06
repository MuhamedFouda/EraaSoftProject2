// import React from "react";
// import LoginRegister from "./components/log-reg/LoginRegister";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoinPage from "./Pages/JoinPage/Container.jsx";
import Login from "./Pages/LoginPage/index.jsx";
import SignUp from "./Pages/SignUpPage/index.jsx";

export default function App() {
  return (
    <div className="col-12 App"> 
    <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login/>} />
            <Route path="join" element={<JoinPage />} />
            {/* <Route path="join/:join_type" element={<JoinPage />} /> */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<SignUp/>} />
          </Route>
        </Routes>
        <ToastContainer autoClose={1500} hideProgressBar={false} theme="light" limit={1} />

      </BrowserRouter>   
    </div>      
  );
}

