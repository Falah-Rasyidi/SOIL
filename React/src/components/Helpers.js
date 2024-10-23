import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Cart } from "./cart";
import { Login } from "./login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { growableItems } from "../data/shop_repo";
import { getCurrentUser, getShopItemPriceString } from "../data/repository";
import { LoginBox } from "./login";
import { CartBox } from "./cart";

/**
 * -----------------------------------
 * THESE ARE STRUCTURAL COMPONENTS
 * -----------------------------------
 */
/**
 *
 * @returns {jsx} header jsx
 */
export const Header = () => {
  return (
    <div>
      <header className="header primary-colour">
        <h1 className="font-logo escape-hatch">
          <Link to="/">SOIL</Link>
        </h1>
      </header>
    </div>
  );
};
/**
 *
 * @param {*} props
 * @returns {jsx} for navbar
 */
export const Navbar = (props) => {
  // JSX for links
  const textLinkItem = (text, link) => {
    return (
      <motion.div whileHover={{ scale: 1.3 }}>
        <li>
          <Link to={`/${link}`}>{text}</Link>
        </li>
      </motion.div>
    );
  };
  const iconLinkItem = (iconName, link) => {
    return (
      <motion.div whileHover={{ scale: 1.5 }}>
        <Link to={`/${link}`}>
          <FontAwesomeIcon icon={iconName} />
        </Link>
      </motion.div>
    );
  };

  const user = JSON.parse(getCurrentUser());

  const [loginBoxOpen, setLoginBoxOpen] = useState(false);
  const openLoginBox = () => setLoginBoxOpen(true);
  const closeLoginBox = () => setLoginBoxOpen(false);

  const [cartBoxOpen, setCartBoxOpen] = useState(false);
  const openCartBox = () => {
    console.log("cartBox state was clicked on");
    setCartBoxOpen(true);
  };
  const closeCartBox = () => setCartBoxOpen(false);

  return (
    <div className="navbar secondary-colour">
      {/* Backdrop and dropin boxes */}
      <AnimatePresence>
        {loginBoxOpen && (
          <LoginBox isOpen={loginBoxOpen} handleClose={closeLoginBox} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {cartBoxOpen && (
          <CartBox isOpen={cartBoxOpen} handleClose={closeCartBox} />
        )}
      </AnimatePresence>

      {/* Navigation items */}
      {/* Left of navbar */}
      <ol className="navbar-items-left"></ol>
      {/* Center of navbar */}
      <ol className="navbar-items-center">
        {textLinkItem("Home", "")}
        {textLinkItem("Shop", "shop")}
      </ol>
      {/* Right of navbar */}
      <ol className="navbar-items-right">
        {/* If current cart is not empty, show shopping cart icon */}
        {getCurrentUser() ? (
          <motion.div whileHover={{ scale: 1.5 }} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon
              onClick={() => (cartBoxOpen ? closeCartBox() : openCartBox())}
              icon={faCartShopping}
            ></FontAwesomeIcon>
          </motion.div>
        ) : (
          ""
        )}
        {/* Login/profile button */}
        <motion.div whileHover={{ scale: 1.2 }}>
          {user !== null ? (
            <Link to="/profile">
              <li id="user">
                Welcome, <b>{user.username}</b>
              </li>
            </Link>
          ) : (
            <Link
              onClick={() => (loginBoxOpen ? closeLoginBox() : openLoginBox())}
            >
              <li id="user">Login</li>
            </Link>
          )}
        </motion.div>
      </ol>
    </div>
  );
};
/**
 *
 * @returns {jsx} footer jsx
 */
export const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-row">
          <span className="font-logo">SOIL</span>
          <div className="footer-row">
            <div className="footer-left">
              <ol>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
              </ol>
            </div>
            <div className="footer-right">
              <ol>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="footer-row">
          <p className="footer-smalltext">
            Copyright &copy; 2024 Natchanon Laoharawee, Falah Rasyidi
          </p>
        </div>
      </footer>
    </div>
  );
};

/**
 *
 * @returns {jsx} list of growable products
 */
export const GrowInformation = () => {
  // State to track the active dropdown index
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(-1);
  // Function to toggle the dropdown
  const toggleDropdown = (index) => {
    if (activeDropdownIndex === index) {
      setActiveDropdownIndex(-1);
    } else {
      setActiveDropdownIndex(index);
    }
  };

  return (
    <div className="row ternary-colour">
      <motion.div
        className="column-content"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 1.3 } }}
      >
        {/* Header */}
        <h1>Let's grow vegetables together!</h1>
        <hr />
        <div className="dropdown-list">
          <ul>
            {/* Mapping over growableItems array */}
            {growableItems.map((item, index) => (
              <motion.li
                key={index}
                onClick={() => toggleDropdown(index)}
                whileHover={{ scale: 1.05 }}
              >
                <a>{item.name}</a>
                <hr style={{ margin: "3px" }}></hr>
                <AnimatePresence>
                  {activeDropdownIndex === index && (
                    <div className="dropdown-list-div">
                      <motion.p
                        className="dropdown-list-description"
                        initial={{ y: -15, opacity: 0 }}
                        animate={{
                          y: 0,
                          opacity: 1,
                          transition: { duration: 1.3 },
                        }}
                        exit={{ y: -15, opacity: 0 }}
                      >
                        {item.description}
                      </motion.p>
                      {/* Move the table outside of the <p> element */}
                      <motion.div
                        className="dropdown-list-tags"
                        initial={{ y: -15, opacity: 0 }}
                        animate={{
                          y: 0,
                          opacity: 1,
                          transition: { duration: 1.3 },
                        }}
                        exit={{ y: -15, opacity: 0 }}
                      >
                        {/* Table descriptions */}
                        <table className="table-success text-white">
                          <tbody>
                            <tr>
                              <th scope="row">Watering interval: </th>
                              <td>{item.feeding}</td>
                            </tr>
                            <tr>
                              <th scope="row">Ideal humidity: </th>
                              <td>{item.humidity}</td>
                            </tr>
                            <tr>
                              <th scope="row">Individual spacing: </th>
                              <td>{item.spacing}</td>
                            </tr>
                            <tr>
                              <th scope="row">Months to plant: </th>
                              <td>{item.months}</td>
                            </tr>
                          </tbody>
                        </table>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

/**
 * -----------------------------------
 * HELPER FUNCTIONS
 * -----------------------------------
 */
/**
 * Expects an object that only has attributes that contain strings
 * @param {*} inputFields
 * @returns an object that have the same attributes and strings
 * without trailing and leading whitespace characters
 */
export const trimFields = (inputFields) => {
  const trimmedInputFields = {};
  Object.keys(inputFields).map(
    (key) => (trimmedInputFields[key] = inputFields[key].trim())
  );
  return trimmedInputFields;
};
/**
 * Expects an object that only has attributes that contain strings
 * @param {*} inputFields
 * @returns an object that has the same attributes as the one passed
 * and puts an empty array for each of the attributes
 */
export const initFieldsErrors = (inputFields) => {
  return Object.fromEntries(Object.keys(inputFields).map((key) => [key, []]));
};
export const FieldRequirementsBox = (focus) => {
  switch (focus) {
    case "username":
      return (
        /**
         * ALLOWED:
         * - 1 Upper/ 1 lower case letters   (A-Z) | (a-z)
         * - 1 Digits                     (0-9)
         * - 1 Special characters         (~`!@#$%^&*()+=_-{}[]\|:;”’?/<>,.)
         * - Greater than twelve characters
         *
         * NOT ALLOWED:
         * - Length shorter than twelve characters
         */
        <div className="m-3 p-3 bg-success bg-opacity-25 border border-secondary rounded">
          <h4>Username Requirements</h4>
          <ul>
            <li>Must be between 6 to 20 characters (inclusive)</li>
          </ul>
          <span>May contain:</span>
          <ul>
            <li>Upper and lower case characters</li>
            <li>Digits</li>
            <li>Special characters</li>
          </ul>
        </div>
      );
    case "email":
      return (
        /**
         * ALLOWED:
         * - In the format <username>@<emailprovider>
         *
         * NOT ALLOWED:
         * - Anything else
         */
        <div className="m-3 p-3 bg-success bg-opacity-25 border border-secondary rounded">
          <h4>Email Requirements</h4>
          <span>In the format:</span>
          <ul>
            <li>&lt;username&gt;@&lt;email_provider&gt;</li>
          </ul>
        </div>
      );
    case "password":
      return (
        <div className="m-3 p-3 bg-success bg-opacity-25 border border-secondary rounded">
          <h4>Password Requirements</h4>
          <ul>
            <li>Must have at least twelve characters</li>
            <li>Must contain at least one uppercase (A-Z)</li>
            <li>Must contain at least one lowercase character (a-z)</li>
            <li>
              Must contain at least one special character (/|&lt;&gt;,.?])
            </li>
            <li>Must contain at least one number (0-9)</li>
          </ul>
        </div>
      );
    default:
      return;
  }
};

/**
 * -----------------------------------
 * NOTIFICATION COMPONENTS
 * -----------------------------------
 */
// Custom hook to manage notification state
export const useNotification = (initialState = "") => {
  const [notification, setNotification] = useState(initialState);

  // Function to handle notifications
  function handleNotification(open) {
    switch (open) {
      case "login":
        setNotification("login");
        break;
      case "signup":
        setNotification("signup");
        break;
      case "changedetails":
        setNotification("changedetails");
        break;
      case "delete":
        setNotification("delete");
        break;
      case "logoff":
        setNotification("logoff");
        break;
      case "purchase":
        setNotification("purchase");
        break;
      case "addProduct":
        setNotification("addProduct");
        break;
      case "deleteItem":
        setNotification("deleteProduct");
        break;
      default:
        setNotification("");
        break;
    }
  }

  return [notification, handleNotification];
};

// String message conditions
/**
 *
 * @param {*} notification
 * @returns {string} returns a string to display for snackbar notification
 */
export const getMessage = (notification) => {
  switch (notification) {
    case "login":
      return "Successfully logged in!";
    case "signup":
      return "Successfully signed up!";
    case "changedetails":
      return "Saved changes!";
    case "delete":
      return "Account successfully deleted!";
    case "logoff":
      return "Logged off successfully!";
    case "purchase":
      return "Thank you for your purchase!";
    case "addProduct":
      return "Item added to cart!";
    case "deleteProduct":
      return "Item deleted from cart!";
    default:
      return "";
  }
};

/**
 * -----------------------------------
 * USEREDUCER COMPONENTS
 * -----------------------------------
 */
/**
 *
 * @param {*} state
 * @param {*} action
 * @returns state reducer for input fields
 */
export const inputFieldsReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "SET_INPUT_FIELDS":
      let inputFields = action.value;
      return inputFields;
    default:
      // Put an error into console if unknown action
      try {
        throw new Error("Unknown action: ${action.type}");
      } catch (error) {
        console.error(error);
      }
  }
};
/**
 * A reducer that keeps track of fields that have been touched
 * @param {*} state
 * @param {*} action
 */
export const touchedFieldsReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOUCHED_FIELD":
      return {
        ...state,
        [action.touchedField]: true,
      };
    default:
      // Put an error into console if unknown action
      try {
        throw new Error("Unknown action: ${action.type}");
      } catch (error) {
        console.error(error);
      }
  }
};
/**
 *
 * @param {*} state
 * @param {*} action takes products parameter, expecting an array of products
 * @returns state reducer for products
 */
export const productsReducer = (state, action) => {
  try {
    switch (action.type) {
      case "SET_ALL_PRODUCTS":
        // change state to all products
        return action.products;
      case "SET_DISCOUNTED_PRODUCTS":
        // change state to discounted products
        const discountedProducts = [];
        for (const item of action.products) {
          if (item.discount > 0) {
            discountedProducts.push(item);
          }
        }
        return discountedProducts;
      case "SET_STOCKED_PRODUCTS":
        // change state to stocked products
        const stockedProducts = [];
        for (const item of action.products) {
          if (item.stock === true) {
            stockedProducts.push(item);
          }
        }
        return stockedProducts;
      case "SET_SPECIALS_PRODUCTS":
        // Determine specials, for now is whatever is on stock and discounted
        const specialsProducts = [];
        for (const item of action.products) {
          if (item.stock === true && item.discount > 0) {
            specialsProducts.push(item);
          }
        }
        return specialsProducts;
      default:
        // Put an error into console if unknown action
        throw new Error("Unknown action: ${action.type}");
    }
  } catch (error) {
    console.error(error);
  }
};
/**
 *
 * @param {*} state
 * @param {*} action
 * @returns state reducer for input field errors
 */
export const errorFieldsReducer = (state, action) => {
  let trimmedInputFields = null;
  let currentErrors = null;
  // Switch for errorFields reducer
  switch (action.type) {
    case "SIGNUP_VALIDATE_INPUT_FIELDS":
      trimmedInputFields = trimFields(action.value);
      currentErrors = signupInputValidation(trimmedInputFields);
      return currentErrors;
    case "PROFILECHANGE_VALIDATE_INPUT_FIELDS":
      trimmedInputFields = trimFields(action.value);
      currentErrors = profileChangeInputValidation(trimmedInputFields);
      return currentErrors;
    case "LOGIN_VALIDATE_INPUT_FIELDS":
      trimmedInputFields = trimFields(action.value);
      currentErrors = loginInputValidation(trimmedInputFields);
      return currentErrors;
    case "SET_ERRORS":
      let newErrors = action.value;
      return newErrors;
    default:
      // Put an error into console if unknown action
      try {
        throw new Error("Unknown action: ${action.type}");
      } catch (error) {
        console.error(error);
      }
  }
  /*
--------------------------------------------------------------
INPUT VALIDATION FUNCTIONS
*/
  function signupInputValidation(trimmedInputFields) {
    let currentErrors = initFieldsErrors(trimmedInputFields);
    Object.keys(trimmedInputFields).forEach((key) => {
      const inputField = trimmedInputFields[key].trim();
      // username validation
      if (key === "username") {
        if (inputField.length >= 0 && inputField.length < 6)
          currentErrors[key].push("Username cannot be less than 6 characters.");
        if (inputField.length > 20)
          currentErrors[key].push(
            "Username cannot be more than 20 characters."
          );
        if (!/^\S+$/.test(inputField))
          // Check for blank spaces
          currentErrors[key].push("Username cannot contain blank spaces.");
      }

      // email validation
      if (key === "email") {
        // if email is not within format <username>@<emailprovider>
        if (!/\S+@\S+\.\S+/.test(inputField))
          currentErrors[key].push(
            "Email is not in correct format (e.g. john123@yahoo.com)."
          );
        if (inputField > 255)
          currentErrors[key].push(
            "Email cannot be longer than 255 characters."
          );
      }

      // password validation
      if (key === "password") {
        if (!/(?=.*[A-Z])/.test(inputField)) {
          currentErrors[key].push(
            "Password must contain at least one uppercase letter (A-Z)."
          );
        }
        if (!/(?=.*[a-z])/.test(inputField)) {
          currentErrors[key].push(
            "Password must contain at least one lowercase letter (a-z)."
          );
        }
        if (!/(?=.*[0-9])/.test(inputField)) {
          currentErrors[key].push(
            "Password must contain at least one digit (0-9)."
          );
        }
        if (!/(?=.*[~`!@#$%^&*()+=_\[\]\-{}|:;”’?/<>,.])/.test(inputField)) {
          currentErrors[key].push(
            "Password must contain at least one special character" +
              "(~`!@#$%^&*()+=_-{}[]\\|:;”’?/<>,.)."
          );
        }
        if (inputField.length < 12) {
          currentErrors[key].push(
            "Password must be greater than twelve characters."
          );
        }
      }

      // confirm password validation
      if (key === "confirmPassword") {
        if (trimmedInputFields["password"] !== inputField)
          currentErrors[key].push("Password does not match.");
      }
    });
    return currentErrors;
  }

  function loginInputValidation(trimmedInputFields) {
    let currentErrors = initFieldsErrors(trimmedInputFields);
    Object.keys(trimmedInputFields).forEach((key) => {
      const inputField = trimmedInputFields[key].trim();

      // email validation
      if (key === "email") {
        // if email is not within format <username>@<emailprovider>
        if (!/\S+@\S+\.\S+/.test(inputField))
          currentErrors[key].push(
            "Email is not in correct format (e.g. john123@yahoo.com)."
          );
        if (inputField > 255)
          currentErrors[key].push(
            "Email cannot be longer than 255 characters."
          );
      }
    });
    // return currentErrors object
    return currentErrors;
  }
  function profileChangeInputValidation(trimmedInputFields) {
    let currentErrors = initFieldsErrors(trimmedInputFields);
    Object.keys(trimmedInputFields).forEach((key) => {
      const inputField = trimmedInputFields[key].trim();

      // username validation
      if (key === "username") {
        if (inputField.length >= 0 && inputField.length < 6) {
          currentErrors[key].push("Username cannot be less than 6 characters.");
        }
        if (inputField.length > 20)
          currentErrors[key].push(
            "Username cannot be more than 20 characters."
          );
        if (!/^\S+$/.test(inputField))
          // Check for blank spaces
          currentErrors[key].push("Username cannot contain blank spaces.");
      }

      // email validation
      if (key === "email") {
        // if email is not within format <username>@<emailprovider>
        if (!/\S+@\S+\.\S+/.test(inputField))
          currentErrors[key].push(
            "Email is not in correct format (e.g. john123@yahoo.com)."
          );
        if (inputField > 255)
          currentErrors[key].push(
            "Email cannot be longer than 255 characters."
          );
      }

      // currPassword validation
      if (key === "currPassword") {
        if (
          inputField === "" &&
          (trimmedInputFields.newPassword !== "" ||
            trimmedInputFields.confirmNewPassword !== "")
        ) {
          currentErrors[key].push("Please enter your current password.");
        }
      }

      // newPassword validation
      if (key === "newPassword") {
        if (inputField.length > 0) {
          if (!/(?=.*[A-Z])/.test(inputField))
            currentErrors[key].push(
              "Password must contain at least one uppercase letter (A-Z)."
            );

          if (!/(?=.*[a-z])/.test(inputField))
            currentErrors[key].push(
              "Password must contain at least one lowercase letter (a-z)."
            );

          if (!/(?=.*[0-9])/.test(inputField))
            currentErrors[key].push(
              "Password must contain at least one digit (0-9)."
            );
          if (!/(?=.*[~`!@#$%^&*()+=_\[\]\-{}|:;”’?/<>,.])/.test(inputField))
            currentErrors[key].push(
              "Password must contain at least one special character" +
                "(~`!@#$%^&*()+=_-{}[]\\|:;”’?/<>,.)."
            );

          if (inputField.length < 12)
            currentErrors[key].push(
              "Password must be greater than twelve characters."
            );
        }
      }

      // confirmNewPassword validation
      if (key === "confirmNewPassword") {
        if (trimmedInputFields["newPassword"] !== inputField)
          currentErrors[key].push("Password does not match.");
      }

      // headline validation
      if (key === "headline") {
        if (inputField.length > 255)
          currentErrors[key].push(
            "Headline cannot be longer than 255 characters."
          );
      }

      // bio validation
      if (key === "bio") {
        if (inputField.length > 512)
          currentErrors[key].push(
            "Biography should not be longer than 512 characters."
          );
      }

      // interests validation
      if (key === "interests") {
        if (inputField.length > 512)
          currentErrors[key].push(
            "Interests should not be longer than 512 characters."
          );
      }
    });
    // return currentErrors object
    return currentErrors;
  }
};

// Helper method to calculate the final price of an item, taking into account
// any discounts (or lack thereof)
export function finalPrice(cartItem = null) {
  const discount = cartItem.discount;
  const price = cartItem.price;
  const quantity = cartItem.quantity;
  const final = (price * (1 - discount / 100.0)).toFixed(2);

  if (discount > 0) {
    return (
      <p>
        <s className="text-danger">${price}</s> ${final}
        <span className="text-secondary"> x {quantity}</span>
      </p>
    );
  } else {
    return (
      <p>
        ${price} <span className="text-secondary">x {quantity}</span>
      </p>
    );
  }
}
