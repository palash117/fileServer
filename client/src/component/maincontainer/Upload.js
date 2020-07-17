import React, { Component } from "react";
import { connect } from "react-redux";
import { setWait, unsetWait } from "../../actions/wait";

const Upload = ({ setWait, unsetWait }) => {
  const startUpload = () => {
    setWait();

    setTimeout(() => unsetWait(), 3000);
  };
  return (
    <div class="add">
      <input
        type="file"
        class="fa fa-upload fa-5x uploadicon"
        onClick={startUpload}
      ></input>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { setWait, unsetWait };

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
