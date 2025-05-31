import React, { useState } from "react";
import { connect } from "react-redux";
// import {} from '../../actions/'

const ProgressBar = ({ progress }) => {
  // if(progress)
  const [progressState, setprogressState] = useState(0);
  if (progress && progressState != progress) {
    setprogressState(progress);
  }
  return (
    <div className="statusbar">
      <div
        className="statusCompleted"
        style={{ width: `${Math.floor(progressState)}%` }}
      ></div>
      <div className="statusPending"></div>
    </div>
  );
};

const mapStateToProps = (state) => ({ progress: state.wait.progress });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);
