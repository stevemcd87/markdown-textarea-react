import React from "react";
export default function CodeTag(props) {
  let { code } = props,
    displayedCode = code
      .replace(/```/g, "")
      .split(/\n/g)
      .filter(v => v);
  return (
    <div className="mtr-code-component">
      <code className="mtr-code">
        {displayedCode.map((codeLine, ind) => {
          return (
            <span key={"" + Date.now() + ind}>
              {codeLine}
              <br />
            </span>
          );
        })}
      </code>
    </div>
  );
}
