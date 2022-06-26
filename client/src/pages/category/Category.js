import React, { useState } from "react";
import "./category.css";
import Header from "../../layout/header/Header";
import { useGlobalContext } from "../../context/context";
import { axiosInstance } from "../../config";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const Category = () => {
  const [option, setOption] = useState("");
  const { currentUser } = useGlobalContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (option) {
      try {
        setLoading(true);
        const { data } = await axiosInstance.put(
          `api/users/update/category/?email=${currentUser.email}`,
          { category: option }
        );
        if (data) {
          setLoading(false);
          navigate("/description");
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      setError("Please select a category!");
    }
  };

  return (
    <>
      <Header />
      <div className="category-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="category-flex">
                <div className="category-box">
                  <h2>Select Category</h2>
                  <h6>Chosse a category which discribe</h6>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="category-input">
                      <select
                        onChange={(e) => setOption(e.target.value)}
                        class="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>Select a category</option>
                        <option value="Sole Proprietorship">
                          Sole Proprietorship
                        </option>
                        <option value="Partnership">Partnership</option>
                        <option value="Corporation">Corporation</option>
                        <option value="Limited Liability Company">
                          Limited Liability Company
                        </option>
                        <option value="Other">Other</option>
                      </select>
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
                  <div className="category-continue">
                    <div className="category-continue-box">
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

export default Category;
