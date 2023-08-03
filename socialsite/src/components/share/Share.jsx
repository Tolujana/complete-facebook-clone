import React, { useContext, useRef, useState } from "react";
import styles from "./Share.module.css";
import TheatersIcon from "@mui/icons-material/Theaters";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import MoodIcon from "@mui/icons-material/Mood";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { AuthContext } from "../../context/AuthContext";
import { sharePost } from "../../utils/shareServices";
import { openPopupDialog } from "../../utils/generalServices";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const NOIMAGE = process.env.REACT_APP_NO_IMAGE;

function Share() {
  const { user, dispatch, modalType } = useContext(AuthContext);
  const userInput = useRef();
  const [file, setFile] = useState(null);

  const action = { type: "MODAL_TYPE", payload: { name: "share" } };

  const openShareDialog = () => {
    openPopupDialog(action, dispatch);
  };

  return (
    <div className={styles.share}>
      <form className={styles.shareWrapper} encType="multipart/form-data">
        <div className={styles.shareTop}>
          <img
            src={!user.profilePicture ? NOIMAGE : PF + "/" + user.profilePicture}
            alt=""
            className={styles.sharepics}
          />
          <div className={styles.shareButton} onClick={openShareDialog}>
            <span>
              {"What's on your mind " +
                user?.username?.charAt(0).toUpperCase() +
                user?.username?.slice(1) +
                "?"}
            </span>
          </div>
        </div>
        <hr className={styles.shareHr} />
        <div className={styles.shareBottom}>
          <div className={styles.shareOptions}>
            <div className={styles.shareOption} onClick={openShareDialog}>
              <TheatersIcon htmlColor="red" className={styles.shareIcon} />
              <span className={styles.ShareOptionText}>Live Video</span>
            </div>
            <div className={styles.shareOption} onClick={openShareDialog}>
              <PhotoLibraryIcon htmlColor="green" className={styles.shareIcon} />{" "}
              <span className={styles.ShareOptionText}>Photos/Media</span>
            </div>
            <div className={styles.shareOption}>
              <MoodIcon
                htmlColor="Goldenrod"
                className={styles.shareIcon}
                onClick={openPopupDialog}
              />
              <span className={styles.ShareOptionText}>Feeling/Activity</span>
            </div>
          </div>
        </div>
      </form>
      <div className={styles.chat}>
        <div className={styles.chatButton}>
          <VideoCameraFrontIcon className={styles.chatIcon} />
          <span className={styles.chatText}>Create room</span>
        </div>
        <div className={styles.friends}>
          <div className={styles.imgContainer}>
            <img src="/images/persons/1.jpg" alt="" className={styles.chatImg} />
          </div>
          <div className={styles.imgContainer}>
            <img src="/images/persons/1.jpg" alt="" className={styles.chatImg} />
          </div>
          <div className={styles.imgContainer}>
            <img src="/images/persons/1.jpg" alt="" className={styles.chatImg} />
          </div>
          <div className={styles.imgContainer}>
            <img src="/images/persons/1.jpg" alt="" className={styles.chatImg} />
          </div>
          <div className={styles.imgContainer}>
            <img src="/images/persons/1.jpg" alt="" className={styles.chatImg} />
          </div>
          <div className={styles.imgContainer}>
            <img src="/images/persons/1.jpg" alt="" className={styles.chatImg} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Share;
