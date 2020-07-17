import React, { useEffect } from "react";
import Upload from "./Upload";
import Search from "./Search";
import FileList from "./FileList";
import { getPaginatedFiles } from "../../actions/file";
import { connect } from "react-redux";
import Nav from "./Nav";

const MainContainer = ({ getPaginatedFiles }) => {
  //   setAlert("hello", "danger");
  useEffect(() => {
    let key = setInterval(getPaginatedFiles, 5000);
    return () => {
      clearInterval(key);
    };
  }, []);
  return (
    <div className="container">
      <div className="subContiner">
        <Upload />
        <Search />
        <FileList />
        <Nav />
      </div>
    </div>
  );
};

export default connect(null, { getPaginatedFiles })(MainContainer);
