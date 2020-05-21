import React from "react";
import HTMLTAGS from "../variables/HTMLTAGS.js";
export default function Preview(props) {
  let {
    htmlElements
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: "mtr-preview"
  }, htmlElements.map((element, ind) => {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: `${element.htmlTag}-${element.elementText}-${ind}`
    }, HTMLTAGS[element.htmlTag](element.elementText));
  }));
}