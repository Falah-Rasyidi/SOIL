import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import UserManagement from "./components/UserManagement";

import { Header, Navbar, Footer } from "./components/helpers";

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
