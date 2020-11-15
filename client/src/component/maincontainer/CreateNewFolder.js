import React from "react";
import { connect } from "react-redux";
import { createFolder } from "../../actions/folderData";
import { setAlert } from "../../actions/alert";
// import {} from alert

const CreateNewFolder = ({ createFolder, setAlert }) => {
  var onpress = () => {
    console.log("createfolder pressed");
    var foldername = window.prompt("please enter folder name");
    if (!(foldername == "" || foldername === null)) {
      createFolder(foldername);
    } else {
      setAlert("please enter a valid foldername!", 2000);
    }
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

export default connect(null, { createFolder, setAlert })(CreateNewFolder);
// export default CreateNewFolder;
