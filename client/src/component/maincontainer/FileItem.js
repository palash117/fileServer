import React from "react";
import Moment from "react-moment";
import { deleteFileById } from "../../actions/file";
import { connect } from "react-redux";

const FileItem = ({ file: { FileName, CreatedAt, Id }, deleteFileById }) => {
  const deleteFile = (e) => {
    deleteFileById(Id);
  };
  return (
    <tr class="filerow">
      <td class="cell filename">{FileName}</td>
      <td class="cell uploadeddate">
        <Moment format="DD/MM/YYYY">{CreatedAt}</Moment>
      </td>
      <td class="cell actions">
        <div className="downloaddiv">
          <a
            href={`/fs/downloadFileById?id=${Id}`}
            target="_blank"
            class=" fa fa-download"
          ></a>
        </div>
        <div onClick={deleteFile} class="deletediv fa fa-trash"></div>
      </td>
    </tr>
  );
};

export default connect(null, { deleteFileById })(FileItem);
