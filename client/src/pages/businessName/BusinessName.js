import React, { useState } from "react";
import "./businessName.css";
import Header from "../../layout/header/Header";
import { useGlobalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config";
import CircularProgress from "@mui/material/CircularProgress";

const BusinessName = () => {
  const [error, setError] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useGlobalContext();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (businessName) {
      try {
        setLoading(true);
        const { data } = await axiosInstance.put(
          `api/users/update/businessname/?email=${currentUser.email}`,
          { category: businessName }
        );
        if (data) {
          setLoading(false);
          navigate("/category");
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      setError("Please enter your business name!");
    }
  };

  return (
    <>
      <Header />
      <div className="business-name-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="business-name-box-flex">
                <div className="business-name-box">
                  <h2>Buseness Name</h2>
                  <h6>Chosse a category which discribe</h6>
                  <div className="business-name-page-textarea-flex">
                    <textarea
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Business Name"
                      name=""
                      id=""
                      cols="35"
                      rows="8"
                      className="business-name-page-textarea"
                    ></textarea>
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
                  <div className="business-name-page-continue">
                    <div className="business-name-page-continue-box">
                      <h4 onClick={handleClick}>
                        {loading ? (
                          <CircularProgress
                            color="inherit"
                            className="circle-button"
                          />
                        ) : (
                          "Continue"
                        )}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessName;
