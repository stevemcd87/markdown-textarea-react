import React, { useState, useEffect, useRef } from "react"; // ===== Components ======

import Preview from "../Preview/Preview"; // ==== VARIABLES ===

import HTMLTAGS from "../variables/HTMLTAGS";
import REGEXPATTERNS from "../variables/REGEXPATTERNS";
import MULTILINEPATTERNS from "../variables/MULTILINEPATTERNS";

function MarkdownTextarea(props) {
  let {
    verticalAutoResize,
    source,
    displayTextarea,
    callback
  } = props,
      [sourceValue, setSourceValue] = useState(source || ""),
      [htmlElements, setHtmlElements] = useState([]),
      mtrTextArea = useRef();
  useEffect(() => {
    // Passes the textarea value to the callback function
    if (callback) callback(sourceValue); // Vertically resizes textarea

    if (displayTextarea && verticalAutoResize) {
      let textareaScrollHeight = mtrTextArea.current.scrollHeight;
      if (textareaScrollHeight > mtrTextArea.current.offsetHeight) mtrTextArea.current.style.height = `${textareaScrollHeight}px`;
    } // Saves all multiline patterns


    let savedPatterns = savePatterns(sourceValue),
        // Splits the textarea value into linebreaks
    lineBreaks = createLineBreaks(savedPatterns),
        // Wraps each linebreak with a designated element & remves empty strings
    markdownRows = lineBreaks.map(designateElement).filter(v => v.elementText.trim()); // Updates state

    setHtmlElements(markdownRows);
  }, [sourceValue]);
  return /*#__PURE__*/React.createElement("div", {
    className: "markdown-textarea"
  }, displayTextarea && /*#__PURE__*/React.createElement("textarea", {
    ref: mtrTextArea,
    className: "mtr-textarea",
    defaultValue: sourceValue,
    onChange: e => setSourceValue(e.target.value)
  }), /*#__PURE__*/React.createElement(Preview, {
    htmlElements
  }));

  function savePatterns(textToSearch) {
    return Object.values(MULTILINEPATTERNS).reduce((t, v) => {
      let pattern = new RegExp(...v.regExPattern),
          matches = textToSearch.match(pattern);
      t[v.replaceTag] = matches;
      t["textValue"] = t["textValue"].replace(pattern, `\n${v.replaceTag}\n`);
      return t;
    }, {
      textValue: textToSearch
    });
  }

  function createLineBreaks(savedPattern) {
    let lineBreaks = savedPattern.textValue.split(/\n/g);
    Object.values(MULTILINEPATTERNS).forEach(patt => {
      let matches = savedPattern[patt.replaceTag] || [];
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
    matchedPattern = elementText === "" ? false : searchForMatch(text); // updates htmlTag & elementText if matchedPattern was found

    if (matchedPattern) {
      htmlTag = matchedPattern.htmlTag;
      if (htmlTag !== "code" && htmlTag !== "ul" && htmlTag !== "table") // removes regex pattern from text
        elementText = text.replace(text.match(new RegExp(...matchedPattern.regExPattern))[0], "");
    }

    return {
      htmlTag,
      elementText
    };
  }

  function searchForMatch(text) {
    // Searches text for any Markdown patterns('##', '>', etc...)
    return REGEXPATTERNS.find(pattObject => {
      return text.match(new RegExp(...pattObject.regExPattern));
    });
  }
} // end of MarkdownTextarea component


MarkdownTextarea.defaultProps = {
  verticalAutoResize: true,
  source: "",
  displayTextarea: true
};
export default MarkdownTextarea;