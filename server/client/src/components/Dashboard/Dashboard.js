import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Route, Link } from "react-router-dom";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  fetchCalEvents,
  fetchCalEvent,
  delCalEvent,
  updateCalEvent
} from "../../actions";
import Loading from "../Loading";
// lib
import _ from "lodash";
import moment from "moment";
import "moment/locale/zh-tw";
import { message } from "antd";
// component
import DashboardHeader from "./DashboardHeader";
import CalEvent from "../Calendar";
// css
// import "./Dashboard.css";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.onDelete = this.onDelete.bind(this);
    // this.onUpdate = this.onUpdate.bind(this);
    this.showEventDetails = this.showEventDetails.bind(this);
  }
  componentDidMount() {
    const { auth, fetchCalEvents } = this.props;
    fetchCalEvents(auth.googleEmails);
  }

  // onUpdate(eventId) {
  //   const { auth, updateCalEvent } = this.props;
  //   updateCalEvent(auth.googleEmails, eventId);
  // }

  onDelete(eventId) {
    const { auth, delCalEvent } = this.props;
    message.loading("Loading...", 0);
    if (!auth) {
      this.props.history.push("/");
    }
    delCalEvent(auth.googleEmails, eventId, () => {
      message.destroy();
    });
  }

  showEventDetails(eventId) {
    const { auth, fetchCalEvent } = this.props;
    const { visible } = this.state;

    if (!visible) {
      fetchCalEvent(auth.googleEmails, eventId);
    }
    this.setState({ visible: !this.state.visible });
  }

  renderCalEvents() {
    const { calEvents } = this.props;
    // calEvent false, loading
    if (_.isEmpty(calEvents)) {
      return <Loading />;
    }

    return calEvents.map(item => {
      return (
        <li className="collection-item event-style" key={item.id}>
          {/* <a
            href="javascript:void(0)"
            className="list-summary"
            onClick={() => this.showEventDetails(item.id)}
          >
            <h5 className="event-list-title">{item.summary}</h5>
            <span>建立日期: {moment(item.created).format("L, a h:mm")}</span>
          </a> */}

          <div
            onClick={() => this.showEventDetails(item.id)}
            className="list-summary"
          >
            <h5 className="event-list-title">{item.summary}</h5>
            <span>建立日期: {moment(item.created).format("L, a h:mm")}</span>
          </div>
          <ul className="list-control">
            <li onClick={() => this.onDelete(item.id)}>
              <a href="javascript:void(0)" className="edit">
                Delete
              </a>
            </li>
          </ul>
        </li>
      );
    });
  }
  render() {
    return (
      <div>
        <DashboardHeader />
        <ul className="collection">{this.renderCalEvents()}</ul>
        {this.state.visible ? (
          <CalEvent toggle={this.showEventDetails} />
        ) : null}
      </div>
    );
  }
}
function mapStateToProps({ auth, calEvents }) {
  return { auth, calEvents };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchCalEvents,
      updateCalEvent,
      delCalEvent,
      fetchCalEvent
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
