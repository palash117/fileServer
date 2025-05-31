import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPaginatedFiles } from "../../actions/file";
import { PAGE_SIZE } from "../../constants";
import FileItem from "./FileItem";

const FileList = ({ fileData, getPaginatedFiles }) => {
  /*
  
  */

  const [state, setstate] = useState({
    pageSize: PAGE_SIZE,
    pageNo: 1,
    files: [],
  });
  const { files } = state;
  useEffect(() => {
    getPaginatedFiles(0, PAGE_SIZE);
  }, []);

  if (fileData && fileData.files && fileData.files.length > 0) {
    let same = false;
    if (state.files.length === fileData.files.length) {
      same = true;
      for (let i = 0; i < state.files.length; i++) {
        if (state.files[i].Id !== fileData.files[i].Id) {
          same = false;
          break;
        }
      }
    }
    if (!same) {
      setstate({ ...state, files: fileData.files });
    }
  }
  return (
    <div class="filelist">
      {state.files.length > 0 ? (
        <table class="filelisttable">
          <thead class="filelistheader">
            <td class="filelistheader cell">filename</td>

            <td class="filelistheader cell">uploaded on</td>

            <td class="filelistheader cell">actions</td>
          </thead>
          <tbody>
            {files.map((f) => {
              return <FileItem key={f.Id} file={{ ...f }}></FileItem>;
            })}
          </tbody>
        </table>
      ) : (
        "NO FILES FOUND"
      )}
    </div>
  );
};

const matchReduxStateToProps = (reduxState) => ({ fileData: reduxState.files });

export default connect(matchReduxStateToProps, { getPaginatedFiles })(FileList);
