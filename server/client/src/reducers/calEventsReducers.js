import {
  FETCH_CAL_EVENTS,
  FETCH_CAL_EVENTS_COMPLETE,
  ADD_CAL_EVENT,
  DELETE_CAL_EVENT
} from "../actions/types";

import _ from "lodash";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CAL_EVENTS:
      return action.payload;

    case ADD_CAL_EVENT:
      return [...state, action.payload];

    case DELETE_CAL_EVENT:
      return state.filter(item => {
        return item.id !== action.payload;
      });
      // return _.filter(state, function(obj) {
      //   return obj.id !== action.payload;
      // });

    default:
      return state;
  }
}
