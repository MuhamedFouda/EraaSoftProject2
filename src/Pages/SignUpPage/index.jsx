import { useState, useRef } from "react";
import { FaUser, FaLock, FaPhone } from "react-icons/fa";
import Socialmediaicons from "../../components/socialMediaIcons/Socialmediaicons";
import { useNavigate } from "react-router-dom";
import img from "../../assets/EraaSoft3.png";
import "./register.scss";
import { useRecoilState } from "recoil";
import { $Domain } from "../../store/atom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
  const [Domain] = useRecoilState($Domain);
  const email = useRef();
  const password = useRef();
  const password_confirmation = useRef();
  const name = useRef();
  const phone = useRef();

  const navigate = useNavigate();
  const [isFullScreen, setIsFullScreen] = useState(false);

  function toggleFullScreen() {
    setIsFullScreen(!isFullScreen);
  }

  function register() {
    axios
      .post(
        Domain.base + "/api/auth/register",
        {
          email: email.current.value,
          name: name.current.value,
          phone: phone.current.value,
          password: password.current.value,
          password_confirmation: password_confirmation.current.value,
        },
        {
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

  function logout() {
    axios
      .post(
        Domain.base + "/api/auth/logout",
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer 6|jB1jOpueKqQOxwJhLRUBYOkZ1Le4n4JJvGFx8mBL35564100",
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
    <div className={` ${isFullScreen ? "full-screen" : ""}`} id="Register">
      <div className={` ${isFullScreen ? "full-screen" : "blue-area"}`}></div>
      <div className="panels-container">
        <div className="panel">
          <img src={img} />
          <div className="content">
            <h3>Welcome to our community</h3>
            <p>Already have an account?</p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={() => {
                toggleFullScreen();
                setTimeout(() => {
                  navigate("/login");
                }, 1000);
              }}
            >
              Sign In
            </button>

            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={() => {
                logout();
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
      <div className="forms-container">
        <div className={`signin-signup ${isFullScreen ? `d-none` : null}`}>
          <form
            onSubmit={(event) => {
              register();
              event.preventDefault();
            }}
            method="POST"
            className="sign-in-form"
          >
            <h2 className="title">Sign Up</h2>

            <div className="input-field">
              <i>
                <FaUser />
              </i>
              <input type="text" name="email" ref={email} placeholder="Email" />
            </div>
            <div className="input-field">
              <i>
                <FaUser />
              </i>
              <input type="text" name="name" ref={name} placeholder="Usename" />
            </div>
            <div className="input-field">
              <i>
                <FaPhone />
              </i>
              <input type="text" name="phone" ref={phone} placeholder="Phone" />
            </div>
            <div className="input-field">
              <i>
                <FaLock />
              </i>
              <input
                type="password"
                name="passowrd"
                ref={password}
                placeholder="Password"
              />
            </div>
            <div className="input-field">
              <i>
                <FaLock />
              </i>
              <input
                type="password"
                name="password_confirmation"
                ref={password_confirmation}
                placeholder="Confirm Password"
              />
            </div>
            <input type="submit" value="Sign Up" className="btn solid" />

            <Socialmediaicons />
          </form>
        </div>
      </div>
    </div>
  );
}
