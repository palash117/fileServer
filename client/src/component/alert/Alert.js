import React, { Fragment } from "react";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
  //

  return (
    <Fragment>
      <div class={`alertcontainer ${alerts && alerts.length === 0 && "hide"}`}>
        <div class="alertsubcontainer">
          {/* <span class="alertmessage alert-danger"> hello message</span> */}
          {alerts &&
            alerts.map((a) => (
              <span class={`alertmessage alert-${a.level}`}> {a.message}</span>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (reduxState) => ({ alerts: reduxState.alert });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
