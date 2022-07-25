import React, { useState, useEffect } from "react";
import "./singleAddUser.css";
import { useGlobalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config";
import CircularProgress from "@mui/material/CircularProgress";
import { baseURL } from "../../config";

const SingleAddUser = ({ user }) => {
  const [follow, setFollow] = useState("It's you");
  const { currentUser } = useGlobalContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const PF = `${baseURL}profilePicture/${user.profilePhoto}`;

  // check been add or not
  useEffect(() => {
    const fatch = async () => {
      try {
        const { data } = await axiosInstance.get(
          `api/users/checkAddUser/${currentUser.id}/${user.id}`
        );

        if (data === "Added") {
          setFollow("Added");
        }
        if (data === "NotAdded") {
          setFollow("Add");
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
      const { data } = await axiosInstance.get(
        `api/users/addUser/${currentUser.id}/${user.id}`
      );
      setLoading(false);
      if (data === "conversation already added") {
        setFollow("Added");
        navigate("/messenger");
      }
      if (data === "Conversation inserted!") {
        setFollow("Added");
        navigate("/messenger");
      }

      if (data === "two id is same") {
        alert("You can't add yourself!");
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
          className={loading ? "follow-btn-3" : "follow-btn"}
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

export default SingleAddUser;
