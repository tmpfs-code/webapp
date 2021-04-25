import { rootReducer } from "./reducers/root";
// import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
// import { middleware } from "./actions/middleware";

const store = createStore(
  rootReducer,
  applyMiddleware(
    // thunkMiddleware, // lets us dispatch() functions
    createLogger(), // neat middleware that logs actions
    // middleware
  )
);

const dispatch = store.dispatch;
const getState = store.getState;

export {store, dispatch, getState};
