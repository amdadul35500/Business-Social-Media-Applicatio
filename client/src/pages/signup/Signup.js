import React, { useState, useEffect } from "react";
import "./signup.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyIcon from "@mui/icons-material/Key";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { NavLink, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config";
import CircularProgress from "@mui/material/CircularProgress";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useGlobalContext } from "../../context/context";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [business, setBusiness] = useState("");
  const [usernameerror, setUsernameerror] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [businessError, setBusinessError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useGlobalContext();

  const GOOGLE_CLIENT_ID =
    "1034266394471-jbgsc0o8srtusgvd6dlcd17ssl1b06cp.apps.googleusercontent.com";

  const handleSignUp = async (e) => {
    e.preventDefault();
    const userInfo = {
      username,
      email,
      password,
      business,
    };

    try {
      setLoading(true);
      const { data } = await axiosInstance.post("api/auth/signup", userInfo);
      if (data) {
        setUsername("");
        setEmail("");
        setPassword("");
        setBusiness("");
      }
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      setLoading(false);

      setUsernameerror(
        error.response.data["username"] ? error.response.data.username.msg : ""
      );
      setEmailError(
        error.response.data["email"] ? error.response.data.email.msg : ""
      );
      setPasswordError(
        error.response.data["password"] ? error.response.data.password.msg : ""
      );
      setBusinessError(
        error.response.data["business"] ? error.response.data.business.msg : ""
      );
      console.log(error);
    }
  };

  const onSuccess = async (res) => {
    try {
      const response = await axiosInstance.post("api/auth/signin/google", {
        username: res.profileObj.name,
        email: res.profileObj.email,
        images: res.profileObj.imageUrl,
        profileId: res.profileObj.googleId,
      });

      localStorage.setItem("token", JSON.stringify(response.data[1]));
      const { data } = await axiosInstance.get(
        `api/users/currentUser/?email=${res.profileObj.email}`
      );
      setCurrentUser(data);
      if (
        data?.businessAddress &&
        data?.category &&
        data?.description &&
        data?.businessName
      ) {
        navigate("/");
      } else {
        navigate("/businessname");
      }
    } catch (error) {
      toast.error("This email already exist!");
      console.log(error);
    }
  };

  const onFailure = (res) => {
    console.log(res);
  };

  return (
    <div className="signup-page">
      <ToastContainer position="bottom-center" />
      <div className="container-fluid">
        <div className="row">
          <div className="signup-main">
            <div
              className="signup-logo signup-logo-f-r"
              style={{ margin: "22px 0" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="150"
                height="55"
                viewBox="0 0 200 55"
              >
                <defs>
                  <pattern
                    id="pattern"
                    preserveAspectRatio="xMidYMid slice"
                    width="100%"
                    height="100%"
                    viewBox="0 0 1000 263"
                  >
                    <image
                      width="1000"
                      height="263"
                      xlinkHref="data:image/png;base64,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"
                    />
                  </pattern>
                </defs>
                <rect
                  id="logo_1"
                  data-name="logo 1"
                  width="200"
                  height="55"
                  fill="url(#pattern)"
                />
              </svg>
            </div>
            <div className="signup-flex">
              <div className="sign-box">
                <h4>Registration</h4>
                <form onSubmit={handleSignUp}>
                  <div className="singup-input-box">
                    <div className="singup-input-2">
                      <PersonOutlineIcon />
                      <input
                        required
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <p
                    style={{
                      color: "red",
                      marginLeft: "77px",
                      marginBottom: "0",
                      fontSize: "13px",
                    }}
                  >
                    {usernameerror ? usernameerror : ""}
                  </p>
                  <div className="singup-input-box">
                    <div className="singup-input-2">
                      <MailOutlineIcon />
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <p
                    style={{
                      color: "red",
                      marginLeft: "77px",
                      marginBottom: "0",
                      fontSize: "13px",
                    }}
                  >
                    {emailError ? emailError : ""}
                  </p>
                  <div className="singup-input-box">
                    <div className="singup-input-2">
                      <KeyIcon />
                      <input
                        required
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <p
                    style={{
                      color: "red",
                      marginBottom: "0",
                      marginLeft: "77px",
                      fontSize: "13px",
                    }}
                  >
                    {passwordError ? passwordError : ""}
                  </p>
                  <div className="singup-input-box">
                    <div className="singup-input-2">
                      <BusinessCenterIcon />
                      <input
                        required
                        type="text"
                        name="business"
                        valuse={business}
                        placeholder="Business"
                        onChange={(e) => setBusiness(e.target.value)}
                      />
                    </div>
                  </div>
                  <p
                    style={{
                      color: "red",
                      marginLeft: "77px",
                      marginBottom: "0",
                      fontSize: "13px",
                    }}
                  >
                    {businessError ? businessError : ""}
                  </p>
                  <div className="singup-input-box">
                    <button
                      className="singup-input-2"
                      style={{
                        background: "#2DC0DA",
                        justifyContent: "center",
                        border: "none",
                      }}
                    >
                      <a
                        type="submit"
                        style={{
                          border: "none",
                          outline: "none",
                          background: "transparent",
                          color: "#ffffff",
                          height: "25px",
                        }}
                      >
                        {loading ? (
                          <CircularProgress
                            className="circle-signup"
                            color="inherit"
                          />
                        ) : (
                          "Sing Up"
                        )}
                      </a>
                    </button>
                  </div>
                </form>
                <h6
                  style={{
                    fontWeight: "300",
                    fontSize: "12px",
                    textAlign: "center",
                    color: "#8B8B8B",
                    marginTop: "7px",
                    marginBottom: "7px",
                  }}
                >
                  or
                </h6>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    style={{
                      width: "90%",
                    }}
                  >
                    <GoogleLogin
                      className="google-button"
                      clientId={GOOGLE_CLIENT_ID}
                      buttonText="Continue with Google"
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                      cookiePolicy={"single_host_origin"}
                      isSignedIn={true}
                    ></GoogleLogin>
                  </div>
                </div>
                <NavLink to="/signin">
                  <h6
                    style={{
                      fontWeight: "300",
                      fontSize: "12px",
                      textAlign: "center",
                      color: "#8B8B8B",
                      marginTop: "7px",
                      marginBottom: "10px",
                    }}
                  >
                    Have an account?
                  </h6>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
