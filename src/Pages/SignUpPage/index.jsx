import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import Socialmediaicons from "../../components/socialMediaIcons/Socialmediaicons";
import { useNavigate } from "react-router-dom";
import img from "../../assets/EraaSoft3.png";
import "./register.scss";
export default function Register() {
  const navigate = useNavigate();
  return (
    <div className="container" id="Register">
      <div className="blue-area "></div>
      <div className="panels-container">
        <div className="panel">
          <img src={img} />
          <div className="content">
            <h3>Welcome to our community</h3>
            <p>Already have an account?</p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={() => {
                navigate("/login");
              }}>
              Sign In
            </button>
          </div>
        </div>
      </div>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign UP</h2>

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
    </div>
  );
}
