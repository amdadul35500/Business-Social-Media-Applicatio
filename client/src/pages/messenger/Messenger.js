import React, { useEffect, useState, useRef } from "react";
import "./messenger.css";
import Header from "../../layout/header/Header";
import Conversation from "../../components/conversation/Conversation";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import ReactScrollBar from "react-scroll-to-bottom";
import { format } from "timeago.js";
import io from "socket.io-client";
import { axiosInstance } from "../../config";
const socket = io.connect(`${axiosInstance}`);

const Messenger = () => {
  const [allConversation, setAllConversation] = useState([]);
  const [clickedConversationInfo, setClickedConversationInfo] = useState({});
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const { currentUser } = useGlobalContext();

  // for socket
  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (Number(data.senderId) === Number(localStorage.getItem("convId"))) {
        const finalMsg = [data];
        finalMsg[0].createdAt = `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date(Date.now()).getHours()}:${new Date(
          Date.now()
        ).getMinutes()}:${new Date(Date.now()).getSeconds()}`;

        setAllMessage((prev) => [...prev, finalMsg[0]]);
      }
    });
  }, [currentUser]);

  // get logged user conversation
  useEffect(() => {
    const fatch = async () => {
      try {
        const { data } = await axiosInstance.get(
          `api/message/conversation/${currentUser.id}`
        );
        setAllConversation(data);
      } catch (error) {
        console.log(error);
      }
    };
    fatch();
  }, [currentUser ? currentUser.id : ""]);

  // get selected conversation messages
  useEffect(() => {
    const fatch = async () => {
      try {
        const { data } = await axiosInstance.get(
          `api/message/${clickedConversationInfo.doAddToConversation}/${clickedConversationInfo.beenAddToConversation}`
        );

        if (data) {
          setAllMessage(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fatch();
  }, [clickedConversationInfo.id]);

  // post message
  const postMessage = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosInstance.post("api/message", {
        conversationId: clickedConversationInfo.id,
        text: message,
        senderId: currentUser.id,
        receiverId: clickedConversationInfo.beenAddToConversation,
      });
      setAllMessage((prev) => [
        ...prev,
        {
          conversationId: clickedConversationInfo.id,
          text: message,
          senderId: currentUser.id,
          receiverId: clickedConversationInfo.beenAddToConversation,
          createdAt: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} ${new Date(
            Date.now()
          ).getHours()}:${new Date(Date.now()).getMinutes()}:${new Date(
            Date.now()
          ).getSeconds()}`,
        },
      ]);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div style={{ background: "#FAFAFA", width: "100%", height: "88vh" }}>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <NavLink to="/addConversation">
                <div className="add-conv-flex">
                  <div className="add-conv">
                    <span>Add Conversation</span>
                  </div>
                </div>
              </NavLink>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="conv-people">
                  <ReactScrollBar className="mes-container">
                    {allConversation.map((conversation) => (
                      <>
                        <div
                          className="conv-name-flex"
                          onClick={() => {
                            setClickedConversationInfo(conversation);
                            localStorage.setItem(
                              "convId",
                              JSON.stringify(
                                Number(conversation.beenAddToConversation)
                              )
                            );
                          }}
                          style={{ cursor: "pointer" }}
                          key={conversation.id}
                        >
                          <Conversation conversation={conversation} />
                        </div>
                        <hr />
                      </>
                    ))}
                  </ReactScrollBar>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="msg-box">
                <div className="msg-name-flex">
                  <img src="./images/IMG_3909.JPG" alt="img" />
                  <span>Amdadul Haque</span>
                </div>
                <hr style={{ marginTop: "10px" }} />
                {Object.entries(clickedConversationInfo).length === 0 ? (
                  <>
                    <div className="inNotConv">
                      <div style={{ textAlign: "center" }}>
                        <svg
                          aria-label="Direct"
                          class="_ab6-"
                          color="#262626"
                          fill="#262626"
                          height="96"
                          role="img"
                          viewBox="0 0 96 96"
                          width="60"
                          style={{ marginTop: "45px" }}
                        >
                          <circle
                            cx="48"
                            cy="48"
                            fill="none"
                            r="47"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          ></circle>
                          <line
                            fill="none"
                            stroke="currentColor"
                            stroke-linejoin="round"
                            stroke-width="2"
                            x1="69.286"
                            x2="41.447"
                            y1="33.21"
                            y2="48.804"
                          ></line>
                          <polygon
                            fill="none"
                            points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123"
                            stroke="currentColor"
                            stroke-linejoin="round"
                            stroke-width="2"
                          ></polygon>
                        </svg>
                      </div>
                      <h2>Your Messages</h2>
                      <h6>Send private messages to a friend.</h6>
                    </div>
                  </>
                ) : (
                  <div className="msg-display">
                    <ReactScrollBar className="mes-container">
                      {allMessage.map((message) => (
                        <div
                          className={
                            Number(message.senderId) === currentUser.id
                              ? "msg-position-right"
                              : "msg-position-left"
                          }
                          key={message.id}
                        >
                          <div>
                            <div
                              className={
                                Number(message.senderId) === currentUser.id
                                  ? "own-class msg-display-text"
                                  : "msg-display-text"
                              }
                              key={message.id}
                            >
                              <span>{message.text}</span>
                            </div>
                            <small>{format(message.createdAt)}</small>
                          </div>
                        </div>
                      ))}
                    </ReactScrollBar>
                  </div>
                )}

                <hr />
                <div className="msg-input-fuild">
                  <form onSubmit={postMessage}>
                    <div className="msg-input-fuild-flex">
                      <svg
                        aria-label="Emoji"
                        class="_ab6-"
                        color="#262626"
                        fill="#262626"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                        style={{ marginRight: "10px" }}
                      >
                        <path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path>
                      </svg>
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <input
                        type="submit"
                        value="Send"
                        style={{
                          width: "50px",
                          color: "#008BD3",
                          fontWeight: "500",
                        }}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
