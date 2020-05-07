import React, { useState, useEffect } from "react";
// ===== Components ======
import UlTag from "./components/UlTag";
import CodeTag from "./components/CodeTag";
import Preview from "./components/Preview/Preview";
// ==== VARIABLES ===
import HTMLTAGS from "./variables/HTMLTAGS.js";
import REGEXPATTERNS from "./variables/REGEXPATTERNS.js";
import INLINEHTMLTAGS from "./variables/INLINEHTMLTAGS.js";
import INLINEREGEXPATTERNS from "./variables/INLINEREGEXPATTERNS.js";
import "./App.css";

const PatternsToSplit = Object.values(REGEXPATTERNS).reduce((t, v, i) => {
  let prepend = i > 0 ? "|" : "";
  return (t += prepend + v.regExPattern[0]);
}, "");
function App() {
  let [htmlElements, setHtmlElements] = useState([]);
  return (
    <div className="App">
      <textarea className="mtr-textarea" onChange={updatePreview} />
      <Preview {...{ htmlElements }} />
    </div>
  );

  function updatePreview(e) {
    let textValue = e.target.value,
      savedPatterns = savePatterns(textValue),
      lineBreaks = createLineBreaks(savedPatterns);
    // Wrap each line break with a designated element
    const markdownRows = lineBreaks.map(designateElement);
    setHtmlElements(markdownRows);
  }

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
      if (htmlTag !== "code" && htmlTag !== "ul")
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
} // end of App component

const MULTILINEPATTERNS = {
  code: {
    regExPattern: ["^```\\n(.|\\n)*\\n```\\n", "g"],
    replaceTag: "<MTR-code-MTR>"
  },
  ul: {
    regExPattern: [
      "(((^\\-\\s.+\\n)+((?<=^\\-\\s.+\\n)(^\\s{2}\\-\\s.+\\s)*)?)+)",
      "gm"
    ],
    replaceTag: "<MTR-ul-MTR>"
  }
};
export default App;
