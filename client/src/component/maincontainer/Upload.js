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
  const startUpload = async (e) => {
    // e.preventDefault();
    let files = e.target.files;
    if (!files) {
      return;
    }
    files = Array.from(files);
    // console.log(createAndRunSm);
    createAndRunSm(
      files,
      (fileName, index) => {
        setWait(fileName, index, files.length);
      },
      () => {
        unsetWait();
        unsetProgress();
        getPaginatedFiles();
      },
      (progress) => {
        updateProgress(progress);
      },
      -1
    );
  };
  return (
    <div class="add">
      <label class="label-upload">
        <UploadIcon></UploadIcon>

        <input
          type="file"
          class=" hide"
          onChange={startUpload}
          multiple={true}
        ></input>
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
