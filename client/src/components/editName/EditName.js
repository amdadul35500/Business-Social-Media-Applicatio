import React, { useState } from "react";
import "./editName.css";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../../context/context";
import { axiosInstance } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditName = () => {
  const { currentUser, setCurrentUser } = useGlobalContext();
  const [name, setName] = useState(currentUser.name ? currentUser.name : "");
  const [username, setUsername] = useState(
    currentUser.username ? currentUser.username : ""
  );
  const [website, setWebsite] = useState(
    currentUser.website ? currentUser.website : ""
  );
  const [bio, setBio] = useState(currentUser.bio ? currentUser.bio : "");
  const [gender, setGender] = useState(
    currentUser.gender ? currentUser.gender : ""
  );
  const [email, setEmail] = useState(
    currentUser.email ? currentUser.email : ""
  );
  const [phonenumber, setPhonenumber] = useState(
    currentUser.phonenumber ? currentUser.phonenumber : ""
  );

  const PF = `http://localhost:5000/profilePicture/${currentUser?.profilePhoto}`;

  const handleUpdate = async () => {
    const updatedInfo = {
      name,
      username,
      website,
      bio,
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

  return (
    <div>
      <ToastContainer position="bottom-center" />
      <div className="edit-name-main">
        <div className="edit-name-flex" style={{ marginBottom: "30px" }}>
          <div className="edit-name-flex-2">
            <img
              src={
                currentUser.profilePhoto.includes("https")
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
            <h6>Change Profile Image</h6>
          </div>
        </div>
        <div className="edit-name-flex">
          <div className="edit-name-flex-2">
            <h4>Name</h4>
          </div>
          <div className="edit-name-username">
            <input
              type="text"
              placeholder="Change Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <h4>Bio</h4>
          </div>
          <div className="edit-name-username">
            <input
              type="text"
              placeholder="About"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
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
        <div className="edit-name-flex">
          <div className="edit-name-flex-2">
            <h4>Gender</h4>
          </div>
          <div className="edit-name-username">
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </div>
        </div>
        <div className="edit-name-btn">
          <Button variant="contained" onClick={handleUpdate}>
            Contained
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditName;
