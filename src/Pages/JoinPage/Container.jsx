import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import Socialmediaicons from "../../components/socialMediaIcons/Socialmediaicons";
import "./index.scss";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { $Users } from "../../store/atom";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import img from "../../assets/EraaSoft3.png";

export default function JoinPage() {
  const params = useParams();
  const [joinType, setjoinType] = useState();
  const [Users] = useRecoilState($Users);
  const email = useRef();
  const password = useRef();
  const re_password = useRef();

  const navigate = useNavigate();

  const handleChange = () => {
    let email_value = email.current.value;
    let pattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{3,}\b/;
    let email_valid = pattern.test(email_value);
    if (email_valid) {
      // valid email pattern
      searchMail(email_value);
    } else {
      //incorrect email pattern
      setjoinType();
    }
  };

  function searchMail(email) {
    let emailIndex = Users.findIndex((user) => {
      return user.email.toLowerCase() == email.toLowerCase();
    });
    if (emailIndex == -1) {
      //email not found in our sys. Invoke to registration
      setjoinType("register");
      // alert("register");
      toast.error(`Your Email does not Exist , Please Sign Up`, { theme: "dark" })
    } else {
      //email found in our sys. Invoke to login
      setjoinType("login");
      toast.success(`Your Email Exist , Sign In`, { theme: "dark" })
      // alert("login");
    }
  }

  // useEffect(() => {
  //   if (params.join_type == "register") {
  //     setjoinType("register");
  //   } else if (params.join_type == "login") {
  //     setjoinType("login");
  //   } else if (params.join_type == undefined) {
  //     console.log(params.join_type);
  //   } else {
  //     navigate("/page404");
  //   }
  // }, []);

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            {joinType == "login" ? (
              <h2 className="title">login</h2>
            ) : joinType == "register" ? (
              <h2 className="title">Register</h2>
            ) : null}

            <div className="input-field">
              <i> <FaUser /> </i>
              <input
                type="text"
                placeholder="Username"
                ref={email}
                onChange={handleChange}
              />
            </div>
            {joinType == "login" ? (
              <>
                <div className="input-field">
                  <i>
                    <FaLock />
                  </i>
                  <input type="password" placeholder="Password" />
                </div>
                <input type="submit" value="Login" className="btn solid" />
              </>
            ) : joinType == "register" ? (
              <>
                <div className="input-field">
                  <i>
                    <FaLock />
                  </i>
                  <input type="password" placeholder="Password" />
                </div>
                <div className="input-field">
                  <i>
                    <FaLock />
                  </i>
                  <input type="password" placeholder="Retype Password" />
                </div>
                <input type="submit" value="Register" className="btn solid" />
              </>
            ) : null}

            <Socialmediaicons />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <img src={img} />
          <div className="content">
            <h3>Welcome at EraaSoft</h3>
            <p>
              Join Us with your personal details to use all of site features
            </p>
            <div className="buttons">
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign In
              </button>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Sign up
              </button>
            </div>
          </div>
          {/* <img src="img/log.svg" className="image" alt="" /> */}
        </div>
      </div>
    </div>
  );
}
