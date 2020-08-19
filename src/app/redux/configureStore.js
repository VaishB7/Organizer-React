import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import { createLogger } from "redux-logger";
//to run Saga
import createSagaMiddleware from "redux-saga";
import * as sagas from "./sagas";
//import * as sagas from "./sagas.mock";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      createLogger(),
      sagaMiddleware,
      reduxImmutableStateInvariant()
    )
  )
);

for (let saga in sagas) {
  //will run all sagas
  sagaMiddleware.run(sagas[saga]);
}

//This middleware will warn us if we accidently mutate ant state in the redux store.

//to run all Sagas:

/*Originally :  For devlopment, only this part
 
import { createStore } from "redux";
import rootReducer from "./reducers/index.js";

//Middleware is just to Enhance redux, it should not go into development.


export default function configureStore(initialState) {
  return createStore(rootReducer, initialState);
}
*/
