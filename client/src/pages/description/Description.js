import React, { useState } from "react";
import Header from "../../layout/header/Header";
import { useGlobalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config";
import CircularProgress from "@mui/material/CircularProgress";

const Description = () => {
  const [desValue, setDesValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useGlobalContext();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (desValue) {
      try {
        setLoading(true);
        const { data } = await axiosInstance.put(
          `api/users/update/description/?email=${currentUser.email}`,
          { category: desValue }
        );
        if (data) {
          setLoading(false);
          navigate("/uploadingbusiness");
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
      <div className="tags-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="tags-flex">
                <div className="tags-box">
                  <h2>Description</h2>
                  <h6>Chosse a category which discribe</h6>
                  <div className="tags-box-textarea-flex">
                    <textarea
                      onChange={(e) => setDesValue(e.target.value)}
                      name=""
                      id=""
                      cols="35"
                      rows="8"
                      placeholder="Description"
                      className="tags-box-textarea"
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
                  <div className="tags-box-continue-flex">
                    <div className="tags-continue-box">
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

export default Description;
