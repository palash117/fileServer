import React, { useState } from "react";
import { connect } from "react-redux";
import { getPaginatedFiles } from "../../actions/file";
import { PAGE_SIZE } from "../../constants";

const Nav = ({ fileData, getPaginatedFiles }) => {
  const [pageState, setPageState] = useState({
    pageNo: 1,
    pageSize: PAGE_SIZE,
  });
  const { pageNo, pageSize } = pageState;
  const nextPage = (e) => {
    e.preventDefault();
    getPaginatedFiles(pageNo + 1, pageSize);
  };
  const prevPage = (e) => {
    e.preventDefault();
    getPaginatedFiles(pageNo - 1, pageSize);
  };
  if (fileData.pageNo !== 0 && fileData.pageNo !== pageNo) {
    setPageState({ pageNo: fileData.pageNo, pageSize: fileData.pageSize });
  }
  return (
    <div class="paginationicons">
      {pageNo > 1 ? (
        <div class="prev">
          <i class="fa fa-arrow-left fa-2x" onClick={prevPage}></i>
        </div>
      ) : (
        <div class="prev">
          <i class="fa fa-arrow-left fa-2x disabled"></i>
        </div>
      )}
      <div class="pageno">{pageNo}</div>
      <div class="next">
        <i class="fa fa-arrow-right fa-2x" onClick={nextPage}></i>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ fileData: state.files });

const mapDispatchToProps = { getPaginatedFiles };

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
