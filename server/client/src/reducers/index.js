import { combineReducers } from "redux";

// reducer
import authReducers from "./authReducers";
// 全部事件
import calEventsReducers from "./calEventsReducers";
// 單事件
import calEventReducers from "./calEventReducer";

export default combineReducers({
  auth: authReducers,
  calEvents: calEventsReducers,
  calEvent: calEventReducers
});
