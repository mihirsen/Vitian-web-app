import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" onClick={toggleNav}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/mysubjects">
              My Subjects
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/attendance">
              Attendance
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/timetable">
              Timetable
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
