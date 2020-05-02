import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  let [htmlElements, setHtmlElements] = useState([]);
  useEffect(() => {});
  return (
    <div className="App">
      <textarea className="mtr-textarea" onChange={updatePreview} />
      <Preview {...{ htmlElements }} />
    </div>
  );

  function updatePreview(e) {
    let val = e.target.value,
      // Split textarea's value by linebreaks
      lineBreaks = val.split(/\n/g),
      // Wrap each line break with a designated element
      markdownRows = lineBreaks.map(designateElement);
    setHtmlElements(markdownRows);
  }

  function designateElement(line) {
    // HTML Element will have a default of the p tag
    let htmlTag = "p",
      // The text to be put into the htmlTag
      elementText = line.slice(),
      // checking for a reference for a heading tags(h1,h2,etc...)
      headingTag = elementText.match(/^#{1,6}\s/),
      // checking for a reference for a blockquote tag
      blockquoteTag = elementText.match(/^>\s/),
      // Searches line for a markdown pattern
      matchedPattern = searchForMatch(line);
    // updates htmlTag & elementText if matchedPattern was found
    if (matchedPattern) {
      htmlTag = matchedPattern.htmlTag(line);
      elementText = line.replace(
        line.match(new RegExp(...matchedPattern.regExPattern)),
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

function Preview(props) {
  let { htmlElements } = props;
  return (
    <div className="mtr-preview">
      {htmlElements.map((element, ind) => {
        return (
          <React.Fragment key={"" + Date.now() + ind}>
            {HTMLTAGS[element.htmlTag](element.elementText)}
          </React.Fragment>
        );
      })}
    </div>
  );
}

const REGEXPATTERNS = {
  // Reg Ex pattern for Heading =  /^#{1,6}\s/
  heading: {
    regExPattern: ["^#{1,6}\\s"],
    htmlTag: s => `h${s.match(/^#{1,6}\s/)[0].length - 1}`
  },
  // Reg Ex pattern for Blockquote =  /^>\s/
  blockquote: {
    regExPattern: ["^>\\s"],
    htmlTag: s => "blockquote"
  }
};

const HTMLTAGS = {
  p: s => <p className="mtr-p">{s}</p>,
  h1: s => <h1 className="mtr-h1">{s}</h1>,
  h2: s => <h2 className="mtr-h2">{s}</h2>,
  h3: s => <h3 className="mtr-h3">{s}</h3>,
  h4: s => <h4 className="mtr-h4">{s}</h4>,
  h5: s => <h5 className="mtr-h5">{s}</h5>,
  h6: s => <h6 className="mtr-h6">{s}</h6>,
  blockquote: s => <blockquote className="mtr-blockquote">{s}</blockquote>
};

export default App;
