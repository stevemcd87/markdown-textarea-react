import React from "react";
import InlineTag from "../InlineTag";
import UlTag from "../UlTag";
import CodeTag from "../CodeTag";
import TableTag from "../TableTag";

const HTMLTAGS = {
  p: s => {
    console.log(s);
    if (s) {
      return (
        <p className="mtr-p">
          <InlineTag {...{ s }} />
        </p>
      );
    }
  },
  h1: s => (
    <h1 className="mtr-h1">
      <InlineTag {...{ s }} />
    </h1>
  ),
  h2: s => (
    <h2 className="mtr-h2">
      <InlineTag {...{ s }} />
    </h2>
  ),
  h3: s => (
    <h3 className="mtr-h3">
      <InlineTag {...{ s }} />
    </h3>
  ),
  h4: s => (
    <h4 className="mtr-h4">
      <InlineTag {...{ s }} />
    </h4>
  ),
  h5: s => (
    <h5 className="mtr-h5">
      <InlineTag {...{ s }} />
    </h5>
  ),
  h6: s => (
    <h6 className="mtr-h6">
      <InlineTag {...{ s }} />
    </h6>
  ),
  blockquote: s => (
    <blockquote className="mtr-blockquote">
      <InlineTag {...{ s }} />
    </blockquote>
  ),
  ul: ul => <UlTag {...{ ul }} />,
  code: code => <CodeTag {...{ code }} />,
  table: table => <TableTag {...{table}} />
};

export default HTMLTAGS;
