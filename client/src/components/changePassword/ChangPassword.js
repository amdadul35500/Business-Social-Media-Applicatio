import React from "react";
import "./changePassword.css";
import Button from "@mui/material/Button";

const ChangPassword = () => {
  return (
    <div>
      <div className="edit-name-main">
        <div className="edit-name-flex" style={{ marginBottom: "30px" }}>
          <div className="edit-name-flex-2" style={{ width: "145px" }}>
            <img src="./images/noAvatar.png" alt="img" />
          </div>
          <div className="edit-name-username">
            <h4>Amdadul Haque</h4>
            <h6>Change Profile Image</h6>
          </div>
        </div>
        <div className="edit-name-flex">
          <div className="edit-name-flex-2" style={{ width: "145px" }}>
            <h4>Old Password</h4>
          </div>
          <div className="edit-name-username">
            <input type="text" placeholder="Enter Old Password" />
          </div>
        </div>
        <div className="edit-name-flex">
          <div className="edit-name-flex-2" style={{ width: "145px" }}>
            <h4>New Password</h4>
          </div>
          <div className="edit-name-username">
            <input type="text" placeholder="Enter New Password" />
          </div>
        </div>
        <div className="edit-name-flex">
          <div className="edit-name-flex-2" style={{ width: "145px" }}>
            <h4>Comfirm New Password</h4>
          </div>
          <div className="edit-name-username">
            <input type="text" placeholder="Enter Comfirm New Password" />
          </div>
        </div>
        <div className="edit-name-btn-password">
          <div>
            <Button variant="contained" size="small">
              Save Changes
            </Button>
            <h6>Forget</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangPassword;
