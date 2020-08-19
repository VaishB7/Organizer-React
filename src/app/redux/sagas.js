import { take, put, select } from "redux-saga/effects";
import { v1 as uuid } from "uuid";
import * as types from "./actions/action_types";
import * as organizerActions from "./actions/organizerActions";
import axios from "axios";
import { history } from "./history";

const url = "http://localhost:7777";

export function* taskCreationSaga() {
  while (true) {
    const { groupID } = yield take(types.REQUEST_TASK_CREATION);
    const taskID = uuid();
    const ownerID = "U1";
    yield put(organizerActions.createTask(taskID, groupID, ownerID));
    //console.log("got Group ID", groupID);

    const { res } = yield axios.post(url + "/task/new", {
      //req, what ever we put here becomes the body property of the post request that is handled on the server

      task: {
        id: taskID,
        group: groupID,
        owner: ownerID,
        isComplete: false,
        name: "New Task",
      },
    });

    console.info("GOT RESPONSE,", res);
  }
}

//2nd saga
export function* taskModificationSaga() {
  while (true) {
    //give take an array of different actions & if any of these actions are dispatched the next line is executed.
    const task = yield take([
      types.SET_TASK_COMPLETE,
      types.SET_TASK_GROUP,
      types.SET_TASK_NAME,
    ]);

    axios.post(url + "/task/update", {
      // we pass here a request object with the property task
      task: {
        id: task.taskID,
        group: task.groupID,
        name: task.name,
        isComplete: task.isComplete,
      },
    });
  }
}

export function* userAuthenticationSaga() {
  while (true) {
    const { username, password } = yield take(types.REQUEST_AUTHENTICATE_USER);

    try {
      const { data } = yield axios.post(url + "/authenticate", {
        username,
        password,
      });
      if (!data) {
        throw new Error(); //this is bring to the catch
      }

      console.log("Authenticated!", data);
      yield put(organizerActions.setstate(data.state));
      yield put(organizerActions.processAuthenticateUser(types.AUTHENTICATED));

      history.push("/dashboard");
    } catch (e) {
      console.log("Can't Authenticate");
      yield put(
        organizerActions.processAuthenticateUser(types.NOT_AUTHENTICATED)
      );
    }
  }
}
