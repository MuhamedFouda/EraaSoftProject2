//import React from "react";
import "./style.scss";
import { FaFacebookF, FaGoogle, FaGithub, FaLinkedinIn } from "react-icons/fa6";

const Socialmediaicons = () => {
  return (
    <div className="social-media">
      <p className="social-text">Or sign with social platforms</p>
      <div className="social-icon">
        <span className="sym"><FaFacebookF />  </span>
        <span className="sym"><FaGithub />     </span>
        <span className="sym"><FaLinkedinIn /> </span>
        <span className="sym"><FaGoogle />     </span>
      </div>
    </div>
  );
};

export default Socialmediaicons;
