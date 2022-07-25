import React, { useRef, useState } from "react";
import "./createPost.css";
import Header from "../../layout/header/Header";
import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import axiosInstance from "axios";
import imageCompression from "browser-image-compression";

const CreatePost = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const { currentUser, setForLoadHomePage, forLoadHomePage, setFile, file } =
    useGlobalContext();

  const handleChange = async (event) => {
    const imageFile = event.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      setFile(compressedFile);
      navigate("/filter");
    } catch (error) {
      console.log(error);
    }
  };

  const handleButton = () => {
    inputRef.current.click();
  };

  return (
    <div>
      <Header />
      <div className="create-post">
        <img src="./images/add-post.png" alt="img" onClick={handleButton} />
      </div>
      <h1 className="create-post-h1">Share Photo and Videos</h1>
      <input
        type="file"
        name="file"
        id="file"
        accept=".png, .jpeg, .jpg"
        onChange={handleChange}
        ref={inputRef}
        style={{ display: "none" }}
      />
      <div className="create-post-btn">
        <button onClick={handleButton}>Create Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
