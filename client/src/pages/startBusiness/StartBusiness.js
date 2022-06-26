import React from "react";
import "./startBusiness.css";
import Header from "../../layout/header/Header";
import { NavLink } from "react-router-dom";

const StartBusiness = () => {
  return (
    <>
      <Header />
      <div className="tags-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="tags-flex">
                <div className="tags-box">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "50px 0",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="140"
                      height="140"
                      viewBox="0 0 204 204"
                    >
                      <g
                        id="Group_80"
                        data-name="Group 80"
                        transform="translate(-437 -176)"
                      >
                        <g
                          id="Ellipse_19"
                          data-name="Ellipse 19"
                          transform="translate(437 176)"
                          fill="none"
                          stroke="#999"
                          strokeWidth="3"
                        >
                          <circle cx="102" cy="102" r="102" stroke="none" />
                          <circle cx="102" cy="102" r="100.5" fill="none" />
                        </g>
                        <g id="Group_93" data-name="Group 93">
                          <g
                            id="Ellipse_21"
                            data-name="Ellipse 21"
                            transform="translate(522.814 236)"
                            fill="none"
                            stroke="#999"
                            strokeWidth="3"
                          >
                            <circle
                              cx="15.639"
                              cy="15.639"
                              r="15.639"
                              stroke="none"
                            />
                            <circle
                              cx="15.639"
                              cy="15.639"
                              r="14.139"
                              fill="none"
                            />
                          </g>
                          <g
                            id="Ellipse_22"
                            data-name="Ellipse 22"
                            transform="translate(511 264.825)"
                            fill="none"
                            stroke="#999"
                            strokeWidth="3"
                          >
                            <circle
                              cx="27.599"
                              cy="27.599"
                              r="27.599"
                              stroke="none"
                            />
                            <circle
                              cx="27.599"
                              cy="27.599"
                              r="26.099"
                              fill="none"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h6>Start a Free Business Account</h6>

                  <div className="tags-box-continue-flex">
                    <div className="tags-continue-box">
                      <NavLink to="/category">
                        <h4>Continue</h4>
                      </NavLink>
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

export default StartBusiness;
