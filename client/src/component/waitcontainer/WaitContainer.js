import React, { Component } from "react";
import { connect } from "react-redux";
import ProgressBar from "./ProgressBar";

const WaitContainer = ({ isWaiting, fileName, done, total }) => {
  return (
    <div class={`waitcontiainer ${!isWaiting ? "hide" : ""} `}>
      <div class="waitsubcontianer">
        <div class="lds-dual-ring"></div>
        <span class="waitMessage" style={{ color: "white" }}>
          PLEASE WAIT
        </span>
        <span class="waitMessage" style={{ color: "white" }}>
          uploading file {fileName}
        </span>
        <span class="waitMessage" style={{ color: "white" }}>
          {done + 1} of {total}
        </span>
        <ProgressBar />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isWaiting: state.wait.isWaiting,
  fileName: state.wait.fileName,
  done: state.wait.done,
  total: state.wait.total,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WaitContainer);
