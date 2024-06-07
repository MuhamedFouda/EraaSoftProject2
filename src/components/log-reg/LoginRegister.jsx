import { useState } from "react";
import Socialmediaicons from "../socialMediaIcons/Socialmediaicons.jsx";
import "./LoginRegister.css";
const LoginRegister = () => {
  const [addclass, setaddclass] = useState("");
  return (
    <div className={`container ${addclass}`} id="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h1 className="title">Create Account</h1>
            <div className="input-field">
              <input type="email" placeholder="EMAIL" />
            </div>
            <div className="input-field">
              <input type="password" placeholder="PASSWORD" />
            </div>
            <button type="submit">REGISTER</button>
            <div className="social_links">
              <p className="social-text">Or Sign in with social platforms</p>
              <Socialmediaicons />
            </div>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form>
            <h1>Login</h1>
            <input type="email" placeholder="EMAIL" />
            <input type="password" placeholder="PASSWORD" />
            <button type="submit">LOGIN</button>
          </form>
        </div>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <button
              className="ghost"
              id="signIn"
              onClick={() => setaddclass("")}
            >
              GO TO LOGIN
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <button
              className="ghost"
              id="signUp"
              onClick={() => setaddclass("right-panel-active")}
            >
              GO TO REGISTER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
