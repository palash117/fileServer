import React from "react";
import createAndRunSm from "../../uploadlogic/uploadsm";
import UploadIcon from "../icons/UploadIcon";
import CreateFolderIcon from "../icons/CreateFolderIcon";
// import { createFolder } from "../../actions/folderData";
import {
  setWait,
  unsetWait,
  updateProgress,
  unsetProgress,
} from "../../actions/wait";
import {
  closeFolder,
  createFolder,
  selectFolder,
  refreshFolder,
} from "../../actions/folderData";
import { setAlert } from "../../actions/alert";
import { deleteFileById } from "../../actions/file";
import { connect } from "react-redux";

const FolderContainer = ({
  folderDataState,
  closeFolder,
  setWait,
  unsetWait,
  updateProgress,
  unsetProgress,
  deleteFileById,
  selectFolder,
  createFolder,
  setAlert,
  refreshFolder,
}) => {
  const {
    showFolderContainer,
    folderData,
    childrenFiles,
    loading,
    breadCrumb,
  } = folderDataState == null ? {} : folderDataState;
  console.log("folderDataState is ", folderDataState);

  var close = () => {
    closeFolder();
  };

  var innerCreateFolder = () => {
    var foldername = window.prompt("please enter folder name");
    if (!(foldername == "" || foldername === null)) {
      createFolder(foldername, folderData.Id);
    } else {
      setAlert("please enter a valid foldername!", 2000);
    }
  };

  var addFiles = (e) => {
    console.log("clickeed add files");
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
        // getPaginatedFiles();
      },
      (progress) => {
        updateProgress(progress);
      },
      folderData.Id
    );
  };
  var refresh = () => {
    refreshFolder(folderData);
  };
  return (
    <div className={"folder-container"}>
      {" "}
      <div className="folder-subcontainer">
        <div className="foldername">
          <div className="folderactions">
            <label className="addtofolder">
              <UploadIcon size={"small"}></UploadIcon>
              <input
                type="file"
                class=" hide"
                onChange={addFiles}
                multiple={true}
              ></input>
              {/* <p>add</p> */}
            </label>
            <div className="innerCreateFolder" onClick={innerCreateFolder}>
              <CreateFolderIcon size={"small"}></CreateFolderIcon>
            </div>
            <div className="refreshFolder" onClick={refresh}>
              <p>refresh</p>
            </div>
          </div>
          <div className="foldernamevalue">
            <p>{breadCrumb}</p>
          </div>
          <div className="closefolder" onClick={close}>
            <p>x</p>
          </div>
        </div>
        <div className="folderfiles">
          {folderData && loading ? (
            <p>Loading</p>
          ) : (
            childrenFiles.map((fl) => (
              <FolderFile
                fileData={fl}
                deleteFileById={deleteFileById}
                refresh={refresh}
                key={fl.Id}
                selectFolder={selectFolder}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

var FolderFile = ({ fileData, deleteFileById, refresh, selectFolder }) => {
  console.log("fileData is ", fileData);
  const deleteFile = (e) => {
    if (
      window.confirm("Do you want to delete file " + fileData.FileName + "?")
    ) {
      deleteFileById(fileData.Id);
      refresh();
    }
  };
  var openf = () => {
    if (fileData.IsDir) {
      console.log("opening folder");
      selectFolder(fileData);
    }
  };
  return (
    <div className="folderfile">
      <div className="filename" onClick={openf}>
        {fileData.FileName}
      </div>
      <div className="filetype">{fileData.IsDir ? "folder" : "file"}</div>
      {!fileData.IsDir && (
        <div className="filedownload">
          <a
            href={`/fs/downloadFileById?id=${fileData.Id}`}
            target="_blank"
            className=" fa fa-download"
            download={`${fileData.FileName}`}
          >
            Download
          </a>
        </div>
      )}

      {!fileData.isDir && (
        <div onClick={deleteFile} className="filedelete fa fa-trash">
          delete
        </div>
      )}
    </div>
  );
};
var styles = {
  container: {
    // position: "absolute",
    width: 400,
    height: 400,
    boderWidth: 1,
  },
};

const mapStateToProps = (reduxState) => ({
  folderDataState: reduxState.folderData,
});

const mapDispatchToProps = {
  closeFolder,
  selectFolder,
  setWait,
  unsetWait,
  updateProgress,
  unsetProgress,
  deleteFileById,
  createFolder,
  setAlert,
  refreshFolder,
};
export default connect(mapStateToProps, mapDispatchToProps)(FolderContainer);
