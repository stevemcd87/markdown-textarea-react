import React, { useState, useEffect } from "react";
import InlineTag from "./InlineTag";
export default function TableTag(props) {
  let {
    table
  } = props,
      [tableContent, setTableContent] = useState({
    tableHead: "",
    tableBody: []
  });
  useEffect(() => {
    let tableRows = table.split(/(^\|.+\|\n)/gm).filter(v => v),
        tc = {
      tableHead: "",
      tableBody: []
    };

    if (containsTableHeaders(tableRows)) {
      tc.tableHead = tableRows[0];
      tc.tableBody = tableRows.slice(2);
    } else {
      tc.tableBody = tableRows.slice();
    }

    setTableContent(tc);
  }, [table]);
  return /*#__PURE__*/React.createElement("table", {
    className: "mtr-table"
  }, /*#__PURE__*/React.createElement(THeadTag, {
    tableHead: tableContent.tableHead
  }), /*#__PURE__*/React.createElement(TBodyTag, {
    tableBody: tableContent.tableBody
  }));

  function containsTableHeaders(tr) {
    // Checks second row to see if first row are table headers
    // must begin with 3 dashes within pipes to signify table head
    return /^\|\s*\-{3,}\s*\|/.test(tr[1]);
  }
}

function THeadTag(props) {
  let {
    tableHead
  } = props,
      thead = trPrep(tableHead);
  return /*#__PURE__*/React.createElement("thead", {
    className: "mtr-thead"
  }, /*#__PURE__*/React.createElement("tr", {
    className: "mtr-tr"
  }, thead.map((th, ind) => {
    return /*#__PURE__*/React.createElement("th", {
      key: "th-" + Date.now() + ind,
      className: "mtr-th"
    }, /*#__PURE__*/React.createElement(InlineTag, {
      s: th
    }));
  })));
}

function TBodyTag(props) {
  let {
    tableBody
  } = props;
  return /*#__PURE__*/React.createElement("tbody", {
    className: "mtr-tbody"
  }, tableBody.map((row, ind) => {
    return /*#__PURE__*/React.createElement("tr", {
      key: "tr-" + Date.now() + ind,
      className: "mtr-tr"
    }, trPrep(row).map((td, ind2) => {
      return /*#__PURE__*/React.createElement("td", {
        key: "td-" + Date.now() + ind2,
        className: "mtr-td"
      }, /*#__PURE__*/React.createElement(InlineTag, {
        s: td
      }));
    }));
  }));
}

function trPrep(rowString) {
  return rowString ? rowString.split("|").filter(v => v.trim()) : [];
}