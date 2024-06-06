import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import Socialmediaicons from "../../components/socialMediaIcons/Socialmediaicons";
import { useNavigate } from "react-router-dom";
import img from "../../assets/EraaSoft3.png"


export default function JoinPage(){
  const navigate = useNavigate();


  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
              <h2 className="title">Sign UP</h2>

            <div className="input-field">
              <i>
                <FaUser />
              </i>
              <input
                type="text"
                placeholder="Username"
              />
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

      <div className="panels-container">
        <div className="panel left-panel">
        <img src={img}/>
          <div className="content">
            <h3>Sign In</h3>
            <p>
              Register with your personal details to use all of site features
            </p>
            <button className="btn transparent" id="sign-up-btn" onClick={()=>{navigate('/login')}}>
              Sign In
            </button>
          </div>
          {/* <img src="img/log.svg" className="image" alt="" /> */}
        </div>
      </div>
    </div>
  );
};


