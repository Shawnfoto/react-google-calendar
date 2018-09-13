import { FETCH_CAL_EVENT, FETCH_CAL_EVENT_COMPLETE } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CAL_EVENT:
      return action.payload;

    case FETCH_CAL_EVENT_COMPLETE:
      return action.payload;

    default:
      return state;
  }
}
