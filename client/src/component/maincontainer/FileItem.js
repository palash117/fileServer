import React from "react";
import Moment from "react-moment";
import { deleteFileById } from "../../actions/file";
import { selectFolder } from "../../actions/folderData";
import { connect } from "react-redux";
import file from "../../reducers/file";

const FileItem = ({ file, deleteFileById, selectFolder }) => {
  var { FileName, CreatedAt, Id, IsDir, ParentID } = file === null ? {} : file;
  const deleteFile = (e) => {
    if (window.confirm("Do you want to delete file " + FileName + "?")) {
      deleteFileById(Id);
    }
  };
  var open = () => {
    if (IsDir) {
      console.log("opening folder ", file);
      selectFolder(file);
    }
  };
  return (
    <tr class="filerow">
      <td class="cell filename" onClick={open}>
        {FileName}
      </td>
      <td class="cell uploadeddate">
        <Moment format="DD/MM/YYYY">{CreatedAt}</Moment>
      </td>
      <td class="cell actions">
        <div className="downloaddiv">
          <a
            href={`/fs/downloadFileById?id=${Id}`}
            target="_blank"
            class=" fa fa-download"
            download={`${FileName}`}
          ></a>
        </div>
        <div onClick={deleteFile} class="deletediv fa fa-trash"></div>
      </td>
    </tr>
  );
};
// onClick={}
export default connect(null, { deleteFileById, selectFolder })(FileItem);
