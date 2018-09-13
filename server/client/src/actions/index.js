import axios, { AxiosRequestConfig } from "axios";
import {
  FETCH_USER,
  FETCH_CAL_EVENTS,
  FETCH_CAL_EVENT,
  FETCH_CAL_EVENTS_COMPLETE,
  FETCH_CAL_EVENT_COMPLETE,
  ADD_CAL_EVENT,
  DELETE_CAL_EVENT
} from "./types";

// 登入狀態
export const fetchUser = () => async dispatch => {
  const url = "/api/current_user";
  const res = await axios.get(url);
  if (res.data.error) {
    return dispatch({ type: FETCH_USER, payload: false });
  }
  dispatch({ type: FETCH_USER, payload: res.data });
};
// 取得Events
export const fetchCalEvents = calendarId => async dispatch => {
  const url = `/api/calendars/${calendarId}/events`;
  const res = await axios.get(url);

  dispatch({ type: FETCH_CAL_EVENTS, payload: res.data.items });
};

export const addCalEvent = (calendarId, myTodo, cb) => async dispatch => {
  // dispatch({ type: FETCH_CAL_EVENTS_COMPLETE, payload: false });
  const url = `/api/calendars/${calendarId}/events/quickAdd?text="${myTodo}"`;
  const res = await axios.post(url, { summary: "" });
  dispatch({ type: ADD_CAL_EVENT, payload: res.data });
  cb();
};

export const updateCalEvent = (calendarId, eventId) => async dispatch => {
  // dispatch({ type: FETCH_CAL_EVENTS_COMPLETE, payload: false });
  const url = `/api/calendars/${calendarId}/events/${eventId}/update`;
  const res = await axios.delete(url);

  dispatch({ type: FETCH_CAL_EVENTS, payload: res.data });
};

export const delCalEvent = (calendarId, eventId, cb) => async dispatch => {
  // dispatch({ type: FETCH_CAL_EVENTS_COMPLETE, payload: false });
  const url = `/api/calendars/${calendarId}/events/${eventId}/remove`;
  await axios.delete(url);

  dispatch({ type: DELETE_CAL_EVENT, payload: eventId });
  cb();
};
// 取得Event
export const fetchCalEvent = (calendarId, eventId) => async dispatch => {
  dispatch({ type: FETCH_CAL_EVENT_COMPLETE, payload: false });
  const url = `/api/calendars/${calendarId}/events/${eventId}/get`;
  const res = await axios.get(url);

  dispatch({ type: FETCH_CAL_EVENT, payload: res.data });
};
