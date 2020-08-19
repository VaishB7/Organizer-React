import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import propTypes, { func } from "prop-types";
import * as organizerActions from "../redux/actions/organizerActions";

function ConnectedTaskList({ group, tasks, id, createNewTask }) {
  return (
    <div>
      <h3>{group.name}</h3>

      {tasks.map((task) => (
        <Link to={`/task/${task.id}`} key={task.id}>
          <div>{task.name}</div>
        </Link>
      ))}

      <button onClick={() => createNewTask(id)}>Add new</button>
    </div>
  );
}

ConnectedTaskList.propTypes = {
  tasks: propTypes.array.isRequired,
  group: propTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  //debugger;
  return {
    tasks: state.tasks.filter((task) => task.group === ownProps.group.id),
    id: ownProps.group.id,
  };
  //This is the fn that takes state and whatever it returns becomes props of Dashboard
}
function mapDispatchToProps(dispatch, ownProps) {
  return {
    //createNewTask: (id) => dispatch(organizerActions.createNewTask(id)),
    createNewTask(id) {
      console.log(id);
      dispatch(organizerActions.requestTaskCreation(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedTaskList);
