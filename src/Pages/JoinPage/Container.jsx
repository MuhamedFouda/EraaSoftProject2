import { FaUser, FaLock, FaPhone } from "react-icons/fa";
import Socialmediaicons from "../../components/socialMediaIcons/Socialmediaicons";
import "./index.scss";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { $Domain } from "../../store/atom";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import img from "../../assets/EraaSoft3.png"

export default function JoinPage() {
  const params = useParams();
  const [joinType, setjoinType] = useState();
  const [Domain] = useRecoilState($Domain);
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
      toast.error(`Your Email don't Exisit , Please Sign Up`, { theme: "dark" })
    } else {
      //email found in our sys. Invoke to login
      setjoinType("login");
      toast.success(`Your Email Exisit , Sign In`, { theme: "dark" })
      // alert("login");
    }
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
            "Accept": "application/json",
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
    <div className="container" id="join-container">
      <div className="forms-container">
        <div className="signin-signup">
          <form
            onSubmit={(event) => {
              join();
              event.preventDefault();
            }}
            method="POST"
            className="sign-in-form"
          >
            {joinType == "login" ? (
              <h2 className="title">login</h2>
            ) : joinType == "register" ? (
              <h2 className="title">Register</h2>
            ) : null}

            <div className="input-field">
              <i> <FaUser /> </i>
              <input
                type="text"
                name="email"
                placeholder="Email"
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
                  <input
                    type="password"
                    name="password"
                    ref={password}
                    placeholder="Password"
                  />
                </div>
                <input type="submit" value="Login" className="btn solid" />
              </>
            ) : joinType == "register" ? (
              <>
                <div className="input-field">
                  <i>
                    <FaUser />
                  </i>
                  <input type="text" name="name" ref={name} placeholder="Username" />
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
                    name="password"
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
