import React from "react";
export default function CodeTag(props) {
  let {
    code
  } = props,
      displayedCode = code.replace(/```/g, "").split(/\n/g).filter(v => v);
  return /*#__PURE__*/React.createElement("div", {
    className: "mtr-code-component"
  }, /*#__PURE__*/React.createElement("code", {
    className: "mtr-code"
  }, displayedCode.map((codeLine, ind) => {
    return /*#__PURE__*/React.createElement("span", {
      key: "" + Date.now() + ind
    }, codeLine, /*#__PURE__*/React.createElement("br", null));
  })));
}