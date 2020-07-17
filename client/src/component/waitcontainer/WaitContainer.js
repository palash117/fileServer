import React, { Component } from "react";
import { connect } from "react-redux";
import ProgressBar from "./ProgressBar";

const WaitContainer = ({ isWaiting }) => {
  return (
    <div class={`waitcontiainer ${!isWaiting ? "hide" : ""} `}>
      <div class="waitsubcontianer">
        <div class="lds-dual-ring"></div>
        <span class="waitMessage">PLEASE WAIT</span>
        <ProgressBar />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ isWaiting: state.wait.isWaiting });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WaitContainer);
