
import { FaUser, FaLock, FaPhone } from "react-icons/fa";
import Socialmediaicons from "../../components/socialMediaIcons/Socialmediaicons";
import "./Join.scss";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { $Domain } from "../../store/atom";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import img from "../../assets/EraaSoft3.png";
import img2 from "../../assets/register.svg";
import axios from "axios";


export default function JoiNPage3() {
    const [joinType, setjoinType] = useState();
    const [Domain] = useRecoilState($Domain);
    const email = useRef();
    const password = useRef();
    const password_confirmation = useRef();
    const name = useRef();
    const phone = useRef();
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
        axios.post(
            Domain.base + "/api/auth/check-email",
            {
                email: email,
            },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => {
                console.log(res.data.data);
                if (res.data.data) {
                    //email found in our sys. Invoke to login
                    setjoinType("login");
                    toast.success(`Your Email Exisit , Sign In`, { theme: "dark" });
                } else {
                    //email not found in our sys. Invoke to registration
                    setjoinType("register");
                    toast.error(`Your Email don't Exisit , Please Sign Up`, {
                        theme: "dark",
                    });
                }
            })
            .catch((err) => {
                console.log("emailCheck Error" + err);
            });
    }

    function join() {
        if (joinType == "login") {
            login();
        } else if (joinType == "register") {
            register();
        }
    }

    function login() {
        axios
            .post(
                Domain.base + "/api/auth/login",
                {
                    email: email.current.value,
                    password: password.current.value,
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
                localStorage.setItem('token', res.data.data.token)
                toast.success(res.data.message, { theme: "dark" });
            })
            .catch((err) => {
                console.log("Login erroe" + err);
            });
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

    let token = localStorage.getItem('token')
    // function logOut() {
    //     axios
    //     .post(
    //         Domain.base + "/api/auth/logout",
    //         {
    //         },
    //         {
    //             headers: {
    //                 "Accept": "application/json",
    //                 "Content-Type": "application/json",
    //                 'Authorization': 'Bearer'+token,
    //             },
    //         }
    //     )
    //     .then((res) => {
    //             console.log(res)
    //             localStorage.removeItem('token')
    //             toast.success(" you logged out now", { theme: "dark" });


    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    return (
        <div className='joinPage' id='joinPage'>
            <div className='joinForm col-lg-6 col-md-6 col-sm-12 px-4 '>
                <form className='form' onSubmit={(event) => {
                    join();
                    event.preventDefault();
                }}>
                    {/* {joinType == "login" ? (
                        <h2 className="title">LOGIN</h2>
                    ) : joinType == "register" ? (
                        <h2 className="title">REGISTER</h2>
                    ) : null} */}
                    <div className="input-field">
                        <i>
                            <FaUser />
                        </i>
                        <input
                            type="email"
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
                            <button type="submit" value="Register" className="submit" > login</button>
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
                                    name="password_register"
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
                            <button type="submit" value="Register" className="submit" > Register</button>
                        </>
                    ) : null}
                </form>
                <Socialmediaicons />
            </div>
            <div className='joinPanel col-lg-6  col-md-6 col-sm-12 '>
                <img src={img} className="logo-img"/>
                <div className="content">
                    <h3>Welcome at EraaSoft</h3>
                    <p>
                        Join Us with your personal details to use all of site features
                    </p>
                    <div className="buttons">
                        <button
                            className="btn btn-light"
                            id="sign-In-btn">
                            Sign In
                        </button>
                        <button
                            className="btn btn-light "
                            id="sign-up-btn">
                            Sign up
                        </button>
                        {/* <button
                            className="btn btn-light "
                            id="sign-up-btn"
                            onClick={logOut}
                        >
                            log out
                        </button> */}
                    </div>
                </div>
                <img src={img2} className="absolute"/>
            </div>

        </div>
    )
}
