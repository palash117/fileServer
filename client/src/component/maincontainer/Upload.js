import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setWait,
  unsetWait,
  updateProgress,
  unsetProgress,
} from "../../actions/wait";
import { getPaginatedFiles } from "../../actions/file";
import createAndRunSm from "../../uploadlogic/uploadsm";
import UploadIcon from "../icons/UploadIcon";

const Upload = ({
  setWait,
  unsetWait,
  updateProgress,
  unsetProgress,
  getPaginatedFiles,
}) => {
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
        getPaginatedFiles();
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
        <UploadIcon></UploadIcon>

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
  getPaginatedFiles,
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
