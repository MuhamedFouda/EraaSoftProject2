import { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import Socialmediaicons from "../../components/socialMediaIcons/Socialmediaicons";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import img from "../../assets/EraaSoft3.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={` ${isFullScreen ? "full-screen" : ""}`} id="LoginPage">
      <div className={` ${isFullScreen ? "full-screen" : "blue-area"}`}></div>
      <div className="forms-container">
        <div className="signin-signup">
          <form
            action="#"
            className={`sign-in-form ${isFullScreen ? "d-none" : ""}`}>
            <h2 className="title">login</h2>

            <div className="input-field">
              <i>
                <FaUser />
              </i>
              <input type="text" name="email" placeholder="Email" />
            </div>

            <div className="input-field">
              <i>
                <FaLock />
              </i>
              <input type="password" name="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btn solid" />

            <Socialmediaicons />
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <img src={img} />
          <div className="content">
            <h3>Not a member?</h3>
            <p>Join our community and discover more!</p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={() => {
                toggleFullScreen();
                setTimeout(() => {
                  navigate("/register");
                }, 1000);
              }}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
