import React, { useEffect } from "react";
import Upload from "./Upload";
import Search from "./Search";
import FileList from "./FileList";
import { getPaginatedFiles } from "../../actions/file";
import { connect } from "react-redux";
import Nav from "./Nav";
import FolderContainer from "../folderContainer/FolderContainer";
import CreateNewFolder from "./CreateNewFolder";

const MainContainer = ({ getPaginatedFiles, showFolderContainer }) => {
  //   setAlert("hello", "danger");

  return (
    <div className="container">
      <div className="subContiner">
        <Upload />
        {/* <Search /> */}
        <CreateNewFolder></CreateNewFolder>
        <FileList />
        <Nav />
      </div>
      {showFolderContainer && <FolderContainer />}
    </div>
  );
};
const mapStateToProps = (reduxState) => ({
  showFolderContainer: reduxState.folderData.showFolderContainer,
});

export default connect(mapStateToProps, { getPaginatedFiles })(MainContainer);
