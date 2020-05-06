import React, { useState, useEffect } from "react";
// ===== Components ======
import UlTag from "./components/UlTag";
import CodeTag from "./components/CodeTag";
import Preview from "./components/Preview/Preview";
// ==== VARIABLES ===
import HTMLTAGS from "./variables/HTMLTAGS.js"
import REGEXPATTERNS from "./variables/REGEXPATTERNS.js"
import INLINEHTMLTAGS from "./variables/INLINEHTMLTAGS.js"
import INLINEREGEXPATTERNS from "./variables/INLINEREGEXPATTERNS.js"
import "./App.css";

function App() {
  let [htmlElements, setHtmlElements] = useState([]);
  return (
    <div className="App">
      <textarea className="mtr-textarea" onChange={updatePreview} />
      <Preview {...{ htmlElements }} />
    </div>
  );

  function updatePreview(e) {
    // TODO:
    let textValue = e.target.value,
      // An array of all code markdown found
      codeBlocks = findCodeBlocks(textValue),
      uls = findUL(textValue),
      // Split textarea's value by linebreaks
      lineBreaks = removeUL(removeCodeBlocks(textValue)).split(/\n/g);
    if (codeBlocks) lineBreaks = returnCodeBlocks(codeBlocks, lineBreaks);
    if (uls) lineBreaks = returnUL(uls, lineBreaks);
    // if (uls.length) lineBreaks = returnUL(uls, lineBreaks);
    // Wrap each line break with a designated element
    const markdownRows = lineBreaks.map(designateElement);

    setHtmlElements(markdownRows);
  }

  function findUL(textValue) {
    let ulPattern = new RegExp(...REGEXPATTERNS.ul.regExPattern);
    return textValue.match(ulPattern);
  }
  function removeUL(textValue) {
    let ulPattern = new RegExp(...REGEXPATTERNS.ul.regExPattern);
    // Removes code blocks and replaces with <MTR-code-MTR> for placement
    return textValue.replace(ulPattern, "\n<MTR-ul-MTR>\n");
  }
  function returnUL(uls, lineBreaks) {
    let lb = lineBreaks.slice();
    uls.forEach(ul => {
      let index = lb.findIndex(v => v && v === "<MTR-ul-MTR>");
      if (index) lb[index] = ul;
    });
    return lb;
  }

  function findCodeBlocks(textValue) {
    let codePattern = new RegExp(...REGEXPATTERNS.code.regExPattern);
    return textValue.match(codePattern);
  }
  function removeCodeBlocks(textValue) {
    let codePattern = new RegExp(...REGEXPATTERNS.code.regExPattern);
    // Removes code blocks and replaces with <MTR-code-MTR> for placement
    return textValue.replace(codePattern, "\n<MTR-code-MTR>\n");
  }
  function returnCodeBlocks(codeBlocks, lineBreaks) {
    let lb = lineBreaks.slice();
    codeBlocks.forEach(cb => {
      lb[lb.findIndex(v => v === "<MTR-code-MTR>")] = cb;
    });
    return lb;
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
}








export default App;
