import { useState, useReducer, useEffect, useRef, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { searchUser, setCurrentUser, createUser } from "../../data/repository";
import {
  inputFieldsReducer,
  errorFieldsReducer,
  initFieldsErrors,
  trimFields,
  touchedFieldsReducer,
  FieldRequirementsBox,
} from "../Helpers";
import { currentSessionContext } from "../../contexts/currentSessionContext";

/**
 *
 * @param {*} props
 * @returns {jsx} for signup page
 */
const Signup = (props) => {
  /**
   *
   * @param {string} focus - The field being focused
   * @returns {jsx} error messages
   */

  const { setNotif } = useContext(currentSessionContext);
  const navigate = useNavigate();

  // State that holds user input in fields
  const initialInputFields = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // input field validation
  useEffect(() => {
    dispatchErrors({
      type: "SIGNUP_VALIDATE_INPUT_FIELDS",
      value: userInputFields,
    });
  }, [userInputFields]);

  // State that contains errors for fields
  const [focus, setFocus] = useState("");

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
    setFocus(e.target.getAttribute("name"));
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

  function closeRequirementsBox() {
    setFocus("");
  }

  // Submit handler
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const trimmedInputFields = trimFields(userInputFields);
      const isValid = isAllInputFieldsValid(userInputFields);
      // check if username is duplicate
      const isUsernameDuplicate = await searchUser(
        userInputFields["username"].trim(),
        null
      );
      // check if email is duplicate
      const isEmailDuplicate = await searchUser(
        null,
        userInputFields["email"].trim().toLowerCase()
      );

      // If invalid do the following
      if (!isValid) {
        if (errors.username.length > 0) {
          usernameRef.current.focus();
        } else if (errors.email.length > 0) {
          emailRef.current.focus();
        } else if (errors.password.length > 0) {
          passwordRef.current.focus();
        } else if (errors.confirmPassword.length > 0) {
          confirmPasswordRef.current.focus();
        }
      }
      // if valid do the following
      else if (isValid) {
        const date = new Date().toLocaleString("en-US");

        let newUser = {
          username: trimmedInputFields.username,
          email: trimmedInputFields.email.toLowerCase(),
          password: trimmedInputFields.password,
          date_joined: date,
          headline: null,
          bio: null,
          interests: null,
        };

        // Username validation
        if (isUsernameDuplicate) {
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
        else if (isEmailDuplicate) {
          dispatchErrors({
            type: "SET_ERRORS",
            value: {
              ...errors,
              email: [
                ...errors.email,
                "Email is already registered, try logging in instead.",
              ],
            },
          });
          emailRef.current.focus();
          throw new Error("Email is not unique");
        }
        // if pass email/password unique, create the user.
        await createUser(newUser);

        // get user after database creates it - search by email, though username can be used
        const databaseNewUser = await searchUser(null, newUser.email);
        // If createUser succeeds, continue with the user object
        setCurrentUser(databaseNewUser);

        let newCart = { name: userInputFields.username, items: [] };

        setNotif("signup");
        navigate("/profile");
        return;
      }
    } catch (error) {
      // If an error occurs during createUser, handle it here
      console.error("Error creating user:", error);
    }
  }

  return (
    <div className="frame">
      <h1>Create an account</h1>
      <hr />
      <div className="d-flex justify-content-sm-between">
        <div className="col-md-5">
          <form className="register-form" onSubmit={onSubmit}>
            <div className="form-group my-2">
              <label htmlFor="username" className="control-label">
                Username
              </label>
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
                onBlur={closeRequirementsBox}
              />
              {/* <div className="invalid-feedback">
                  Invalid username or username already taken
                </div> */}
              <div className="invalid-feedback">
                <ul>
                  {errors.username.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="form-group my-2">
              <label htmlFor="email" className="control-label">
                Email
              </label>
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
                onBlur={closeRequirementsBox}
              />
              <div className="invalid-feedback">
                <ul>
                  {errors.email.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="form-group my-2">
              <label htmlFor="password" className="control-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                ref={passwordRef}
                className={`form-control ${
                  !isInputTouched("password")
                    ? "is-neutral"
                    : isInputFieldValid("password")
                    ? "is-valid"
                    : "is-invalid"
                }`}
                value={userInputFields.password}
                onChange={handleInputFieldChange}
                onFocus={onChangeFocus}
                onBlur={closeRequirementsBox}
              />
              <div className="invalid-feedback">
                <ul>
                  {errors.password.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="form-group my-2">
              <label htmlFor="confirmPassword" className="control-label">
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                ref={confirmPasswordRef}
                className={`form-control ${
                  !isInputTouched("confirmPassword")
                    ? "is-neutral"
                    : isInputFieldValid("confirmPassword")
                    ? "is-valid"
                    : "is-invalid"
                }`}
                value={userInputFields.confirmPassword}
                onChange={handleInputFieldChange}
                onFocus={onChangeFocus}
                onBlur={closeRequirementsBox}
              />
              <div className="invalid-feedback">
                <ul>
                  {errors.confirmPassword.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="form-group">
              <input
                type="submit"
                className="btn btn-primary"
                value="Sign up"
              />
            </div>
          </form>
        </div>

        {/* Requirements box */}
        <AnimatePresence>
          {focus && (
            <motion.div
              className="col-md-6 m-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              {FieldRequirementsBox(focus)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Signup;
