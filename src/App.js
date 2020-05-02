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
    {htmlElements.map(v=>v)}
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
      heading = clone.match(/^#{1,6}\s/);
    if (heading && heading.length !== 0) {
      let htmlTag = `h${heading[0].length - 1 }`,
        val = clone.replace(heading[0], "");
      return <DesignateElement {...{ htmlTag, val }} />;
    }

    return <p>{clone}</p>;
  }
}

function DesignateElement(props) {
  let { htmlTag, val } = props;
  return HTMLTAGS[htmlTag](val);
}

const HTMLTAGS = {
  h1: s => <h1 className="mtr-h1">{s}</h1>,
  h2: s => <h2 className="mtr-h2">{s}</h2>,
  h3: s => <h3 className="mtr-h3">{s}</h3>,
  h4: s => <h4 className="mtr-h4">{s}</h4>,
  h5: s => <h5 className="mtr-h5">{s}</h5>,
  h6: s => <h6 className="mtr-h6">{s}</h6>,
};

export default App;
