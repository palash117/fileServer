import React from "react";
import uploadIcon from "../../images/uploadIcon.png";
//uploadIcon.png

function UploadIcon({ size }) {
  var width = 100;
  var height = 100;
  if (size && size == "small") {
    width = 50;
    height = 50;
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

export default UploadIcon;
