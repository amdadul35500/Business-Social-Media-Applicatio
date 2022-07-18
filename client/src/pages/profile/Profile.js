import React, { Suspense, useState, useEffect } from "react";
import "./profile.css";
import Header from "../../layout/header/Header";
import { useGlobalContext } from "../../context/context";
import { axiosInstance } from "../../config";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, NavLink } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import ImagesFooter from "../../components/imageHeader/ImagesFooter";

const Profile = () => {
  const [post, setPost] = useState([]);
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const { currentUser, setCurrentUser } = useGlobalContext();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [desc, setDesc] = useState(currentUser.description);

  const PF = `http://localhost:5000/profilePicture/${currentUser.profilePhoto}`;
  const GOOGLE_CLIENT_ID =
    "1034266394471-jbgsc0o8srtusgvd6dlcd17ssl1b06cp.apps.googleusercontent.com";

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // get follower
  useEffect(() => {
    const fatch = async () => {
      try {
        const { data } = await axiosInstance.get(
          `api/post/getFollowing/${currentUser.id}`
        );
        setFollower(data);
      } catch (error) {
        console.log(error);
      }
    };
    fatch();
  }, [currentUser.id]);

  // get following
  useEffect(() => {
    const fatch = async () => {
      try {
        const { data } = await axiosInstance.get(
          `api/post/getFollow/${currentUser.id}`
        );
        setFollowing(data);
      } catch (error) {
        console.log(error);
      }
    };
    fatch();
  }, [currentUser.id]);

  // get all post of logged user
  useEffect(() => {
    const fatch = async () => {
      try {
        const { data } = await axiosInstance.get(`api/post/${currentUser.id}`);
        setPost(data);
      } catch (error) {
        console.log(error);
      }
    };
    fatch();
  }, [currentUser.id]);

  // profile update
  const handleUpdate = async () => {
    handleOpen();
  };

  // profile final update
  const handleUpdateInfo = async () => {
    const updateInfo = {
      username: username,
      email: email,
      description: desc,
      email2: currentUser.email,
    };

    try {
      const { data } = await axiosInstance.put(
        `api/users/profileUpdate`,
        updateInfo
      );

      const res = await axiosInstance.get(
        `api/users/loggedUser/${currentUser.id}`
      );
      setCurrentUser(res.data);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const onSuccess = () => {
    console.log("logout seccess");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <>
      <Header />
      <div style={{ background: "#FAFAFA" }}>
        <div style={{ background: "#FAFAFA", height: "100vh" }}>
          <div className="container-fluid">
            <div className="row" style={{ background: "#FAFAFA" }}>
              <div className="col-md-4 col-4">
                <div className="first-col">
                  <div className="profile-img-flex">
                    <img
                      src={
                        currentUser.profilePhoto.includes("https")
                          ? currentUser.profilePhoto
                          : PF.includes("http")
                          ? PF
                          : "./images/noAvatar.png"
                      }
                      alt="img"
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-8">
                <div className="second-col">
                  <div style={{ width: "92%" }} className="second-col-f-r">
                    <div className="profile-name-flex">
                      <h4>{currentUser.username}</h4>
                      <NavLink to="/editprofile">
                        <span onClick={handleUpdate}>Edit profile</span>
                      </NavLink>

                      <svg
                        aria-label="Options"
                        className="_ab6-"
                        color="#262626"
                        fill="#262626"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                        style={{ cursor: "pointer" }}
                        onClick={handleOpen}
                      >
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="8.635"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></circle>
                        <path
                          d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
                          fill="none"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                      </svg>
                    </div>
                    <span
                      style={{
                        color: "#8E8E8E",
                        fontWeight: "300",
                        letterSpacing: "1px",
                      }}
                    >
                      {currentUser.email}
                    </span>
                    <div className="follow-flex">
                      <div style={{ textAlign: "center" }}>
                        <span
                          className="profile-f-s-r"
                          style={{ fontWeight: "bold" }}
                        >
                          {post.length}
                        </span>
                        <h4 style={{ fontWeight: "400", fontSize: "16px" }}>
                          posts
                        </h4>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <span
                          className="profile-f-s-r"
                          style={{ fontWeight: "bold" }}
                        >
                          {follower.length}
                        </span>
                        <h4 style={{ fontWeight: "400", fontSize: "16px" }}>
                          followers
                        </h4>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <span
                          className="profile-f-s-r"
                          style={{ fontWeight: "bold" }}
                        >
                          {following.length}
                        </span>
                        <h4 style={{ fontWeight: "400", fontSize: "16px" }}>
                          following
                        </h4>
                      </div>
                    </div>
                    <div className="bio-info">
                      <h5>{currentUser.name && currentUser.name}</h5>
                      <h6>{currentUser.bio && currentUser.bio}</h6>
                      <h6>
                        {currentUser.gender && `Gender : ${currentUser.gender}`}
                      </h6>
                      <a
                        href={`https://${currentUser.website}`}
                        target="_blank"
                      >
                        {currentUser.website && currentUser.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ background: "#FAFAFA" }}>
            <div className="container">
              <hr style={{ marginTop: "36px" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <svg
                    aria-label=""
                    className="_ab6-"
                    color="#262626"
                    fill="#262626"
                    height="12"
                    role="img"
                    viewBox="0 0 24 24"
                    width="12"
                    style={{ marginRight: "6px" }}
                  >
                    <rect
                      fill="none"
                      height="18"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      width="18"
                      x="3"
                      y="3"
                    ></rect>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="9.015"
                      x2="9.015"
                      y1="3"
                      y2="21"
                    ></line>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="14.985"
                      x2="14.985"
                      y1="3"
                      y2="21"
                    ></line>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="21"
                      x2="3"
                      y1="9.015"
                      y2="9.015"
                    ></line>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="21"
                      x2="3"
                      y1="14.985"
                      y2="14.985"
                    ></line>
                  </svg>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "500",
                      letterSpacing: "2px",
                    }}
                  >
                    POSTS
                  </span>
                </div>
              </div>

              <div
                className="row gy-md-4 g-2"
                style={{ paddingBottom: "23px" }}
              >
                {post.map((singlePost) => (
                  <div className="col-4 for-timeline-img-r" key={singlePost.id}>
                    <div className="timeline-img">
                      <img
                        src={`http://localhost:5000/images/${singlePost.img}`}
                        alt="img"
                      />
                    </div>
                    <ImagesFooter singlePost={singlePost} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-box">
            <hr />
            <GoogleLogout
              className="googleLogOut"
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Log out"
              onLogoutSuccess={onSuccess}
            ></GoogleLogout>
            <hr />
            <NavLink to="/editprofile">
              <h5>Edit Profile</h5>
            </NavLink>
            <hr />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Profile;
