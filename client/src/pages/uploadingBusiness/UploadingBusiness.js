import React, { useState } from "react";
import "./uploadingBusiness.css";
import Header from "../../layout/header/Header";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { FaLanguage } from "react-icons/fa";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import { axiosInstance } from "../../config";
import CircularProgress from "@mui/material/CircularProgress";

const UploadingBusiness = () => {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useGlobalContext();

  const handleClick = async () => {
    if (email && address && language && country) {
      const businessInfo = {
        businessEmail: email,
        businessAddress: address,
        businessLanguage: language,
        businessCountry: country,
      };

      try {
        setLanguage(true);
        const { data } = await axiosInstance.put(
          `api/users/update/uploadbusiness/?email=${currentUser.email}`,
          businessInfo
        );
        if (data) {
          setLanguage(false);
          navigate("/selectprofilephoto");
        }
      } catch (error) {
        setLanguage(false);
        console.log(error);
      }
    } else {
      setError("Please fill all input fild!");
    }
  };

  return (
    <>
      <Header />
      <div className="uploadBusinessPage">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="uploadBusiness-flex">
                <div className="uploadBusiness-box">
                  <h2>Uploading Business</h2>
                  <h6>The Contact information will be</h6>
                  <div
                    className="uploadBusiness-info-flex"
                    style={{ marginTop: "50px" }}
                  >
                    <div
                      className="uploadBusiness-info-box-flex"
                      style={{ border: "none" }}
                    >
                      <small style={{ color: "#8B8B8B" }}>
                        Enter Business Info
                      </small>
                    </div>
                  </div>

                  <div className="uploadBusiness-info-flex">
                    <div className="uploadBusiness-info-box-flex">
                      <EmailOutlinedIcon />
                      <input
                        type="email"
                        placeholder="Info@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="uploadBusiness-info-flex">
                    <div className="uploadBusiness-info-box-flex">
                      <LocationOnOutlinedIcon />
                      <input
                        type="email"
                        placeholder="Business Address"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                      />
                    </div>
                  </div>
                  <div className="uploadBusiness-info-flex">
                    <div className="uploadBusiness-info-box-flex">
                      <FaLanguage />
                      <input
                        type="email"
                        placeholder="Language"
                        onChange={(e) => setLanguage(e.target.value)}
                        value={language}
                      />
                    </div>
                  </div>
                  <div className="uploadBusiness-info-flex">
                    <div className="uploadBusiness-info-box-flex">
                      <LanguageOutlinedIcon />
                      <input
                        type="email"
                        placeholder="Country"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                      />
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
                  <div className="uploadBusiness-continue">
                    <div className="uploadBusiness-continue-box">
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

export default UploadingBusiness;
