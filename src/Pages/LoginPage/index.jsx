import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import Socialmediaicons from "../../components/socialMediaIcons/Socialmediaicons";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import img from "../../assets/EraaSoft3.png";

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="container" id="LoginPage">
      <div className="blue-area"></div>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">login</h2>

            <div className="input-field">
              <i>
                <FaUser />
              </i>
              <input type="text" placeholder="Username" />
            </div>

            <div className="input-field">
              <i>
                <FaLock />
              </i>
              <input type="password" placeholder="Password" />
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
                navigate("/register");
              }}>
              Sign up
            </button>
          </div>
          {/* <img src="img/log.svg" className="image" alt="" /> */}
        </div>
      </div>
      {
        // joinType == "login" ? <Login /> : (joinType == "register" ? <SignUp /> : null)
      }
    </div>
  );
}
