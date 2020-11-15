import React from "react";
import uploadIcon from "../../images/createFolderIcon.png";
//uploadIcon.png

function CreateFolderIcon({ size }) {
  var width = 100;
  var height = 100;
  if (size && size == "small") {
    width = 40;
    height = 40;
  }
  return (
    <div>
      <img
        src={uploadIcon}
        alt={"upload"}
        style={{ width: width, height: height }}
      />
    </div>
  );
}

export default CreateFolderIcon;
