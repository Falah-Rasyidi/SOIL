import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li>
            <Link to="/users">User Management</Link>
          </li>
          {/* Add more links to other admin features here */}
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
