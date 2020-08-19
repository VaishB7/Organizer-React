import React from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import ConnectedTaskList from "./ConnectedTaskList";

function Dashboard({ groups }) {
  return (
    <div>
      <h1>Groups</h1>
      {groups.map((group) => (
        <ConnectedTaskList key={group.id} group={group} />
      ))}
    </div>
  );
}

Dashboard.propTypes = {
  groups: propTypes.array.isRequired,
};

function mapStateToProps(state) {
  //debugger;
  return { groups: state.groups };
  //This is the fn that takes state and whatever it returns becomes props of Dashboard
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
