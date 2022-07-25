import React, { useState, useEffect } from "react";
import "./conversation.css";
import { axiosInstance } from "../../config";
import { baseURL } from "../../config";

const Conversation = ({ conversation }) => {
  const [userByConversation, setUserByConversation] = useState({});

  const PF = `${baseURL}profilePicture/${userByConversation.profilePhoto}`;

  // get user info by conversation
  useEffect(() => {
    const fatch = async () => {
      const { data } = await axiosInstance(
        `api/users/oneUser/${conversation.beenAddToConversation}`
      );
      setUserByConversation(data);
      try {
      } catch (error) {
        console.log(error);
      }
    };
    fatch();
  }, [conversation.beenAddToConversation]);

  return (
    <>
      <img
        src={
          userByConversation.profilePhoto
            ? userByConversation.profilePhoto.length > 100
              ? userByConversation.profilePhoto
              : userByConversation.profilePhoto.length < 100
              ? PF
              : "./images/noAvatar.png"
            : "./images/noAvatar.png"
        }
      />
      <h5>{userByConversation.username}</h5>
    </>
  );
};

export default Conversation;
