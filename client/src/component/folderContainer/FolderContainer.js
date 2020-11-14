import React from "react";
import createAndRunSm from "../../uploadlogic/uploadsm";
import UploadIcon from "../icons/UploadIcon";
import { closeFolder, selectFolder } from "../../actions/folderData";
import { connect } from "react-redux";

const FolderContainer = ({ folderDataState, closeFolder }) => {
  const { showFolderContainer, folderData, childrenFiles, loading } =
    folderDataState == null ? {} : folderDataState;
  console.log("folderDataState is ", folderDataState);
  var fileItems = [
    {
      FileName: "partypopper.png",
      Id: 324,
      CreatedAt: "2020-11-13T14:45:15Z",
      IsDir: false,
      ParentID: 323,
    },
  ];

  var close = () => {
    closeFolder();
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
        // setWait(fileName, index, files.length);
      },
      () => {
        // unsetWait();
        // unsetProgress();
        // getPaginatedFiles();
      },
      (progress) => {
        // updateProgress(progress);
      },
      folderData.Id
    );
  };
  return (
    <div className={"folder-container"}>
      {" "}
      <div className="folder-subcontainer">
        <div className="foldername">
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
          <div className="foldernamevalue">
            <p>folder1</p>
          </div>
          <div className="closefolder" onClick={close}>
            <p>x</p>
          </div>
        </div>
        <div className="folderfiles">
          {folderData && loading ? (
            <p>Loading</p>
          ) : (
            childrenFiles.map((fl) => <FolderFile fileData={fl} key={fl.Id} />)
          )}
        </div>
      </div>
    </div>
  );
};

var FolderFile = ({ fileData }) => {
  console.log("fileData is ", fileData);
  return (
    <div className="folderfile">
      <div className="filename">{fileData.FileName}</div>
      <div className="filetype">{fileData.IsDir ? "folder" : "file"}</div>
      {!fileData.IsDir && (
        <div className="filedownload">
          <a
            href={`/fs/downloadFileById?id=${fileData.Id}`}
            target="_blank"
            className=" fa fa-download"
            download={`${"file1"}`}
          >
            Download
          </a>
        </div>
      )}

      {!fileData.isDir && (
        <div
          onClick={() => {
            if (
              window.confirm(
                "Do you want to delete file " + fileData.FileName + "?"
              )
            ) {
              // todo delete file
            } else {
            }
          }}
          className="filedelete fa fa-trash"
        >
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

const mapDispatchToProps = { closeFolder, selectFolder };
export default connect(mapStateToProps, mapDispatchToProps)(FolderContainer);