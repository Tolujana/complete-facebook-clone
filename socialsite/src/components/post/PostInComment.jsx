import React, { useContext, useEffect, useState } from "react";
import styles from "./Post.module.css";
import PublicIcon from "@mui/icons-material/Public";
import MoreMenu from "../moreMenu/MoreMenu";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReplyIcon from "@mui/icons-material/Reply";
import axios from "axios";
import { format } from "timeago.js";

import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../proxySettings";
import DisplayData from "../display/DisplayData";
import { openPopupDialog } from "../../utils/generalServices";
const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
const EXTERNAL_FOLDER = process.env.REACT_APP_IMAGES_FOLDER;
const NOIMAGE = process.env.REACT_APP_NO_IMAGE;

const PostInComment = ({ post }) => {
  const [likes, setLike] = useState(post.likes.length);

  const [isLiked, setisLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: userinfo, dispatch } = useContext(AuthContext);
  const action = {
    type: "MODAL_TYPE",
    payload: { name: "comment", post: post },
  };

  const openCommentDialog = () => {
    openPopupDialog(action, dispatch);
  };

  useEffect(() => {
    setisLiked(post.likes.includes(userinfo._id));
  }, [userinfo._id, post.likes]);

  const likeHandler = () => {
    try {
      const res = axiosInstance.put(`/posts/${post._id}/like`, {
        userId: userinfo._id,
      });
      console.log(res);
    } catch (error) {
      if (isLiked) {
        setLike(likes - 1);
        setisLiked(!isLiked);
      } else {
        setLike(likes + 1);
        setisLiked(isLiked);
      }
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await axiosInstance.get(`/users?userId=${post.userId}`);
  //     setUser(res.data);
  //   };
  //   fetchUser();
  // }, [post.userId]);

  return (
    <div className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postTop}>
          <img
            src={PUBLIC_FOLDER + "/" + user.profilePicture || NOIMAGE}
            alt=""
            className={styles.postImg}
          />

          <div className={styles.postDetail}>
            <span className={styles.postName}>checkit</span>
            <div className={styles.time}>
              <span className={styles.timeStamp}>{format(post.createdAt)}</span>
              <span className={styles.timeStampDot}>.</span>
              <PublicIcon className={styles.timeIcon} />
            </div>
          </div>

          <MoreMenu />
        </div>
        <div className={styles.postMiddle}>
          <span className={styles.postText}>{post?.desc}</span>
          <div className={styles.postMedia}>
            {post.files ? (
              <DisplayData files={post.files} cssName={post?.cssName} />
            ) : (
              <img src={EXTERNAL_FOLDER + post.img} alt="" className={styles.postContentImg} />
            )}
          </div>
        </div>
        <div className={styles.postBottom}>
          <div className={styles.postBottomStats}>
            <div className={styles.likes}>
              <img className={styles.postLike} src={EXTERNAL_FOLDER + "/likes.png"} alt="" />
              <span className={styles.likesCounter}>{likes}</span>
            </div>
            <div className={styles.counters}>
              <span className={styles.commentCounter}> Comments</span>
              <span className={styles.shareCounter}>998 Shares</span>
            </div>
          </div>

          <div className={styles.postBottomcomments}></div>
        </div>
      </div>
    </div>
  );
};
export default PostInComment;
