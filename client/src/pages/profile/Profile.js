import React, { Suspense, useState, useEffect } from "react";
import "./profile.css";
import Header from "../../layout/header/Header";
import { useGlobalContext } from "../../context/context";
import { axiosInstance } from "../../config";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

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
        console.log(data);
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

  // logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <>
      <Header />
      <div style={{ background: "#FAFAFA", height: "100vh" }}>
        <div className="container-fluid">
          <div className="row" style={{ background: "#FAFAFA" }}>
            <div className="col-md-4 col-4">
              <div className="first-col">
                <div className="profile-img-flex">
                  <img src={PF} alt="img" />
                </div>
              </div>
            </div>
            <div className="col-md-4 col-8">
              <div className="second-col">
                <div style={{ width: "90%" }} className="second-col-f-r">
                  <div className="profile-name-flex">
                    <h4>{currentUser.username}</h4>
                    <span onClick={handleUpdate}>Edit profile</span>
                    <LogoutIcon className="logoutIcon" onClick={handleLogout} />
                  </div>
                  <span style={{ color: "#8E8E8E", fontWeight: "300" }}>
                    {currentUser.email}
                  </span>
                  <div className="follow-flex">
                    <div>
                      <span className="profile-f-s-r">{post.length}</span>
                      <span style={{ fontWeight: "300", marginLeft: "5px" }}>
                        posts
                      </span>
                    </div>
                    <div>
                      <span className="profile-f-s-r">{follower.length}</span>
                      <span style={{ fontWeight: "300", marginLeft: "5px" }}>
                        followers
                      </span>
                    </div>
                    <div>
                      <span className="profile-f-s-r">{following.length}</span>
                      <span style={{ fontWeight: "300", marginLeft: "5px" }}>
                        following
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4 profile-l-f-r">
              <div style={{ marginTop: "55px" }}>
                <div className="desc-flex">
                  <span>Business Name :</span>
                  <div>{currentUser.businessName}</div>
                </div>
                <div className="desc-flex">
                  <span>Category :</span>
                  <div>{currentUser.category}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ background: "#FAFAFA" }}>
          <div className="container">
            <hr style={{ margin: "0" }} />
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
                  class="_ab6-"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    width="18"
                    x="3"
                    y="3"
                  ></rect>
                  <line
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    x1="9.015"
                    x2="9.015"
                    y1="3"
                    y2="21"
                  ></line>
                  <line
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    x1="14.985"
                    x2="14.985"
                    y1="3"
                    y2="21"
                  ></line>
                  <line
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    x1="21"
                    x2="3"
                    y1="9.015"
                    y2="9.015"
                  ></line>
                  <line
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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

            <div className="row gy-md-4 g-2" style={{ marginBottom: "23px" }}>
              {post.map((singlePost) => (
                <div className="col-4 for-timeline-img-r">
                  <div className="timeline-img">
                    <img
                      src={`http://localhost:5000/images/${singlePost.img}`}
                      alt="img"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h5
              style={{
                marginTop: "8px",
                marginBottom: "2px",
                fontSize: "18px",
              }}
            >
              Username
            </h5>
            <input
              type="text"
              style={{ width: "100%", padding: "4px" }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <h5
              style={{
                marginTop: "8px",
                marginBottom: "2px",
                fontSize: "18px",
              }}
            >
              Email
            </h5>
            <input
              type="text"
              style={{ width: "100%", padding: "4px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h5
              style={{
                marginTop: "8px",
                marginBottom: "2px",
                fontSize: "18px",
              }}
            >
              Description
            </h5>
            <textarea
              name=""
              id=""
              cols="30"
              rows="3"
              className="profile-modal-textare"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <Button variant="contained" onClick={handleUpdateInfo}>
              Update
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Profile;
