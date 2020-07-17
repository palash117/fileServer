import React, { Component } from "react";
import { connect } from "react-redux";

const WaitContainer = ({ isWaiting }) => {
  return (
    <div class={`waitcontiainer ${!isWaiting ? "hide" : ""} `}>
      <div class="waitsubcontianer">
        <div class="lds-dual-ring"></div>
        <span class="waitMessage">PLEASE WAIT</span>
        <div class="statusbar">
          <div class="statusCompleted"></div>
          <div class="statusPending"></div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ isWaiting: state.wait.isWaiting });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WaitContainer);
