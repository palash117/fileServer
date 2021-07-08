import React, { useEffect } from "react";
import createAndRunSm from "../../uploadlogic/uploadsm";
import UploadIcon from "../icons/UploadIcon";
import CreateFolderIcon from "../icons/CreateFolderIcon";
import RefreshIcon from "../icons/RefreshIcon";
// import { createFolder } from "../../actions/folderData";
import {Link, useParams} from 'react-router-dom'

import {
  setWait,
  unsetWait,
  updateProgress,
  unsetProgress,
} from "../../actions/wait";
import {
  closeFolder,
  createFolder,
  selectFolder,selectFolderById,
  refreshFolder,
} from "../../actions/folderData";
import { setAlert } from "../../actions/alert";
import { deleteFileById } from "../../actions/file";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const FolderContainer = ({
  folderDataState,
  closeFolder,
  setWait,
  unsetWait,
  updateProgress,
  unsetProgress,
  deleteFileById,
  selectFolder,
  selectFolderById,
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
  var history = useHistory();
  console.log("history obj is", history)
  var close = () => {
    // closeFolder();
    history.goBack()
  };

  var innerCreateFolder = () => {
    var foldername = window.prompt("please enter folder name");
    if (!(foldername == "" || foldername === null)) {
      createFolder(foldername, id);
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
      id,
      setAlert
    );
  };
  var refresh = () => {
    refreshFolder(folderData);
  };
  var {id}=useParams()
  useEffect(()=>{
   
   selectFolderById(id)
  },[])
  return (
    <div className={"folder-container"} key={id}>
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
              <RefreshIcon size={"small"}></RefreshIcon>
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
      // refresh();
    }
  };
  var openf = () => {
    if (fileData.IsDir) {
      console.log("opening folder");
      selectFolderById(fileData.Id);
    }
  };
  return (
    <div className="folderfile">
      <div className="filename" >
        {fileData.IsDir?<Link to={"/folder/"+fileData.Id} onClick={openf} style={{ textDecoration: 'none',color:'black' }}> {fileData.DisplayName}</Link>: fileData.DisplayName}
      </div>
      <div className="filetype">{fileData.IsDir ? "folder" : "file"}</div>
      {!fileData.IsDir && (
        <div className="filedownload">
          <a 
            href={`/fs/downloadFileById?id=${fileData.Id}`}
            target="_self"
            className=" fa fa-download"
            download={`${fileData.FileName}`}
          >
            Download now
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
  selectFolderById,
};
export default connect(mapStateToProps, mapDispatchToProps)(FolderContainer);
