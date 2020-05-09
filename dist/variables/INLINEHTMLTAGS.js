import React from "react";
import INLINEREGEXPATTERNS from "./INLINEREGEXPATTERNS";
const INLINEHTMLTAGS = {
  strongEm: s => /*#__PURE__*/React.createElement("strong", {
    className: "mtr-strong"
  }, /*#__PURE__*/React.createElement("em", {
    className: "mtr-em"
  }, updateTagString("strongEm", s))),
  strong: s => /*#__PURE__*/React.createElement("strong", {
    className: "mtr-strong"
  }, updateTagString("strong", s)),
  em: s => /*#__PURE__*/React.createElement("em", {
    className: "mtr-em"
  }, updateTagString("em", s)),
  a: s => /*#__PURE__*/React.createElement("a", {
    className: "mtr-a",
    href: updateATag("a", "href", s),
    target: "_blank",
    rel: "noopener noreferrer"
  }, updateATag("a", "text", s)),
  code: s => /*#__PURE__*/React.createElement("code", {
    className: "mtr-code"
  }, updateTagString("code", s)),
  sup: s => /*#__PURE__*/React.createElement("sup", {
    className: "mtr-sup"
  }, updateTagString("sup", s)),
  sub: s => /*#__PURE__*/React.createElement("sub", {
    className: "mtr-sub"
  }, updateTagString("sub", s))
};

function updateATag(key, attr, string) {
  if (attr === "href") return string.replace(new RegExp(...INLINEREGEXPATTERNS[key].replacePatternHREF), "");else return string.replace(new RegExp(...INLINEREGEXPATTERNS[key].replacePatternText), "");
}

function updateTagString(key, string) {
  return string.replace(new RegExp(...INLINEREGEXPATTERNS[key].replacePattern), "");
}

export default INLINEHTMLTAGS;