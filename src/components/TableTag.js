import React, { useState, useEffect } from "react";
import InlineTag from "./InlineTag";
export default function TableTag(props) {
  let { table } = props,
    [tableContent, setTableContent] = useState({
      tableHead: "",
      tableBody: []
    });
  useEffect(() => {
    let tableRows = table.split(/(^\|.+\|\n)/gm).filter(v => v),
      tc = { tableHead: "", tableBody: [] };
    if (containsTableHeaders(tableRows)) {
      tc.tableHead = tableRows[0];
      tc.tableBody = tableRows.slice(2);
    } else {
      tc.tableBody = tableRows.slice();
    }
    setTableContent(tc);
  }, [table]);
  return (
    <table className="mtr-table">
      <THeadTag tableHead={tableContent.tableHead} />

      <TBodyTag tableBody={tableContent.tableBody} />
    </table>
  );

  function containsTableHeaders(tr) {
    // Checks second row to see if first row are table headers
    // must begin with 3 dashes within pipes to signify table head
    return /^\|\s*\-{3,}\s*\|/.test(tr[1]);
  }
}

function THeadTag(props) {
  let { tableHead } = props,
    thead = trPrep(tableHead);
  return (
    <thead className="mtr-thead">
      <tr className="mtr-tr">
        {thead.map((th, ind) => {
          return (
            <th key={"th-" + Date.now() + ind} className="mtr-th">
              <InlineTag s={th} />
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

function TBodyTag(props) {
  let { tableBody } = props;
  return (
    <tbody className="mtr-tbody">
      {tableBody.map((row, ind) => {
        return (
          <tr key={"tr-" + Date.now() + ind} className="mtr-tr">
            {trPrep(row).map((td, ind2) => {
              return (
                <td key={"td-" + Date.now() + ind2} className="mtr-td">
                  <InlineTag s={td} />
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

function trPrep(rowString) {
  return rowString ? rowString.split("|").filter(v => v.trim()) : [];
}
