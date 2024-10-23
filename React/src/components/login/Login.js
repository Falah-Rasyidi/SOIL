import { useReducer, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  inputFieldsReducer,
  errorFieldsReducer,
  initFieldsErrors,
  trimFields,
  touchedFieldsReducer,
} from "../Helpers";
import { currentSessionContext } from "../../contexts/currentSessionContext";
import { setCurrentUser, verifyUser } from "../../data/repository";

/**
 *
 * @param {*} props
 * @returns {jsx} for user login
 */
const Login = (props) => {
  const { setNotif } = useContext(currentSessionContext);

  const navigate = useNavigate();

  // Navbar props
  const { closeLoginBox } = props;

  // State that holds user input in fields
  const initialInputFields = {
    email: "",
    password: "",
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

  // state for managing which fields have been touched by the user
  const initialTouchedInputFields = {};
  const [touchedInputFields, dispatchTouchedInputFields] = useReducer(
    touchedFieldsReducer,
    initialTouchedInputFields
  );

  // References to each input field
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Display errors in userInput fields
  useEffect(() => {
    dispatchErrors({
      type: "LOGIN_VALIDATE_INPUT_FIELDS",
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
    return errors[field] ? errors[field].length === 0 : true;
  }

  // Submit handler
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const trimmedInputFields = trimFields(userInputFields);
      const isValid = isAllInputFieldsValid(userInputFields);
      const login = {
        email: trimmedInputFields.email.toLowerCase(),
        password: trimmedInputFields.password,
      };
      // If invalid do the following
      if (!isValid) {
        // Focus on the input field with the error in order
        if (errors.email.length > 0) {
          emailRef.current.focus();
        } else if (errors.password.length > 0) {
          passwordRef.current.focus();
        }
      }
      // If valid do the following
      else if (isValid) {
        // verify login details
        const user = await verifyUser(login.email, login.password);
        console.log("LOGGED IN USER IS: " + JSON.stringify(user));

        // if user is null, create an error
        if (user === null) {
          throw new Error("Login details are incorrect");
        }
        // will set current user to null if email and password are incorrect
        setCurrentUser(user);
        setNotif("login");
        navigate("/profile");
        closeLoginBox();
      }
    } catch (error) {
      console.error("Error logging in:", error);

      // add an error to error state
      dispatchErrors({
        type: "SET_ERRORS",
        value: {
          ...errors,
          error: ["Invalid username or password"],
        },
      });
      // Focus on email input field to prompt re-input
      emailRef.current.focus();
    }
  }

  return (
    <div className="frame-login">
      <h1>Login</h1>
      <hr />
      <div>
        <form onSubmit={onSubmit}>
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
              required
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
                  ? "is-neutral"
                  : "is-invalid"
              }`}
              value={userInputFields.password}
              onChange={handleInputFieldChange}
              onFocus={onChangeFocus}
              required
            />
          </div>

          <Link to="/signup" onClick={closeLoginBox}>
            Don't have an account?
          </Link>

          <div className="text-danger">
            {/* {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))} */}
            <p>{errors.error}</p>
          </div>

          <div className="form-group">
            <input type="submit" className="btn btn-primary" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
