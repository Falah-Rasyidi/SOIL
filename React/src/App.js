import React from "react";

// These are added on node modules
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Snackbar from "@mui/material/Snackbar";

// css component
import "./App.css";

// Helpers
import { Header, Navbar, Footer } from "./components/Helpers.js";

// Profile components
import { Profile, ProfileChange } from "./components/profile";
import { Signup } from "./components/signup";
import { LoginPage, Login } from "./components/login";

// Shop components
import { Home } from "./components/home";
import { Shop } from "./components/shop";

// Purchase components
import { CartPage } from "./components/cart";
import { Summary } from "./components/summary";
import { Purchase } from "./components/purchase";
// 'Databases'

// Context
import { currentSessionContext as SessionContext } from "./contexts/currentSessionContext.js";

// Custom webhooks
import { useNotification, getMessage } from "./components/Helpers.js";

/**The front-end of application built with ReactJS
 *
 * @returns Front-end of website
 */
function App() {
  // Notification state
  const [notification, setNotif] = useNotification();

  // Makes notification disappear after 3 seconds
  function handleClose(reason) {
    if (reason == "timeout") {
      return;
    }
    setNotif("");
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SessionContext.Provider value={{ notification, setNotif }}>
        <Router>
          <Header />
          <Navbar />
          {/* Body of page displayed here*/}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profilechange" element={<ProfileChange />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/summary" element={<Summary />} />
            </Routes>
            <Snackbar
              open={Boolean(notification)}
              message={getMessage(notification)}
              autoHideDuration={3000}
              onClose={handleClose}
            />
          </main>
          <Footer />
        </Router>
      </SessionContext.Provider>
    </LocalizationProvider>
  );
}

export default App;
