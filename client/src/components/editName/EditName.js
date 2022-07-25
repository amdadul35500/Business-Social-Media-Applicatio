import React, { useState, useRef, useEffect } from "react";
import "./editName.css";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../../context/context";
import { axiosInstance } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../../config";

const EditName = () => {
  const { currentUser, setCurrentUser } = useGlobalContext();
  const [businessName, setBusinessName] = useState(
    currentUser.businessName ? currentUser.businessName : ""
  );
  const [username, setUsername] = useState(
    currentUser.username ? currentUser.username : ""
  );
  const [website, setWebsite] = useState(
    currentUser.website ? currentUser.website : ""
  );
  const [description, setDescription] = useState(
    currentUser.description ? currentUser.description : ""
  );
  const [gender, setGender] = useState(
    currentUser.gender ? currentUser.gender : ""
  );
  const [email, setEmail] = useState(
    currentUser.email ? currentUser.email?.replace("_google", "") : ""
  );

  const [phonenumber, setPhonenumber] = useState(
    currentUser.phonenumber ? currentUser.phonenumber : ""
  );
  const inputRef = useRef();

  const PF = `${baseURL}profilePicture/${currentUser?.profilePhoto}`;

  const handleUpdate = async () => {
    const updatedInfo = {
      businessName,
      username,
      website,
      description,
      gender,
      email,
      phonenumber,
    };
    try {
      const { data } = await axiosInstance.put(
        `api/users/allUpdate/${currentUser.id}`,
        updatedInfo
      );

      setCurrentUser(data);
      toast.success("Updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  // update profile photo
  const handleChange = async () => {
    const file = inputRef.current.files["0"];
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axiosInstance.put(
        `api/users/update/profilephoto/?email=${currentUser.email}`,
        formData
      );
      const { data } = await axiosInstance.get(
        `api/users/currentUser/?email=${currentUser.email}`
      );
      setCurrentUser(data);
      toast.success("Profile photo updated successfuly!");
    } catch (error) {
      console.log(error);
    }
  };

  // update profile photo
  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div>
      <ToastContainer position="bottom-center" />
      <div className="edit-name-main">
        <div className="edit-name-flex" style={{ marginBottom: "30px" }}>
          <div className="edit-name-flex-2">
            <img
              src={
                currentUser.profilePhoto?.includes("https")
                  ? currentUser.profilePhoto
                  : currentUser.profilePhoto
                  ? PF
                  : "./images/noAvatar.png"
              }
              alt="img"
            />
          </div>
          <div className="edit-name-username">
            <h4>Amdadul Haque</h4>
            <h6 onClick={handleClick}>Change Profile Image</h6>
            <input
              type="file"
              ref={inputRef}
              style={{ display: "none" }}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="edit-name-flex">
          <div className="edit-name-flex-2">
            <h4>Business name</h4>
          </div>
          <div className="edit-name-username">
            <input
              type="text"
              placeholder="Change Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>
        </div>
        <div className="edit-name-flex">
          <div className="edit-name-flex-2">
            <h4>User Name</h4>
          </div>
          <div className="edit-name-username">
            <input
              type="text"
              placeholder="Change User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="edit-name-flex">
          <div className="edit-name-flex-2">
            <h4>Website</h4>
          </div>
          <div className="edit-name-username">
            <input
              type="text"
              placeholder="Link"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
        </div>
        <div className="edit-name-flex">
          <div className="edit-name-flex-2">
            <h4>Business Description</h4>
          </div>
          <div className="edit-name-username">
            <input
              type="text"
              placeholder="Change Business Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="edit-name-flex">
          <div className="edit-name-flex-2">
            <h4>Email</h4>
          </div>
          <div className="edit-name-username">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="edit-name-flex">
          <div className="edit-name-flex-2">
            <h4>Phone Number</h4>
          </div>
          <div className="edit-name-username">
            <input
              type="text"
              placeholder="Number"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
          </div>
        </div>
        <div className="edit-name-btn">
          <Button variant="contained" onClick={handleUpdate}>
            Continued
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditName;
