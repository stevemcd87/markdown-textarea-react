import React from "react";
import INLINEREGEXPATTERNS from "./INLINEREGEXPATTERNS";

const INLINEHTMLTAGS = {
  strongEm: s => (
    <strong className="mtr-strong">
      <em className="mtr-em">{updateTagString("strongEm", s)}</em>
    </strong>
  ),
  strong: s => (
    <strong className="mtr-strong">{updateTagString("strong", s)}</strong>
  ),
  em: s => <em className="mtr-em">{updateTagString("em", s)}</em>,
  img: s => (
    <img
      className="mtr-img"
      style={updateATag("img", "style", s)}
      src={updateATag("img", "href", s)}
      alt={updateATag("img", "text", s)}
    />

  ),
  a: s => (
    <a
      className="mtr-a"
      href={updateATag("a", "href", s)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {updateATag("a", "text", s)}
    </a>
  ),
  code: s => <code className="mtr-code">{updateTagString("code", s)}</code>,
  sup: s => <sup className="mtr-sup">{updateTagString("sup", s)}</sup>,
  sub: s => <sub className="mtr-sub">{updateTagString("sub", s)}</sub>
};

function updateATag(key, attr, string) {
  if (attr === "href")
    return string.replace(
      new RegExp(...INLINEREGEXPATTERNS[key].replacePatternHREF),
      ""
    );
  else if (attr === "style") {
    let styles = {width:"300px",height:"300px"},
      size = string.replace(
        new RegExp(...INLINEREGEXPATTERNS[key].replacePatternStyle),
        ""
      );
    if (size) {
      let dimensions = size.replace(/\[|\]/g,'').split(',');
      styles.width = `${dimensions[0]}px`;
      styles.height = `${dimensions[1] || dimensions[0]}px`;
    }
    return styles
  } else
    return string.replace(
      new RegExp(...INLINEREGEXPATTERNS[key].replacePatternText),
      ""
    );
}

function updateTagString(key, string) {
  return string.replace(
    new RegExp(...INLINEREGEXPATTERNS[key].replacePattern),
    ""
  );
}
export default INLINEHTMLTAGS;
