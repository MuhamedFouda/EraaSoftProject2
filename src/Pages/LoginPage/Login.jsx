import { FaLock, FaEnvelope } from "react-icons/fa";
import Socialmediaicons from "../../components/socialMediaIcons/Socialmediaicons";
import "./Login.scss";
import { useEffect, useState } from "react";
//import img from "../../assets/EraaSoft3.png"

const Login = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
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
    const isEmailValid =
      erroMessage.email === "" && erroMessage.password === "";
    const isAnyFieldEmpty = Object.values(userInput).some(
      (item) => item === ""
    );
    setDisableButton(!isEmailValid || isAnyFieldEmpty);
  }, [userInput, erroMessage]);

  return (
    <div className="signin">
      <h2 className="title">Sign in</h2>
      <form className="signin-form" onSubmit={handleSubmit}>
        <div className="input-field">
          <label>Email</label>
          <FaEnvelope/>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={userInput.email}
          />
        </div>
        <span className="errMessage">{erroMessage.email}</span>
        <br />
        <div className="input-field">
          <label>Password</label>
          <FaLock/>
          <input
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            name="password"
            value={userInput.password}
          />
        <span className="show-password" onClick={() => setShowPassword(!showPassword)}> 👀 </span>
        </div>
        <span className="errMessage">{erroMessage.password}</span>
        <button className="submit-btn" type="submit" disabled={disableButton}>Login</button>
      </form>
      <div className="social-login">
        <Socialmediaicons />
      </div>
    </div>
  );
};

export default Login;
