import React from "react";
import uploadIcon from "../../images/refresh.png";
//uploadIcon.png

function RefreshIcon({ size }) {
  var width = 100;
  var height = 100;
  if (size && size == "small") {
    width = 40;
    height = 40;
  }
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        // border: "2px solid black",
      }}
    >
      <img
        src={uploadIcon}
        alt={"upload"}
        style={{ width: width, height: height }}
      />
    </div>
  );
}

export default RefreshIcon;
