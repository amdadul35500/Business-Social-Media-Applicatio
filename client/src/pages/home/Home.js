import React, { useState, useEffect } from "react";
import "./home.css";
import Header from "../../layout/header/Header";
import Post from "../../components/post/Post";
import Suggestions from "../../components/Suggestions/Suggestions";
import { useGlobalContext } from "../../context/context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { axiosInstance } from "../../config";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [allPost, setAllPost] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const { currentUser, forLoadHomePage } = useGlobalContext();

  const PF = `http://localhost:5000/profilePicture/${currentUser.profilePhoto}`;

  // get all user
  useEffect(() => {
    const fatch = async () => {
      try {
        const { data } = await axiosInstance.get(`api/users`);
        setAllUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fatch();
  }, []);

  // get all post
  useEffect(() => {
    const fatch = async () => {
      try {
        const { data } = await axiosInstance.get(`api/post`);
        setAllPost(
          data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    fatch();
  }, [currentUser, forLoadHomePage]);

  return (
    <>
      <div style={{ background: "#FAFAFA", height: "100vh" }}>
        <div
          style={{
            position: "fixed",
            width: "100%",
            top: "0",
            left: "0",
            zIndex: "2",
          }}
        >
          <Header />
        </div>
        <div className="home-page" style={{ background: "#FAFAFA" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-7 col-12" style={{ marginTop: "85px" }}>
                {allPost ? (
                  allPost.map((post) => <Post post={post} key={post.id} />)
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100vh",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", marginTop: "200px" }}>
                      <CircularProgress />
                    </Box>
                  </div>
                )}
              </div>
              <div
                className="col-5 home-5-f-r"
                style={{
                  marginTop: "85px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div style={{ position: "fixed" }}>
                  <div style={{ display: "flex", justifyContent: "start" }}>
                    <NavLink to="/profile">
                      <div className="home-user-name-flex">
                        <div className="home-user-name-img">
                          <img
                            src={
                              currentUser.profilePhoto
                                ? currentUser.profilePhoto.length > 100
                                  ? currentUser.profilePhoto
                                  : currentUser.profilePhoto.length < 100
                                  ? PF
                                  : "./images/noAvatar.png"
                                : "./images/noAvatar.png"
                            }
                            alt="img"
                          />
                        </div>
                        <div className="home-user-name-name">
                          <h3>{currentUser.username}</h3>
                          <h4>{currentUser.email}</h4>
                        </div>
                        <div className="home-user-name-switch">
                          <span>Switch</span>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                  <div className="suggestions-for-you-flex">
                    <h5>Suggestions For You</h5>
                    <NavLink to="/follow">
                      <small className="suggest-page-buttom">See All</small>
                    </NavLink>
                  </div>
                  {allUser.map((user) => (
                    <Suggestions user={user} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
