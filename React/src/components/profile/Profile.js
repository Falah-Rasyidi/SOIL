import { useContext } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { getCurrentUser } from "../../data/repository";
import { currentSessionContext } from "../../contexts/currentSessionContext";

/**
 *
 * @param {*} props
 * @returns {jsx} for profile page
 */
const Profile = (props) => {
  const { notification, setNotif } = useContext(currentSessionContext);

  const user = JSON.parse(getCurrentUser());
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("CART");
    setNotif("logoff");

    navigate("/");
  }

  return (
    <>
      <motion.div className="profile-background"></motion.div>
      <div className="profile">
        <motion.div
          id="avatar"
          className="profile-picture"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 1.3 } }}
        ></motion.div>
        <motion.div
          className="profile-content"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 1.3 } }}
        >
          <div className="profile-essentials">
            <div className="essentials-text">
              <h4>Username</h4>
              <p>{user.username}</p>
              <hr />
              <h4>Email</h4>
              <p>{user.email}</p>
              <hr />
              <h4>Date joined</h4>
              <p>{user.date_joined}</p>
            </div>
          </div>
          <div className="profile-optionals">
            {user.headline !== null && (
              <div className="profile-headline">
                <h4>Headline</h4>
                <p> {user.headline}</p>
              </div>
            )}
            {user.bio !== null && (
              <div className="profile-bio">
                <h4>About Me</h4>
                <p> {user.bio}</p>
              </div>
            )}
            {user.interests !== null && (
              <div className="profile-interests">
                <h4>Interests</h4>
                <p> {user.interests}</p>
              </div>
            )}
            {!user.headline && !user.bio && !user.interests && (
              <p>
                You may add additional information by clicking on "Edit profile"
              </p>
            )}
          </div>
          <div className="profile-buttons">
            <button type="button" className="btn btn-danger" onClick={logOut}>
              Log out
            </button>

            <Link to="/profilechange">
              <Button type="button" className="btn btn-primary">
                Edit profile
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Profile;
