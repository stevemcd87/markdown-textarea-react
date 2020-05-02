import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  let [textareaValue, setTextareaValue] = useState(""),
    [htmlElements, setHtmlElements] = useState([]);
  // useEffect(() => {
  //   console.log(textareaValue);
  // }, [textareaValue]);
  return (
    <div className="App">
      <textarea onChange={logE} />
      {htmlElements.map(v => v)}
    </div>
  );
  function logE(e) {
    let val = e.target.value,
      lineBreaks = val.split(/\n/g),
      markdownRows = lineBreaks.map(designateElement);
    setHtmlElements(markdownRows);
    e.persist();
    console.log(e);
    setTextareaValue(e.target.value);
  }

  function designateElement(v) {
    let clone = v.slice(),
      headingTag = clone.match(/^#{1,6}\s/),
      blockquoteTag = clone.match(/^>\s/),
      htmlTag = "p",
      val = clone;

    if (headingTag && headingTag.length > 0) {
      htmlTag = `h${headingTag[0].length - 1}`;
        val = clone.replace(headingTag[0], "");
    } else if (blockquoteTag  && blockquoteTag.length > 0) {
       htmlTag = "blockquote";
        val = clone.replace(blockquoteTag[0], "");
    }
    return <DesignateElement {...{ htmlTag, val }} />;

  }
}

function DesignateElement(props) {
  let { htmlTag, val } = props;
  return HTMLTAGS[htmlTag](val);
}

const HTMLTAGS = {
  p: s => <p className="mtr-p">{s}</p>,
  h1: s => <h1 className="mtr-h1">{s}</h1>,
  h2: s => <h2 className="mtr-h2">{s}</h2>,
  h3: s => <h3 className="mtr-h3">{s}</h3>,
  h4: s => <h4 className="mtr-h4">{s}</h4>,
  h5: s => <h5 className="mtr-h5">{s}</h5>,
  h6: s => <h6 className="mtr-h6">{s}</h6>,
  blockquote: s => <blockquote className="mtr-blockquote">{s}</blockquote>,

};

export default App;
