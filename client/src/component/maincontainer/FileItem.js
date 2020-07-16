import React from "react";
import Moment from "react-moment";

const FileItem = ({ file: { FileName, CreatedAt, Id } }) => {
  return (
    <tr class="filerow">
      <td class="cell filename">{FileName}}</td>
      <td class="cell uploadeddate">
        <Moment format="DD/MM/YYYY">{CreatedAt}</Moment>
      </td>
      <td class="cell actions">
        <div class="downloaddiv fa fa-download"></div>
        <div class="deletediv fa fa-trash"></div>
      </td>
    </tr>
  );
};

export default FileItem;
