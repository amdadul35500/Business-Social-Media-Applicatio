import React, { useState, useRef, useEffect } from "react";
import "./selectCoverPhoto.css";
import Header from "../../layout/header/Header";
import PhotoCameraBackOutlinedIcon from "@mui/icons-material/PhotoCameraBackOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import { axiosInstance } from "../../config";
import CircularProgress from "@mui/material/CircularProgress";
import { baseURL } from "../../config";

const SelectCoverPhoto = () => {
  const [foruseEffect, setforuseEffect] = useState(false);
  const [foruseEffect2, setforuseEffect2] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useGlobalContext();
  const PF = `${baseURL}profilePicture/${currentUser.profilePhoto}`;

  // get profil photo
  useEffect(() => {
    const fatch = async () => {
      try {
        const { data } = await axiosInstance.get(
          `api/users/currentUser/?email=${currentUser.email}`
        );

        setCurrentUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fatch();
  }, [foruseEffect, foruseEffect2]);

  // photo upload by devices
  const handleChange = async () => {
    const file = inputRef.current.files["0"];
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await axiosInstance.put(
        `api/users/update/profilephoto/?email=${currentUser.email}`,
        formData
      );
      setLoading(false);
      setforuseEffect2(!foruseEffect2);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // for continue button
  const handleContinue = () => {
    if (!currentUser.profilePhoto) {
      setLoading(false);
      setError("Please select a photo!");
    } else {
      setLoading(true);
      navigate("/");
      setLoading(false);
    }
  };

  const clickForInputFild = () => {
    inputRef.current.click();
  };

  return (
    <>
      <Header />
      <div className="select-cover-photo">
        <div className="select-cover-photo-box">
          <div className="select-cover-photo-img-box">
            <img
              src={
                currentUser.profilePhoto?.includes("https")
                  ? currentUser.profilePhoto
                  : currentUser.profilePhoto
                  ? PF
                  : "./images/noAvatar.png"
              }
              alt="img"
              className="select-cover-photo-img"
            />
          </div>
          <h4 onClick={clickForInputFild}>Select Profile Photo</h4>
          <div className="select-cover-photo-camera">
            <input
              type="file"
              name="file"
              ref={inputRef}
              accept=".png, .jpeg, .jpg"
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <div
              className="select-cover-photo-camera-sub"
              onClick={clickForInputFild}
              style={{ cursor: "pointer" }}
            >
              <PhotoCameraBackOutlinedIcon style={{ fontSize: "21px" }} />
              <span style={{ marginLeft: "10px", color: "#959595" }}>
                Galary
              </span>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  width: "100%",
                }}
              >
                <FileUploadOutlinedIcon />
              </div>
            </div>
          </div>
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginBottom: "0",
              fontSize: "13px",
            }}
          >
            {error ? error : ""}
          </p>
          <div className="select-cover-photo-continue">
            <div
              className="select-cover-photo-continue-sub"
              onClick={handleContinue}
            >
              <h3>
                {loading ? (
                  <CircularProgress color="inherit" className="circle-button" />
                ) : (
                  "Continue"
                )}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectCoverPhoto;
