import React from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import * as organizerActions from "../redux/actions/organizerActions";

const TaskDetail = ({
  id,
  comments,
  task,
  isComplete,
  groups,
  setTaskComplete,
  setTaskName,
  setTaskGroup,
}) => (
  <div>
    <div>
      <input value={task.name} onChange={setTaskName} />
    </div>
    <div>
      <button onClick={() => setTaskComplete(id, !isComplete)}>
        {isComplete ? "Reopen" : "Complete"}
      </button>
    </div>
    <div>
      <select onChange={setTaskGroup} value={task.group}>
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
    </div>
    <div>
      <Link to="/dashboard">
        <button>Done</button>
      </Link>
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let task = state.tasks.find((task) => task.id === id);
  let groups = state.groups;
  let isComplete = task.isComplete;

  return {
    id,
    task,
    groups,
    isComplete,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    setTaskComplete(id, isComplete) {
      dispatch(organizerActions.setTaskComplete(id, isComplete));
    },
    setTaskName(e) {
      dispatch(organizerActions.setTaskName(id, e.target.value));
    },
    setTaskGroup(e) {
      dispatch(organizerActions.setTaskGroup(id, e.target.value));
    },
  };
};

export const ConnectedTaskDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetail);
