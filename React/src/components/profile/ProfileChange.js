import { useReducer, useEffect, useRef, useContext } from "react";

import { useNavigate } from "react-router-dom";

import {
  inputFieldsReducer,
  errorFieldsReducer,
  initFieldsErrors,
  trimFields,
  touchedFieldsReducer,
} from "../Helpers";
import { currentSessionContext } from "../../contexts/currentSessionContext";
import {
  searchUser,
  setCurrentUser,
  getCurrentUser,
  verifyUser,
  editUser,
  deleteUser,
} from "../../data/repository";

/**
 *
 * @param {*} props
 * @returns {jsx} for profile change page
 */
const ProfileChange = (props) => {
  const { setNotif } = useContext(currentSessionContext);
  const navigate = useNavigate();

  // Gets current information to be used for page displayed
  const user = JSON.parse(getCurrentUser());

  // State that holds user input in fields

  const initialInputFields = {
    username: user.username,
    email: user.email,
    currPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    headline: user.headline === null ? "" : user.headline,
    bio: user.bio === null ? "" : user.bio,
    interests: user.interests === null ? "" : user.interests,
  };
  const [userInputFields, dispatchUserInputFields] = useReducer(
    inputFieldsReducer,
    initialInputFields
  );

  // State that contains errors for fields
  const initialErrors = initFieldsErrors(userInputFields);
  const [errors, dispatchErrors] = useReducer(
    errorFieldsReducer,
    initialErrors
  );

  // State for managing which fields have been touched by user
  const initialTouchedInputFields = {};
  const [touchedInputFields, dispatchTouchedInputFields] = useReducer(
    touchedFieldsReducer,
    initialTouchedInputFields
  );

  // References to each input field
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const currPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmNewPasswordRef = useRef(null);

  const headlineRef = useRef(null);
  const bioRef = useRef(null);
  const interestsRef = useRef(null);

  // input field validation
  useEffect(() => {
    dispatchErrors({
      type: "PROFILECHANGE_VALIDATE_INPUT_FIELDS",
      value: userInputFields,
    });
  }, [userInputFields]);

  // Generic change handler
  function handleInputFieldChange(e) {
    dispatchUserInputFields({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  }
  // when input field is focused (by clicking, pressing tab, etc)
  function onChangeFocus(e) {
    dispatchTouchedInputFields({
      type: "SET_TOUCHED_FIELD",
      touchedField: e.target.getAttribute("name"),
    });
  }
  // helper function for touching a field
  const isInputTouched = (fieldName) => {
    return touchedInputFields[fieldName];
  };

  // checking if input fields are valid
  function isAllInputFieldsValid(userInputFields) {
    for (const field in errors) {
      if (errors[field].length > 0) {
        return false;
      }
    }
    return true;
  }
  function isInputFieldValid(field) {
    return errors[field].length === 0;
  }

  // Ensure that the name field is set last as we need it to retrieve all other
  // fields.
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const trimmedInputFields = trimFields(userInputFields);
      const isValid = isAllInputFieldsValid(userInputFields);
      // Check if username is duplicate
      const isUsernameDuplicate = await searchUser(
        trimmedInputFields.username,
        null
      );
      // Check if email is duplicate
      const isEmailDuplicate = await searchUser(null, trimmedInputFields.email);
      // Check if password is incorrect for a given email
      const isPasswordIncorrect =
        trimmedInputFields.currPassword === ""
          ? false
          : // Need to use user's current email as email field may be changed
            !(await verifyUser(
              user.email.toLowerCase(),
              trimmedInputFields.currPassword
            ));
      // If invalid do the following
      if (!isValid) {
        // Focus on the input field with the error in order
        if (errors.username.length > 0) {
          usernameRef.current.focus();
        } else if (errors.email.length > 0) {
          emailRef.current.focus();
        } else if (errors.currPassword.length > 0) {
          currPasswordRef.current.focus();
        } else if (errors.newPassword.length > 0) {
          newPasswordRef.current.focus();
        } else if (errors.confirmNewPassword.length > 0) {
          confirmNewPasswordRef.current.focus();
        } else if (errors.headline.length > 0) {
          headlineRef.current.focus();
        } else if (errors.bio.length > 0) {
          bioRef.current.focus();
        } else if (errors.interests.length > 0) {
          interestsRef.current.focus();
        }
      }
      // If valid do the following
      else if (isValid) {
        // Get current user details and new user details for comparison
        const currUser = JSON.parse(getCurrentUser());
        // treat empty strings as null when communicating with database
        const newUser = {
          user_id: currUser.user_id,
          username: trimmedInputFields.username,
          email: trimmedInputFields.email.toLowerCase(),
          password:
            trimmedInputFields.newPassword === ""
              ? null
              : trimmedInputFields.newPassword,
          headline:
            trimmedInputFields.headline === ""
              ? null
              : trimmedInputFields.headline,
          bio: trimmedInputFields.bio === "" ? null : trimmedInputFields.bio,
          interests:
            trimmedInputFields.interests === ""
              ? null
              : trimmedInputFields.interests,
        };

        // username validation
        if (isUsernameDuplicate && newUser.username != currUser.username) {
          dispatchErrors({
            type: "SET_ERRORS",
            value: {
              ...errors,
              username: [
                ...errors.username,
                "Username is already registered, try a different username.",
              ],
            },
          });
          usernameRef.current.focus();
          throw new Error("Username is not unique");
        }
        // Email validation
        else if (isEmailDuplicate && newUser.email != currUser.email) {
          dispatchErrors({
            type: "SET_ERRORS",
            value: {
              ...errors,
              email: [
                ...errors.email,
                "Email is already registered, try a different email.",
              ],
            },
          });
          emailRef.current.focus();
          throw new Error("Email is not unique");
        }
        // Passworld validation
        else if (isPasswordIncorrect) {
          dispatchErrors({
            type: "SET_ERRORS",
            value: {
              ...errors,
              currPassword: [
                ...errors.currPassword,
                "Password is incorrect, try again or leave password field empty.",
              ],
            },
          });
          currPasswordRef.current.focus();
          throw new Error("Password is not correct");
        }

        // After verification checks succeeded, edit the user
        await editUser(currUser, newUser);
        console.log("USER CHANGED TO: " + JSON.stringify(newUser));
        // Set current user after database has processed edit request
        const user = await searchUser(null, newUser.email);
        setCurrentUser(
          Object.fromEntries(
            Object.entries(user).filter((attr) => attr != "password_hash")
          )
        );

        setNotif("changedetails");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  }
  function deleteAccount() {
    const currentUser = JSON.parse(getCurrentUser());

    deleteUser(currentUser.user_id);
    setCurrentUser(null);

    setNotif("delete");
    navigate("/");
  }

  return (
    <div className="frame">
      {/* form for editing user */}
      <h1>Edit your account details</h1>
      <hr></hr>
      <form onSubmit={onSubmit}>
        {/* input field for username */}
        <h4>Change your username</h4>
        <hr></hr>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          id="username"
          ref={usernameRef}
          className={`form-control ${
            !isInputTouched("username")
              ? "is-neutral"
              : isInputFieldValid("username")
              ? "is-valid"
              : "is-invalid"
          }`}
          value={userInputFields.username}
          onChange={handleInputFieldChange}
          onFocus={onChangeFocus}
        />
        <div className="invalid-feedback">
          <ul>
            {errors.username.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
        <hr />
        {/* input field for email */}
        <h4>Change your email</h4>
        <hr></hr>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          id="email"
          ref={emailRef}
          className={`form-control ${
            !isInputTouched("email")
              ? "is-neutral"
              : isInputFieldValid("email")
              ? "is-valid"
              : "is-invalid"
          }`}
          value={userInputFields.email}
          onChange={handleInputFieldChange}
          onFocus={onChangeFocus}
        />
        <div className="invalid-feedback">
          <ul>
            {errors.email.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
        <hr />

        <h4>Change your password</h4>
        <hr></hr>
        {/* input field for currPassword */}
        <label htmlFor="Old password">Old Password</label>
        <input
          name="currPassword"
          id="currPassword"
          type="password"
          ref={currPasswordRef}
          className={`form-control ${
            isInputFieldValid("currPassword") ? "is-neutral" : "is-invalid"
          }`}
          onChange={handleInputFieldChange}
          onFocus={onChangeFocus}
          value={userInputFields.currPassword}
        />
        <div className="invalid-feedback">
          <ul>
            {errors.currPassword.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
        {/* input field for new password */}
        <label htmlFor="New password">New Password</label>
        <input
          name="newPassword"
          id="newPassword"
          type="password"
          ref={newPasswordRef}
          className={`form-control ${
            userInputFields.newPassword === ""
              ? "is-neutral"
              : isInputFieldValid("newPassword")
              ? "is-valid"
              : "is-invalid"
          }`}
          onChange={handleInputFieldChange}
          onFocus={onChangeFocus}
          value={userInputFields.newPassword}
        />
        <div className="invalid-feedback">
          <ul>
            {errors.newPassword.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
        {/* input field for confirming new password */}
        <label htmlFor="Confirm new password">Confirm New Password</label>
        <input
          name="confirmNewPassword"
          id="confirmNewPassword"
          type="password"
          ref={confirmNewPasswordRef}
          className={`form-control ${
            userInputFields.confirmNewPassword === "" &&
            userInputFields.newPassword === userInputFields.confirmNewPassword
              ? "is-neutral"
              : isInputFieldValid("confirmNewPassword")
              ? "is-valid"
              : "is-invalid"
          }`}
          onChange={handleInputFieldChange}
          onFocus={onChangeFocus}
          value={userInputFields.confirmNewPassword}
        />
        <div className="invalid-feedback">
          <ul>
            {errors.confirmNewPassword.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
        <hr />

        <h4>Change your profile details</h4>
        <hr></hr>
        {/* input field for headline */}
        <span className="profile-change-titles">
          <label htmlFor="headline">Headline</label>
          <p className="profile-change-small-text">
            (Leave blank to remove from profile)
          </p>
        </span>
        <textarea
          name="headline"
          id="headline"
          ref={headlineRef}
          className={`form-control ${
            !isInputTouched("headline")
              ? "is-neutral"
              : isInputFieldValid("headline")
              ? "is-valid"
              : "is-invalid"
          }`}
          value={userInputFields.headline}
          onChange={handleInputFieldChange}
          onFocus={onChangeFocus}
        ></textarea>
        <div className="invalid-feedback">
          <ul>
            {errors.headline.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
        {/* input field for bio */}
        <span className="profile-change-titles">
          <label htmlFor="about me">About Me</label>
          <p className="profile-change-small-text">
            (Leave blank to remove from profile)
          </p>
        </span>
        <textarea
          name="bio"
          id="bio"
          ref={bioRef}
          className={`form-control ${
            !isInputTouched("bio")
              ? "is-neutral"
              : isInputFieldValid("bio")
              ? "is-valid"
              : "is-invalid"
          }`}
          value={userInputFields.bio}
          onChange={handleInputFieldChange}
          onFocus={onChangeFocus}
        ></textarea>
        <div className="invalid-feedback">
          <ul>
            {errors.bio.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
        {/* input field for interests */}
        <span className="profile-change-titles">
          <label htmlFor="interests">Interests</label>
          <p className="profile-change-small-text">
            (Leave blank to remove from profile)
          </p>
        </span>
        <textarea
          name="interests"
          id="interests"
          ref={interestsRef}
          className={`form-control ${
            !isInputTouched("interests")
              ? "is-neutral"
              : isInputFieldValid("interests")
              ? "is-valid"
              : "is-invalid"
          }`}
          value={userInputFields.interests}
          onChange={handleInputFieldChange}
          onFocus={onChangeFocus}
        ></textarea>
        <div className="invalid-feedback">
          <ul>
            {errors.interests.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
        {/* submit button */}
        <div className="form-group my-3">
          <input
            htmlFor="save changes"
            type="submit"
            value="Save changes"
            className="btn btn-primary m-1 profile-change"
          />
          <button
            className="btn btn-danger m-1 profile-change"
            onClick={deleteAccount}
          >
            Delete profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileChange;
