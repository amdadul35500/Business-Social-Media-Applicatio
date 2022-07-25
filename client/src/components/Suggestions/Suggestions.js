import React, { useState, useEffect } from "react";
import "./suggestions.css";
import { useGlobalContext } from "../../context/context";
import { axiosInstance } from "../../config";
import CircularProgress from "@mui/material/CircularProgress";
import { baseURL } from "../../config";

const Suggestions = ({ user }) => {
  const [follow, setFollow] = useState("It's you");
  const { currentUser } = useGlobalContext();
  const PF = `${baseURL}profilePicture/${user.profilePhoto}`;
  const [loading, setLoading] = useState(false);

  // check follow or unfollow
  useEffect(() => {
    const fatch = async () => {
      try {
        const { data } = await axiosInstance.get(
          `api/users/checkFollowUnfollow/${currentUser.id}/${user.id}`
        );
        if (data === "follow") {
          setFollow("Following");
        }
        if (data === "unfollow") {
          setFollow("follow");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fatch();
  }, [currentUser.id, user.id]);

  const handleFollow = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("api/users/follow", {
        followerId: currentUser.id,
        followingId: user.id,
      });
      setLoading(false);
      if (data === "user has been followed!") {
        setFollow("Following");
      }
      if (data === "user has been unfollowed!") {
        setFollow("Follow");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        marginTop: "5px",
        marginBottom: "11px",
      }}
    >
      <div className="home-user-name-suggestions-people-flex">
        <div className="home-user-name-suggestions-people-img">
          <img
            src={
              user.profilePhoto?.includes("https")
                ? user.profilePhoto
                : PF.includes("http")
                ? PF
                : "./images/noAvatar.png"
            }
            alt="img"
          />
        </div>
        <div className="home-user-name-suggestions-people-name">
          <h3>{user.username}</h3>
          <h4>{user.email?.replace("_google", "")}</h4>
        </div>
        <div className="home-user-name-suggestions-people-switch">
          <span onClick={handleFollow} className="sugg-circle">
            {loading ? (
              <CircularProgress
                color="inherit"
                className="circle-button-follow"
              />
            ) : (
              follow
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
