import React, { useState, useEffect } from "react";
import "./singleFollow.css";
import { useGlobalContext } from "../../context/context";
import { axiosInstance } from "../../config";

const SingleFollow = ({ user }) => {
  const [follow, setFollow] = useState("It's you");
  const { currentUser } = useGlobalContext();

  const PF = `http://localhost:5000/profilePicture/${user.profilePhoto}`;

  // check follow or unfollow
  useEffect(() => {
    const fatch = async () => {
      try {
        const { data } = await axiosInstance.get(
          `api/users/checkFollowUnfollow/${currentUser.id}/${user.id}`
        );
        console.log(data);
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
      const { data } = await axiosInstance.post("api/users/follow", {
        followerId: currentUser.id,
        followingId: user.id,
      });
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
    <>
      <div className="follow-content-flex">
        <div>
          <img
            src={
              user.profilePhoto
                ? user.profilePhoto.length > 100
                  ? user.profilePhoto
                  : user.profilePhoto.length < 100
                  ? PF
                  : "./images/noAvatar.png"
                : "./images/noAvatar.png"
            }
            alt="img"
          />
          <span>{user.username}</span>
        </div>
        <span className="follow-btn" onClick={handleFollow}>
          {follow}
        </span>
      </div>
    </>
  );
};

export default SingleFollow;
