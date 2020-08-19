import { combineReducers } from "redux";
import * as reducer from "./reducer";
//naming impact

const rootReducer = combineReducers({
  tasks: reducer.tasks,
  comments: reducer.comments,
  users: reducer.users,
  groups: reducer.groups,
  session: reducer.session,
  //eg. key:Value, does for all reducers, no more code req here
});

export default rootReducer;
