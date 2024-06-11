import { FaLock, FaEnvelope } from "react-icons/fa";
import Socialmediaicons from "../../components/socialMediaIcons/Socialmediaicons";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import loginpic from "../../assets/loginPIC.svg";

const Login = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const emailFocus = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  /**using it as diving <<--->> Lt to Rt and viceversa*/
  const [isFullScreen, setIsFullScreen] = useState(false);
  function toggleFullScreen() {
    setIsFullScreen(!isFullScreen);
  }
  const [erroMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
    validateValue(e.target.name, e.target.value);
  };
  /**validateValue function take filedName and its value to validate the new visible controls
   * @param fieldName the intended control name, @param value the value entered by user in This control
   */
  const validateValue = (fieldName, value) => {
    let errorMessage = "";
    switch (fieldName) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errorMessage = emailRegex.test(value) ? "" : "Invalid Email format";
        break;
      case "password":
        const passwordRegex = /^(?=.*[a-z])/;
        errorMessage = passwordRegex.test(value)
          ? ""
          : "Password is not in proper format";
        break;
      default:
        break;
    }
    setErrorMessage({
      ...erroMessage,
      [fieldName]: errorMessage,
    });
  };
  /**
   * reset function is used to clear the controls
   */
  const resetForm = () => {
    setUserInput({
      email: "",
      password: "",
    });
  };
  const handleSubmit = (e) => {
    // prevents the form from actually submitting, giving you a chance to validate or
    // process the input before submitting it to the server or updating the state of your
    // React component
    e.preventDefault();
    let response = true; // API code
    if (response) {
      resetForm();
    } else {
      alert("There is some issue");
    }
  };
  useEffect(() => {
    emailFocus.current.focus();
  }, []);

  useEffect(() => {
    const isEmailValid =
      erroMessage.email === "" && erroMessage.password === "";
    const isAnyFieldEmpty = Object.values(userInput).some(
      (item) => item === ""
    );
    setDisableButton(!isEmailValid || isAnyFieldEmpty);
  }, [userInput, erroMessage]);

  return (
    <div className="main">
      <div className="signin">
        <h2 className="title">Sign in</h2>
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="input-field">
            <FaEnvelope className="icon" />
            <input
              onChange={handleChange}
              type="email"
              name="email"
              value={userInput.email}
              ref={emailFocus}
              placeholder="email"
            />
          </div>
          <span className="errMessage">{erroMessage.email}</span>
          <br />
          <div className="input-field">
            <FaLock className="icon" />
            <input
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="password"
              value={userInput.password}
              placeholder="password"
            />
            <span
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {" "}
              👀{" "}
            </span>
          </div>
          <span className="errMessage">{erroMessage.password}</span>
          <button
            className="submit-btn"
            type="submit"
            disabled={disableButton}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          >
            Login
          </button>
        </form>
        <div className="social-login">
          <Socialmediaicons />
        </div>
      </div>
      <div className="panel-container">
        <div className="right-panel">
          <div className="content">
            <h1>welcome back</h1>
            <p className="tip">Login with your Email to use all of site features</p>
            <button
              className="signup-btn"
              id="register"
              onClick={() => {
                toggleFullScreen();
                setTimeout(() => {
                  navigate("/register");
                }, 1000);
              }}
            >
              Sign Up
            </button>
          </div>
          <img src={loginpic} alt="login image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
