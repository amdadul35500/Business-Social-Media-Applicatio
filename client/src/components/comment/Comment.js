import React, { useState, useEffect } from "react";
import "./comment.css";
import { axiosInstance } from "../../config";
import { format } from "timeago.js";

const Comment = ({ comment }) => {
  const [commentName, setcommentName] = useState({});

  // get user by comment data
  useEffect(() => {
    const fatch = async () => {
      try {
        const res = await axiosInstance.get(
          `api/users/loggedUser/${comment.userId}`
        );
        setcommentName(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fatch();
  }, []);

  return (
    <>
      <span
        style={{
          fontSize: "15px",
          marginLeft: "12px",
          marginRight: "6px",
        }}
      >
        {commentName.username}
      </span>
      <span style={{ fontSize: "15px", color: "#737373" }}>
        {comment.comment}
      </span>
      <span
        style={{
          marginLeft: "12px",
          fontSize: "11px",
          display: "block",
          color: "#ADADAD",
          marginBottom: "8px",
        }}
      >
        {format(comment.createdAt)}
      </span>
    </>
  );
};

export default Comment;
