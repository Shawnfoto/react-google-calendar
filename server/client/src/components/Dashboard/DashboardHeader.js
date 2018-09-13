import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addCalEvent } from "../../actions";
// lib
// import _ from "lodash";
import { message } from "antd";
class DashboardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  handleSubmit(e) {
    const { auth, addCalEvent } = this.props;
    e.preventDefault();
    if (!auth) {
      this.props.history.push("/");
    }
    message.loading("Loading...", 0);
    addCalEvent(auth.googleEmails, this.state.value, () => {
      message.destroy();
    });
    this.setState({ value: "" });
    // console.log(this.state.value);
  }

  render() {
    return (
      <header className="dashboardHeader">
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col s12">
                <div className="input-field">
                  <input
                    placeholder="enter a task"
                    id="email_inline"
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </header>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCalEvent
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardHeader);
