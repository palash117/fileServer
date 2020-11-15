import React from "react";
import { connect } from "react-redux";
import { createFolder } from "../../actions/folderData";

const CreateNewFolder = ({ createFolder }) => {
  var onpress = () => {
    console.log("createfolder pressed");
    var foldername = window.prompt("please enter folder name");
    createFolder(foldername);
  };
  return (
    <div className="createfolder" onClick={onpress}>
      <p>New folder</p>
    </div>
  );
};

// const mapStateToProps = (reduxState) => ({
//     showFolderContainer: reduxState.folderData.showFolderContainer,
//   });

export default connect(null, { createFolder })(CreateNewFolder);
// export default CreateNewFolder;
