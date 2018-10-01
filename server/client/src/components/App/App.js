import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { BrowserRouter, BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";

import Header from "../Header/index";
import WrappedNormalLoginForm from "../Login/Login";
import Landing from "../Landing/index";
import Dashboard from "../Dashboard/index";
import CalEvent from "../Calendar/index";
import PrivateRoute from "../PrivateRoute/index";
const EventShow = () => <h2>EventShow</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    const { auth } = this.props;

    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/Login" component={WrappedNormalLoginForm} />

              <PrivateRoute
                exact
                path="/surveys"
                component={Dashboard}
                auth={auth}
              />
              {/* <Route path="/surveys/:id" component={CalEvent} /> */}

              <Route path="/surveys/new" component={EventShow} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(
  mapStateToProps,
  actions
)(App);
