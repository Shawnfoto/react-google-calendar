import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import {  } from "../actions";
// css
import "antd/dist/antd.css";
// lib
import { Modal } from "antd";
import { Spin, Icon } from "antd";
import _ from "lodash";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class CalEvent extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    // this.handleCancel = this.handleCancel.bind(this);
  }
  //   handleCancel() {
  //     const { visible } = this.props;

  //   }

  render() {
    const { visible, toggle, calEvent } = this.props;

    if (_.isEmpty(calEvent)) {
      return (
        <Modal
          style={{ textAlign: "center" }}
          closable={false}
          width={720}
          destroyOnClose
          visible={true}
          footer={null}
          onCancel={toggle}
        >
          <Spin spinning={true} indicator={antIcon} />
        </Modal>
      );
    }
    return (
      <div>
        <Modal
          className="calEvent"
          title={calEvent.summary}
          width={720}
          destroyOnClose
          visible={true}
          footer={null}
          onCancel={toggle}
        >
          {/* <h5 className="event-title">標題: {calEvent.summary}</h5> */}
          <h6 className="event-location">地點: {calEvent.location}</h6>
          <div className="event-description">內容: {calEvent.description}</div>
        </Modal>
      </div>
    );
  }
}
function mapStateToProps({ calEvent }) {
  return { calEvent };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalEvent);

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// // import {  } from "../actions";
// // css
// import "antd/dist/antd.css";
// // lib
// import { Modal } from "antd";
// import { Spin, Icon } from "antd";
// import _ from "lodash";

// const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

// class CalEvent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { value: "" };
//     // this.handleCancel = this.handleCancel.bind(this);
//   }
//   componentDidMount() {
//     // const { id } = this.props.match.params;
//     console.log("event");
//     // console.log(id);
//     // fetchCalEvent(auth.googleEmails, id);
//   }
//   //   handleCancel() {
//   //     const { visible } = this.props;

//   //   }

//   render() {
//     const { visible, toggle, calEvent, match } = this.props;

//     return (
//       <div>
//         {/* {console.log("location", this.props.location)}
//         {console.log("location", this.props.match)} */}
//         <Modal
//           width={720}
//           destroyOnClose
//           visible={visible}
//           //   onOk={this.handleOk}
//           // onCancel={toggle}
//         >
//           test
//           {/* <Spin spinning={_.isEmpty(calEvent)} indicator={antIcon}>
//             <h5 className="event-title">標題: {calEvent.summary}</h5>
//             <h6 className="event-location">地點: {calEvent.location}</h6>
//             <div className="event-description">
//               內容: {calEvent.description}
//             </div>
//           </Spin> */}
//         </Modal>
//       </div>
//     );
//   }
// }
// function mapStateToProps({ auth, calEvent }) {
//   return { auth, calEvent };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({}, dispatch);
// }
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CalEvent);
