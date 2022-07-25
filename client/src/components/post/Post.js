import React, { useState, useEffect, useRef } from "react";
import "./post.css";
import { axiosInstance } from "../../config";
import { useGlobalContext } from "../../context/context";
import Comment from "../comment/Comment";
import { format } from "timeago.js";
import { baseURL } from "../../config";

const Post = ({ post, id }) => {
  const [userOfPost, setUserOfPost] = useState({});
  const [likes, setLikes] = useState([]);
  const [forUseEffect, setForUseEffect] = useState(false);
  const likeRef = useRef();
  const { currentUser } = useGlobalContext();
  const [commentInput, setCommentInput] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [forcomment, setforcomment] = useState(true);

  const PF = `${baseURL}images/${post.img}`;
  const PF2 = `${baseURL}profilePicture/${userOfPost.profilePhoto}`;
  console.log(userOfPost);

  // get a singel user by according to post id
  useEffect(() => {
    const fatch = async () => {
      const { data } = await axiosInstance.get(
        `api/users/oneUser/${post.userId}`
      );
      console.log(data);
      setUserOfPost(data);
      try {
      } catch (error) {
        console.log(error);
      }
    };
    fatch();
  }, [post.userId]);

  // get like of partucular post from likes table
  useEffect(() => {
    const fatch = async () => {
      try {
        const { data } = await axiosInstance.get(`api/post/likes/${post.id}`);
        setLikes(data);
      } catch (error) {
        console.log(error);
      }
    };
    fatch();
  }, [post.id, forUseEffect]);

  // get post
  useEffect(() => {
    const fatch = async () => {
      try {
        const { data } = await axiosInstance.get(`api/post/comment/${post.id}`);
        setCommentData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fatch();
  }, [post.id, forcomment]);

  //  handle Like
  const handleLike = async () => {
    try {
      const { data } = await axiosInstance.post(`api/post/likes`, {
        userId: currentUser.id,
        postId: post.id,
        isLike: "yes",
      });
      if (data === "inserted successfully!") {
        likeRef.current.style.fill = "red";
        setForUseEffect(!forUseEffect);
      }
      if (data === "deleted successfully!") {
        likeRef.current.style.fill = "#262626";
        setForUseEffect(!forUseEffect);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // post comment
  const postComment = async () => {
    const postInfo = {
      userId: currentUser.id,
      postId: post.id,
      comment: commentInput,
    };
    try {
      await axiosInstance.post("api/post/comment", postInfo);
      setCommentInput("");
      setforcomment(!forcomment);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }} key={id}>
        <div
          style={{
            border: "1px solid #DBDBDB",
            marginBottom: "20px",
            borderRadius: "8px",
            background: "#FFFFFF",
            width: "90%",
          }}
          className="post-f-r"
        >
          <div className="user-name-flex">
            <div className="user-name-box">
              <div className="user-photo">
                <img
                  src={
                    currentUser.profilePhoto?.includes("https")
                      ? currentUser.profilePhoto
                      : currentUser.profilePhoto
                      ? PF2
                      : "./images/noAvatar.png"
                  }
                  alt="img"
                />
              </div>
              <div className="user-name-location">
                <h3>{userOfPost.username}</h3>
              </div>
            </div>
          </div>
          <div className="home-photo-flex">
            <img src={PF} alt="img" />
          </div>
          <div className="home-photo-icon-flex">
            <svg
              aria-label="Like"
              className="_ab6-"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
              style={{ cursor: "pointer" }}
              ref={likeRef}
              onClick={handleLike}
            >
              <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
            </svg>
            <svg
              aria-label="Comment"
              className="_ab6-"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            <svg
              aria-label="Share Post"
              className="_ab6-"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <line
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeidth="2"
                x1="22"
                x2="9.218"
                y1="3"
                y2="10.083"
              ></line>
              <polygon
                fill="none"
                points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              ></polygon>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="22.59"
              viewBox="0 0 19 22.59"
            >
              <g id="Collect" fill="none">
                <path
                  d="M0,1.093A1.093,1.093,0,0,1,1.093,0H17.907A1.093,1.093,0,0,1,19,1.093V20.836a1.64,1.64,0,0,1-2.725,1.23L9.725,15.287,2.7,22.2A1.64,1.64,0,0,1,0,20.947Z"
                  stroke="none"
                />
                <path
                  d="M 1.5 1.500001907348633 L 1.5 20.94695281982422 C 1.5 21.08863258361816 1.64739990234375 21.09027290344238 1.648889541625977 21.09027290344238 C 1.663969039916992 21.09027290344238 1.681125640869141 21.08780860900879 1.704679489135742 21.07316780090332 L 9.752429962158203 13.15665245056152 L 17.29322814941406 20.96142196655273 C 17.31828117370605 20.97776794433594 17.33559989929199 20.97948265075684 17.35024070739746 20.97948265075684 C 17.35634994506836 20.97948265075684 17.5 20.97785186767578 17.5 20.83611297607422 L 17.5 1.500001907348633 L 1.5 1.500001907348633 M 1.093450546264648 1.9073486328125e-06 L 17.90654945373535 1.9073486328125e-06 C 18.51045036315918 1.9073486328125e-06 19 0.4895515441894531 19 1.093452453613281 L 19 20.83611297607422 C 19 22.24847221374512 17.333740234375 23.00042152404785 16.27467918395996 22.06599235534668 L 9.725350379943848 15.28739166259766 L 2.696159362792969 22.20195198059082 C 1.629327774047852 23.09962463378906 0 22.34121131896973 0 20.94695281982422 L 0 1.093442916870117 C 0 0.4895515441894531 0.4895496368408203 1.9073486328125e-06 1.093450546264648 1.9073486328125e-06 Z"
                  stroke="none"
                  fill="#000"
                />
              </g>
            </svg>
          </div>
          <span
            style={{
              marginLeft: "12px",
              fontSize: "15px",
              display: "block",
              marginBottom: "8px",
            }}
          >
            {likes.length} likes
          </span>
          {/*start description */}
          {post.description && (
            <>
              <span
                style={{
                  marginLeft: "12px",
                  fontSize: "15px",
                  marginBottom: "8px",
                  marginRight: "6px",
                }}
              >
                {currentUser.username}
              </span>

              <span
                style={{
                  fontSize: "15px",
                  color: "rgb(115, 115, 115)",
                }}
              >
                {post.description && post.description}
              </span>
              <span
                style={{
                  marginLeft: "12px",
                  fontSize: "11px",
                  display: "block",
                  color: "#ADADAD",
                  marginBottom: "8px",
                }}
              >
                {format(post.createdAt)}
              </span>
            </>
          )}

          {/* end description */}

          {commentData.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}

          <div className="comment-box-flex">
            <div>
              <svg
                aria-label="Emoji"
                className="_ab6-"
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
                style={{ marginLeft: "12px" }}
              >
                <path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path>
              </svg>
            </div>
            <div className="comment-box-div-width">
              <input
                type="text"
                placeholder="Add a comment..."
                className="comment-box-input"
                onChange={(e) => {
                  setCommentInput(e.target.value);
                }}
                value={commentInput}
              />
            </div>
            <div>
              <span
                className={commentInput ? "postButton2" : "postButton"}
                onClick={postComment}
              >
                Post
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
