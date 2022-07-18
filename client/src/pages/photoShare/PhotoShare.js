import React, { useState, useEffect } from "react";
import "./photoShare.css";
import Header from "../../layout/header/Header";
import Switch from "@mui/material/Switch";
import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import { axiosInstance } from "../../config";
import CircularProgress from "@mui/material/CircularProgress";

const PhotoShare = () => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [allPost, setAllPost] = useState([]);
  const { file, currentUser, setForLoadHomePage, forLoadHomePage } =
    useGlobalContext();
  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Switch demo" } };

  // function for upload photo
  const handlePost = async () => {
    if (file) {
      const formData = new FormData();
      const filename = Date.now() + "--" + file.name;
      formData.append("name", filename);
      formData.append("file", file);
      try {
        setLoading(true);
        await axiosInstance.post(`api/post/photoUpload`, formData);
        await axiosInstance.post(`api/post`, {
          userId: currentUser.id,
          img: filename,
          description: description,
        });
        setLoading(false);
        setDescription("");
        setForLoadHomePage(!forLoadHomePage);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (file === null) {
      navigate("/createpost");
    }
  }, [file]);

  return (
    <>
      <Header />
      <div className="photoShare">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="photoShare-main-flex">
                <div
                  className="photoShare-first-flex"
                  style={{ display: "flex" }}
                >
                  <img src={file && URL.createObjectURL(file)} alt="img" />
                  <textarea
                    name=""
                    id=""
                    cols="80"
                    rows="5"
                    placeholder="Write something..."
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="photoShare-second-flex">
                  <img src={file && URL.createObjectURL(file)} alt="img" />
                </div>
              </div>
              <hr style={{ marginTop: "8px" }} />
              <div>
                <h4 className="photoShare-second-h4">Also Post to</h4>
                <div className="photoShare-second-fb-flex">
                  <h6>Facebook</h6>
                  <Switch {...label} defaultChecked />
                </div>
                <div className="photoShare-second-fb-flex">
                  <h6>Twitter</h6>
                  <Switch {...label} defaultChecked />
                </div>
                <div className="photoShare-second-fb-flex">
                  <h6>Google</h6>
                  <Switch {...label} defaultChecked />
                </div>
                <div></div>
              </div>
              <hr />
              <div
                className={loading ? "create-post-btn-2" : "create-post-btn"}
                style={{ textAlign: "end", marginTop: "25px" }}
              >
                <button onClick={handlePost}>
                  {loading ? (
                    <CircularProgress
                      className="circle-signup"
                      color="inherit"
                    />
                  ) : (
                    "Share"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoShare;
