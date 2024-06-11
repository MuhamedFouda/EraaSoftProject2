import { useState, useRef } from "react";
import { FaUser, FaLock, FaPhone, FaEnvelope } from "react-icons/fa";
import Socialmediaicons from "../../components/socialMediaIcons/Socialmediaicons";
import { Formik } from "formik";
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
            Authorization:
              "Bearer 6|jB1jOpueKqQOxwJhLRUBYOkZ1Le4n4JJvGFx8mBL35564100",
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
    <div className="col-12 p-5" id="Register">
      <img src={img} alt="" className="logo" />
      <form
        className="col-5"
        onSubmit={(event) => {
          register();
          event.preventDefault();
        }}
        method="POST">
        <h1>Sign Up</h1>
        <div className="input-field">
          <FaEnvelope />
          <input
            type="email"
            placeholder="Email"
            ref={email}
            className="col-12"
          />
        </div>
        <div className="input-field">
          <FaUser />
          <input type="text" ref={name} placeholder="Username" />
        </div>
        <div className="input-field">
          <FaPhone />
          <input type="number" ref={phone} placeholder="Phone" />
        </div>
        <div className="input-field">
          <FaLock />
          <input type="password" ref={password} placeholder="Password" />
        </div>
        <div className="input-field">
          <FaLock />
          <input
            type="password"
            ref={password_confirmation}
            placeholder="confirm password"
          />
        </div>
        <button className="submitBtn">Sign Up</button>
        <Socialmediaicons />
      </form>
      <div className={`${isFullScreen ? `full-Screen` : `blueArea`}`}></div>
      <div className="content position-absolute d-flex justify-content-center align-items-center flex-column gap-3">
        <h3>Welcome to our community</h3>
        <p>Already have an account?</p>
        <button
          onClick={() => {
            setIsFullScreen(true);
            setTimeout(() => {
              navigate("/login");
            }, 500);
          }}>
          Sign in
        </button>
      </div>
    </div>
  );
}
