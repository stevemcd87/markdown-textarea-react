import React, { useState, useEffect, useRef } from "react";
// ===== Components ======
import Preview from "../Preview/Preview";
// ==== VARIABLES ===
import HTMLTAGS from "../variables/HTMLTAGS.js";
import REGEXPATTERNS from "../variables/REGEXPATTERNS.js";

function MarkdownTextarea(props) {
  let { verticalAutoResize, source, displayTextarea, callback } = props,
    [sourceValue, setSourceValue] = useState(source),
    [htmlElements, setHtmlElements] = useState([]),
    mtrTextArea = useRef();

  useEffect(() => {
    if (callback) callback(sourceValue);
    if (displayTextarea && verticalAutoResize) {
      let textareaScrollHeight = mtrTextArea.current.scrollHeight;
      if (textareaScrollHeight > mtrTextArea.current.offsetHeight)
        mtrTextArea.current.style.height = `${textareaScrollHeight}px`;
    }
    let savedPatterns = savePatterns(sourceValue),
      lineBreaks = createLineBreaks(savedPatterns),
      markdownRows = lineBreaks.map(designateElement);
    setHtmlElements(markdownRows);
  }, [sourceValue]);

  return (
    <div className="MarkdownTextarea">
      {displayTextarea && (
        <textarea
          ref={mtrTextArea}
          className="mtr-textarea"
          onChange={e => setSourceValue(e.target.value)}
        />
      )}
      <Preview {...{ htmlElements }} />
    </div>
  );

  function savePatterns(textToSearch) {
    return Object.values(MULTILINEPATTERNS).reduce(
      (t, v) => {
        let pattern = new RegExp(...v.regExPattern),
          matches = textToSearch.match(pattern);
        t[v.replaceTag] = matches;
        t["textValue"] = t["textValue"].replace(pattern, `\n${v.replaceTag}\n`);
        return t;
      },
      { textValue: textToSearch }
    );
  }
  function createLineBreaks(sp) {
    let lineBreaks = sp.textValue.split(/\n/g);
    Object.values(MULTILINEPATTERNS).forEach(patt => {
      let matches = sp[patt.replaceTag] ? sp[patt.replaceTag] : [];
      matches.forEach(match => {
        let ind = lineBreaks.findIndex(v => v === patt.replaceTag);
        if (ind > -1) lineBreaks[ind] = match;
      });
    });
    return lineBreaks;
  }

  function designateElement(text) {
    // HTML Element will have a default of the p tag
    let htmlTag = "p",
      // The text to be put into the htmlTag
      elementText = text.slice(),
      // Searches text for a markdown pattern
      matchedPattern = searchForMatch(text);
    // updates htmlTag & elementText if matchedPattern was found
    if (matchedPattern) {
      htmlTag = matchedPattern.htmlTag(text);
      if (htmlTag !== "code" && htmlTag !== "ul" && htmlTag !== "table")
        elementText = text.replace(
          text.match(new RegExp(...matchedPattern.regExPattern))[0],
          ""
        );
    }
    return { htmlTag, elementText };
  }

  function searchForMatch(text) {
    // Searches text for any Markdown pattern('##', '>', etc...)
    return Object.values(REGEXPATTERNS).find(pattObject => {
      return text.match(new RegExp(...pattObject.regExPattern));
    });
  }
} // end of MarkdownTextarea component

const MULTILINEPATTERNS = {
  code: {
    regExPattern: ["^(```.*?```$)", "gms"],
    replaceTag: "<MTR-code-MTR>"
  },
  ul: {
    regExPattern: [
      "(((^\\-\\s.+\\n)+((?<=^\\-\\s.+\\n)(^\\s{2}\\-\\s.+\\s)*)?)+)",
      "gm"
    ],
    replaceTag: "<MTR-ul-MTR>"
  },
  table: {
    regExPattern: ["(^\\|.+\\|\\n)+", "gm"],
    replaceTag: "<MTR-table-MTR>"
  }
};
MarkdownTextarea.defaultProps = {
  verticalAutoResize: true,
  source: "",
  displayTextarea: true
};
const PatternsToSplit = Object.values(REGEXPATTERNS).reduce((t, v, i) => {
  let prepend = i > 0 ? "|" : "";
  return (t += prepend + v.regExPattern[0]);
}, "");
export default MarkdownTextarea;
