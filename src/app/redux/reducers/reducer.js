import { defaultState } from "../../../server/defaultState";
import * as types from "../actions/action_types";

export function tasks(tasks = [], action) {
  switch (action.type) {
    case types.SET_STATE:
      return action.state.tasks;
    case types.CREATE_TASK:
      return [
        ...tasks,
        {
          name: "New Task",
          id: action.taskID,
          group: action.groupID,
          owner: action.ownerID,
          isComplete: false,
        },
      ];

    case types.SET_TASK_COMPLETE:
      return tasks.map((task) => {
        return task.id === action.taskID
          ? { ...task, isComplete: action.isComplete }
          : task;
      });

    case types.SET_TASK_NAME:
      return tasks.map((task) => {
        return task.id === action.taskID
          ? { ...task, name: action.name }
          : task;
      });

    case types.SET_TASK_GROUP:
      return tasks.map((task) => {
        return task.id === action.taskID
          ? { ...task, group: action.groupID }
          : task;
      });
    default:
      return tasks;
  }
}

export function comments(comments = [], action) {
  return comments;
}

export function groups(groups = [], action) {
  switch (action.type) {
    case types.SET_STATE:
      return action.state.groups;
  }
  return groups;
}

export function users(users = [], action) {
  return users;
}

export function session(userSession = defaultState.session || {}, action) {
  let { type, authenticated, session } = action;
  switch (type) {
    case types.SET_STATE:
      return { ...userSession, id: action.state.session.id };
    case types.REQUEST_AUTHENTICATE_USER:
      return { ...userSession, authenticated: types.AUTHENTICATING };
    case types.PROCESSING_AUTHENTICATE_USER:
      return { ...userSession, authenticated };
    default:
      return userSession;
  }
}
