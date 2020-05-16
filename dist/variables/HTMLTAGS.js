import React from "react";
import InlineTag from "../InlineTag";
import UlTag from "../UlTag";
import CodeTag from "../CodeTag";
import TableTag from "../TableTag";
const HTMLTAGS = {
  p: s => {
    console.log(s);

    if (s) {
      return /*#__PURE__*/React.createElement("p", {
        className: "mtr-p"
      }, /*#__PURE__*/React.createElement(InlineTag, {
        s
      }));
    }
  },
  h1: s => /*#__PURE__*/React.createElement("h1", {
    className: "mtr-h1"
  }, /*#__PURE__*/React.createElement(InlineTag, {
    s
  })),
  h2: s => /*#__PURE__*/React.createElement("h2", {
    className: "mtr-h2"
  }, /*#__PURE__*/React.createElement(InlineTag, {
    s
  })),
  h3: s => /*#__PURE__*/React.createElement("h3", {
    className: "mtr-h3"
  }, /*#__PURE__*/React.createElement(InlineTag, {
    s
  })),
  h4: s => /*#__PURE__*/React.createElement("h4", {
    className: "mtr-h4"
  }, /*#__PURE__*/React.createElement(InlineTag, {
    s
  })),
  h5: s => /*#__PURE__*/React.createElement("h5", {
    className: "mtr-h5"
  }, /*#__PURE__*/React.createElement(InlineTag, {
    s
  })),
  h6: s => /*#__PURE__*/React.createElement("h6", {
    className: "mtr-h6"
  }, /*#__PURE__*/React.createElement(InlineTag, {
    s
  })),
  blockquote: s => /*#__PURE__*/React.createElement("blockquote", {
    className: "mtr-blockquote"
  }, /*#__PURE__*/React.createElement(InlineTag, {
    s
  })),
  ul: ul => /*#__PURE__*/React.createElement(UlTag, {
    ul
  }),
  code: code => /*#__PURE__*/React.createElement(CodeTag, {
    code
  }),
  table: table => /*#__PURE__*/React.createElement(TableTag, {
    table
  })
};
export default HTMLTAGS;