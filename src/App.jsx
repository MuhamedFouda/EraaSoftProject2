import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoinPage from "./Pages/Join/Container.jsx";
import LoginPage from "./Pages/Login/Login.jsx";
import Register from './Pages/Register/Register';


export default function App() {
  return (
    <div className="col-12 App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<LoginPage />} />
            <Route path="join" element={<JoinPage />} />
            {/* <Route path="join/:join_type" element={<JoinPage />} /> */}
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
        <ToastContainer
          autoClose={1500}
          hideProgressBar={false}
          theme="light"
          limit={1}
        />
      </BrowserRouter>
    </div>
  );
}
