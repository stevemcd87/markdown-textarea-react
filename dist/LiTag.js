import React, { useState, useEffect } from "react";
import UlTag from "./UlTag";
import InlineTag from "./InlineTag";
export default function LiTag(props) {
  let {
    li
  } = props,
      [nestedPortion, setNestedPortion] = useState("");
  useEffect(() => {
    if (li) setNestedPortion(li.match(/(^\s{2}\-\s)+/gm));
  }, []);
  if (!li) return "";
  if (nestedPortion) return /*#__PURE__*/React.createElement(UlTag, {
    ul: li.replace(/(^\s{2})+/gm, "")
  });
  return /*#__PURE__*/React.createElement("li", {
    className: "mtr-li"
  }, /*#__PURE__*/React.createElement(InlineTag, {
    s: li.replace(/^\-\s/, "").replace(/(^\s{2}\-\s.+)+/gm, "")
  }));
}