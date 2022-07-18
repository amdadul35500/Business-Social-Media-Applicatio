import React, { useState } from "react";
import "./editProfile.css";
import Header from "../../layout/header/Header";
import EditName from "../../components/editName/EditName";
import ChangPassword from "../../components/changePassword/ChangPassword";

const EditProfile = () => {
  const [activeEditName, setActiveEditName] = useState(false);
  const [activeChangePassword, setActiveChangePassword] = useState(false);
  const [defaultActive, setDefaultActive] = useState(true);

  const activeEditComponent1 = () => {
    setActiveEditName(true);
    setActiveChangePassword(false);
  };

  const activeEditComponent2 = () => {
    setActiveEditName(false);
    setActiveChangePassword(true);
    setDefaultActive(false);
  };

  return (
    <>
      <Header />
      <div className="edit-profile">
        <br />
        <div className="container edit-profile-container">
          <div
            className="row"
            style={{ border: "1px solid rgba(219, 219, 219)" }}
          >
            <div className="col-3" style={{ padding: "0" }}>
              <div className="edit-left-side-main">
                <div
                  className={
                    defaultActive
                      ? "edit-left-side edit-left-side-select"
                      : activeEditName
                      ? "edit-left-side edit-left-side-select"
                      : "edit-left-side edit-left-side-select-hover"
                  }
                  onClick={activeEditComponent1}
                >
                  <h4>Edit Profile</h4>
                </div>
                <div
                  className={
                    activeChangePassword
                      ? "edit-left-side edit-left-side-select"
                      : "edit-left-side edit-left-side-select-hover"
                  }
                  onClick={activeEditComponent2}
                >
                  <h4>Change Password</h4>
                </div>
                <div className="edit-left-side edit-left-side-select-hover">
                  <h4>Apps and Websites</h4>
                </div>
                <div className="edit-left-side edit-left-side-select-hover">
                  <h4>Email and SMS</h4>
                </div>
                <div className="edit-left-side edit-left-side-select-hover">
                  <h4>Push Notificatons</h4>
                </div>
                <div className="edit-left-side edit-left-side-select-hover">
                  <h4>Manage Contacts</h4>
                </div>
                <div className="edit-left-side edit-left-side-select-hover">
                  <h4>Privacy and Security</h4>
                </div>
                <div className="edit-left-side edit-left-side-select-hover">
                  <h4>Activity</h4>
                </div>
                <div className="edit-left-side edit-left-side-select-hover">
                  <h4>Email</h4>
                </div>
                <div className="edit-left-side edit-left-side-select-hover">
                  <h4>Delete Account</h4>
                </div>
              </div>
            </div>
            <div className="col-9">
              {activeEditName ? (
                <EditName />
              ) : activeChangePassword ? (
                <ChangPassword />
              ) : (
                <EditName />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
