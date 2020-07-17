import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setWait,
  unsetWait,
  updateProgress,
  unsetProgress,
} from "../../actions/wait";
import createAndRunSm from "../../uploadlogic/uploadsm";

const Upload = ({ setWait, unsetWait, updateProgress, unsetProgress }) => {
  const startUpload = (e) => {
    // e.preventDefault();
    let file = e.target.files[0];
    console.log(createAndRunSm);
    createAndRunSm(
      file,
      () => {
        setWait();
      },
      () => {
        unsetWait();
        unsetProgress();
      },
      (progress) => {
        updateProgress(progress);
      }
    );
    console.log(file);
  };
  return (
    <div class="add">
      <label class="label-upload">
        <i class="fa fa-upload fa-5x uploadicon" aria-hidden="true"></i>

        <input type="file" class=" hide" onChange={startUpload}></input>
      </label>
    </div>
  );
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setWait,
  unsetWait,
  updateProgress,
  unsetProgress,
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
