import * as types from "./action_types";

export function requestTaskCreation(groupID) {
  return {
    type: types.REQUEST_TASK_CREATION,
    groupID: groupID,
  };
}

// this will be dispached by SAGA when it compeletes creating
//this task with its own random ID
export function createTask(taskID, groupID, ownerID) {
  return {
    type: types.CREATE_TASK,
    taskID,
    groupID,
    ownerID,
  };
}

export function setTaskComplete(id, isComplete) {
  return {
    type: types.SET_TASK_COMPLETE,
    taskID: id,
    isComplete,
  };
}

export function setTaskGroup(id, groupID) {
  return {
    type: types.SET_TASK_GROUP,
    taskID: id,
    groupID,
  };
}
export function setTaskName(id, name) {
  return {
    type: types.SET_TASK_NAME,
    taskID: id,
    name,
  };
}

export const requestAuthenticateUser = (username, password) => ({
  type: types.REQUEST_AUTHENTICATE_USER,
  username,
  password,
});

export const processAuthenticateUser = (
  status = types.AUTHENTICATING,
  session = null
) => ({
  type: types.PROCESSING_AUTHENTICATE_USER,
  session,
  authenticated: status,
});

export const setstate = (state = {}) => ({
  type: types.SET_STATE,
  state,
});
