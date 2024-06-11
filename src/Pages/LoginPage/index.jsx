import { useState, useRef } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import Socialmediaicons from "../../components/socialMediaIcons/Socialmediaicons";
import "./login.scss";
import { useRecoilState } from "recoil";
import { $Domain } from "../../store/atom";
import { useNavigate } from "react-router-dom";
import img from "../../assets/EraaSoft3.png";
import axios from "axios";
import { toast } from "react-toastify";

export default function LoginPage() {
  const email = useRef();
  const password = useRef();
  const [Domain] = useRecoilState($Domain);

  const navigate = useNavigate();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  function login() {
    axios
      .post(
        Domain.base + "/api/auth/login",
        {
          email: email.current.value,
          password: password.current.value,
        },{
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        //email found in our sys. Invoke to login
        console.log(res.data.data);
        toast.success(res.data.message, { theme: "dark" });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={` ${isFullScreen ? "full-screen" : ""}`} id="LoginPage">
      <div className={` ${isFullScreen ? "full-screen" : "blue-area"}`}></div>
      <div className="forms-container">
        <div className="signin-signup">
          <form
            onSubmit={(event) => {
              login();
              event.preventDefault();
            }}
            method="POST"
            className={`sign-in-form ${isFullScreen ? "d-none" : ""}`}
          >
            <h2 className="title">login</h2>

            <div className="input-field">
              <i>
                <FaUser />
              </i>
              <input type="text" name="email" ref={email} placeholder="Email" />
            </div>

            <div className="input-field">
              <i>
                <FaLock />
              </i>
              <input
                type="password"
                name="password"
                ref={password}
                placeholder="Password"
              />
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
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
