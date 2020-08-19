import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navigation = () => (
  <div>
    <Link to="/dashboard">
      <h3>My Organizer</h3>
    </Link>
  </div>
);

export const ConnectedNavigation = connect((state) => state)(Navigation);
//connect returns a fn which then uses the CoursesPage as parameters
//2 fn calls
