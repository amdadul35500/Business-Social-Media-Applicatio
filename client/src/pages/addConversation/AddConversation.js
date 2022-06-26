import React, { useState, useEffect } from "react";
import "./addConversation.css";
import Header from "../../layout/header/Header";
import SingleAddUser from "../../components/singleAddUser/SingleAddUser";
import { axiosInstance } from "../../config";

const AddConversation = () => {
  const [allUser, setAllUser] = useState([]);

  // get all user
  useEffect(() => {
    const fatch = async () => {
      try {
        const { data } = await axiosInstance("api/users");
        setAllUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fatch();
  }, []);

  return (
    <>
      <Header />
      <div style={{ background: "#FAFAFA", height: "100vh" }}>
        <div className="container-fluid">
          <div
            className="row"
            style={{ background: "#FAFAFA", height: "auto" }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="follow-box">
                {allUser.map((user) => (
                  <SingleAddUser key={user.id} user={user} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddConversation;
