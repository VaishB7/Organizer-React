import { take, put, select } from "redux-saga/effects";
import { v1 as uuid } from "uuid";
import * as types from "./actions/action_types";
import * as organizerActions from "./actions/organizerActions";

export function* taskCreationSaga() {
  while (true) {
    const { groupID } = yield take(types.REQUEST_TASK_CREATION);
    const taskID = uuid();
    const ownerID = "U1";
    yield put(organizerActions.createTask(taskID, groupID, ownerID));
    console.log("got Group ID", groupID);
  }
}
