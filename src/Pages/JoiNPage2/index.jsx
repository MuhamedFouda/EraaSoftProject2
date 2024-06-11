import { Formik, Form, Field, ErrorMessage } from 'formik';

import { FaUser, FaLock, FaPhone } from "react-icons/fa";
import Socialmediaicons from "../../components/socialMediaIcons/Socialmediaicons";
import "./index.scss";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { $Domain } from "../../store/atom";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import img from "../../assets/EraaSoft3.png";
import axios from "axios";
import JoinSchema from '../../Schemas/JoinSchema';
import Error from '../../components/validaterror';


export default function JoiNPage2() {
    const [joinType, setjoinType] = useState();
    const [Domain] = useRecoilState($Domain);
    const email = useRef();
    const password = useRef();
    const password_confirmation = useRef();
    const name = useRef();
    const phone = useRef();
    const navigate = useNavigate();

    const [values, setvalues] = useState()
    console.log(values)
    // const handleChange = () => {
    //     let email_value = values.email;
    //     let pattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{3,}\b/;
    //     let email_valid = pattern.test(email_value);
    //     if (email_valid) {
    //         // valid email pattern
    //         console.log(email_valid)
    //         searchMail(email_value);
    //     } else {
    //         //incorrect email pattern
    //         setjoinType();
    //     }
    // };

    function searchMail() {
        console.log(values.email)
        console.log(Domain.base + "/api/auth/check-email");
        axios.post(
            Domain.base + "/api/auth/check-email",
            {
                email: values.email,
            },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => {
                if (res.data.data) {
                    //email found in our sys. Invoke to login
                    setjoinType("login");
                    join();
                    toast.success(`Your Email Exisit , Sign In`, { theme: "dark" });
                } else {
                    //email not found in our sys. Invoke to registration
                    setjoinType("register");
                    join();
                    toast.error(`Your Email don't Exisit , Please Sign Up`, {
                        theme: "dark",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function join() {
        if (joinType == "login") {
            login();
        } else if (joinType == "register") {
            register();

        }
    }


    function login(values) {
        axios
            .post(
                Domain.base + "/api/auth/login",
                {
                    email: values.email,
                    password: values.password,
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
                toast.success("you login now",{ theme: "dark" });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function register() {
        axios
            .post(
                Domain.base + "/api/auth/register",
                {
                    email: values.email,
                    name: values.name,
                    phone: values.phone,
                    password: values.password,
                    password_confirmation: values.password_confirmation,
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
                toast.success(res.data.message, { theme: "dark" });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <div className='joinPage' id='joinPage'>
            <div className='joinForm col-lg-6 col-md-6 col-sm-12 px-4 '>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        name: '',
                        phone: '',
                        password_confirmation: '',

                    }}
                    validationSchema={JoinSchema}
                    onSubmit={(values) => {
                        setvalues(values);
                        searchMail();
                    }}
                    method="POST">
                    <Form className='form'>
                        <div className="input-field">
                            <i>
                                <FaUser />
                            </i>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Email"
                                ref={email}
                            />
                        </div>
                        <Error>
                            <ErrorMessage name='email' />
                        </Error>
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
                                <input type="submit" value="Login" className="btn solid" onClick={() => { setvalues({ ...values }, values.password) }}/>
                            </>
                        ) : joinType == "register" ? (
                            <>
                                <div className="input-field">
                                    <i>
                                        <FaUser />
                                    </i>
                                    <Field type="text" name="name" ref={name} placeholder="Username" />
                                </div>
                                <div className="input-field">
                                    <i>
                                        <FaPhone />
                                    </i>
                                    <Field type="text" name="phone" ref={phone} placeholder="Phone" />
                                </div>
                                <div className="input-field">
                                    <i>
                                        <FaLock />
                                    </i>
                                    <Field
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
                                    <Field
                                        type="password"
                                        name="password_confirmation"
                                        ref={password_confirmation}
                                        placeholder="Confirm Password"
                                    />
                                </div>
                                <input type="submit" value="Register" className="submit" onClick={() => { setvalues({ ...values }, values.email) }} />
                            </>
                        ) : null}
                    </Form>
                </Formik>
                <Socialmediaicons />
            </div>
            <div className='joinPanel col-lg-6  col-md-6 col-sm-12 '>
                <img src={img} />
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
                    </div>
                </div>
            </div>

        </div>
    )
}
