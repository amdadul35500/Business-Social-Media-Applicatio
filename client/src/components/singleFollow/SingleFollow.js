import React, { useState, useEffect } from "react";
import "./singleFollow.css";
import { useGlobalContext } from "../../context/context";
import { axiosInstance } from "../../config";
import CircularProgress from "@mui/material/CircularProgress";
import { baseURL } from "../../config";

const SingleFollow = ({ user }) => {
  const [follow, setFollow] = useState("It's you");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useGlobalContext();

  const PF = `${baseURL}profilePicture/${user.profilePhoto}`;

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
      alert("You can't follow yourself!");
      console.log(error);
    }
  };

  return (
    <>
      <div className="follow-content-flex">
        <div>
          <img
            src={
              user.profilePhoto.includes("https")
                ? user.profilePhoto
                : PF.includes("http")
                ? PF
                : "./images/noAvatar.png"
            }
            alt="img"
          />
          <span>{user.username}</span>
        </div>
        <span
          className={loading ? "follow-btn-2" : "follow-btn"}
          onClick={handleFollow}
        >
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
    </>
  );
};

export default SingleFollow;
