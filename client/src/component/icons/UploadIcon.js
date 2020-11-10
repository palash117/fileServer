import React from "react";
import uploadIcon from "../../images/uploadIcon.png";
//uploadIcon.png

function UploadIcon() {
  return (
    <div>
      <img
        src={uploadIcon}
        alt={"upload"}
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
}

export default UploadIcon;
