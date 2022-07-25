import React, { useEffect } from "react";
import "./filter.css";
import Header from "../../layout/header/Header";
import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import { baseURL } from "../../config";

const Filter = () => {
  const { file, currentUser } = useGlobalContext();
  const navigate = useNavigate();
  const PF = `${baseURL}profilePicture/${currentUser?.profilePhoto}`;

  useEffect(() => {
    if (file === null) {
      navigate("/createpost");
    }
  }, [file]);

  return (
    <>
      <Header />
      <div className="filter">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-12">
              <div className="filter-main-img">
                <h5>Create Post</h5>
                <img src={file && URL.createObjectURL(file)} alt="img" />
              </div>
              <div className="filter-section">
                <h5>Filters</h5>
                <div>
                  <h6>Orginal</h6>
                  <img src={file && URL.createObjectURL(file)} alt="img" />
                </div>
                <div>
                  <h6>B&W</h6>
                  <img src={file && URL.createObjectURL(file)} alt="img" />
                </div>
                <div>
                  <h6>Sharp</h6>
                  <img src={file && URL.createObjectURL(file)} alt="img" />
                </div>
                <div>
                  <h6>Orginal</h6>
                  <img src={file && URL.createObjectURL(file)} alt="img" />
                </div>
                <div>
                  <h6>B&W</h6>
                  <img src={file && URL.createObjectURL(file)} alt="img" />
                </div>
                <div>
                  <h6>Orginal</h6>
                  <img src={file && URL.createObjectURL(file)} alt="img" />
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="filter-second-section-flex">
                <div className="filter-second-section-flex-img">
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
                <div>
                  <h6 className="filter-second-section-h6">Amdadul Haque</h6>
                  <h6 className="filter-second-section-h6-2">
                    amdadul@gmail.com
                  </h6>
                  <div className="filter-second-section-post-flex">
                    <div>
                      <h6>148</h6>
                      <h5>posts</h5>
                    </div>
                    <div>
                      <h6>148</h6>
                      <h5>Followers</h5>
                    </div>
                    <div>
                      <h6>148</h6>
                      <h5>Followings</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="create-post-btn"
                style={{ marginLeft: "30px", marginTop: "20px" }}
              >
                <NavLink to="/photoshare">
                  <button>Next</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
