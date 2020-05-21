import React from "react";
import HTMLTAGS from "../variables/HTMLTAGS.js"
export default function Preview(props) {
  let { htmlElements } = props;
  return (
    <div className="mtr-preview">
      {htmlElements.map((element,ind) => {
        return (
          <React.Fragment key={`${element.htmlTag}-${element.elementText}-${ind}`}>
            {HTMLTAGS[element.htmlTag](element.elementText)}
          </React.Fragment>
        );
      })}
    </div>
  );
}
